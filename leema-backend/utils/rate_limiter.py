import asyncio
import random
import time
from typing import Any, Coroutine, List

from tenacity import (
    RetryCallState,
    retry,
    retry_if_exception,
    stop_after_attempt,
    wait_exponential_jitter,
)

from settings import settings
from utils.logger import logger


class AsyncRateLimiter:
    """
    Async context manager that limits concurrent requests and request rate.

    Combines an asyncio.Semaphore (concurrency cap) with a token bucket
    (requests-per-minute cap). Both must be satisfied before a call proceeds.
    """


    def __init__(self, max_rate: int, period: float = 60.0,
                 max_concurrency: int = 5) -> None:
        self.max_rate = max_rate
        self.period = period
        self._semaphore = asyncio.Semaphore(max_concurrency)
        self._tokens: float = float(max_rate)
        self._last_refill: float = time.monotonic()
        self._lock = asyncio.Lock()


    async def _refill(self) -> None:
        now = time.monotonic()
        elapsed = now - self._last_refill
        self._tokens = min(float(self.max_rate), self._tokens + (
            elapsed / self.period) * self.max_rate)
        self._last_refill = now


    async def _acquire_token(self) -> None:
        async with self._lock:
            await self._refill()
            while self._tokens < 1.0:
                wait_time = (1.0 - self._tokens) / self.max_rate * self.period
                await asyncio.sleep(wait_time + random.uniform(0.05, 0.3))
                await self._refill()
            self._tokens -= 1.0


    async def __aenter__(self) -> "AsyncRateLimiter":
        await self._semaphore.acquire()
        await self._acquire_token()
        return self


    async def __aexit__(self, *args: Any) -> None:
        self._semaphore.release()


# =====================================================
# SINGLETONS
# =====================================================
reddit_limiter = AsyncRateLimiter(
    max_rate = settings.REDDIT_MAX_REQUESTS_PER_MIN,
    period = 60.0,
    max_concurrency = settings.REDDIT_MAX_CONCURRENCY,
)

gemini_limiter = AsyncRateLimiter(
    max_rate = settings.GEMINI_MAX_REQUESTS_PER_MIN,
    period = 60.0,
    max_concurrency = settings.GEMINI_MAX_CONCURRENCY,
)


# =====================================================
# RETRY HELPERS
# =====================================================
def _is_rate_limit_error(exc: Exception) -> bool:
    msg = str(exc).lower()
    return any(token in msg for token in (
        "429", "too many requests", "rate limit",
        "resource_exhausted", "ratelimit", "quota",
    ))


def _log_before_retry(retry_state: RetryCallState) -> None:
    next_sleep = getattr(retry_state.next_action, "sleep", 0.0)
    logger.warning(
        f"Rate limit hit. Retry {retry_state.attempt_number} in {next_sleep:.1f}s — "
        f"{retry_state.outcome.exception()}"
    )


reddit_retry = retry(
    retry = retry_if_exception(_is_rate_limit_error),
    wait = wait_exponential_jitter(initial = 2, max = 60, jitter = 5),
    stop = stop_after_attempt(settings.REDDIT_MAX_RETRIES),
    before_sleep = _log_before_retry,
    reraise = True,
)

gemini_retry = retry(
    retry = retry_if_exception(_is_rate_limit_error),
    wait = wait_exponential_jitter(initial = 5, max = 120, jitter = 10),
    stop = stop_after_attempt(settings.GEMINI_MAX_RETRIES),
    before_sleep = _log_before_retry,
    reraise = True,
)


# =====================================================
# BATCHED GATHER
# =====================================================
async def batched_gather(
    coros: List[Coroutine],
    batch_size: int = 5,
    batch_delay: float = 1.5,
) -> List[Any]:
    """
    Runs coroutines in sequential batches to avoid API burst pressure.

    Args:
        coros:       List of coroutines to execute.
        batch_size:  Max coroutines to run concurrently per batch.
        batch_delay: Seconds to sleep between batches.

    Returns:
        Flat list of results. Exceptions are returned in-place, not raised.
    """
    results: List[Any] = []
    total = len(coros)

    for i in range(0, total, batch_size):
        batch = coros[i: i + batch_size]
        batch_results = await asyncio.gather(*batch, return_exceptions = True)
        results.extend(batch_results)

        if batch_delay > 0 and i + batch_size < total:
            await asyncio.sleep(batch_delay)

    return results
