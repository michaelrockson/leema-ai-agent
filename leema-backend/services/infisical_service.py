import os
from typing import List, Any

from dotenv import load_dotenv
from infisical_sdk import InfisicalSDKClient
from infisical_sdk.api_types import MachineIdentityLoginResponse

from utils.logger import logger

load_dotenv()


class InfisicalSecretsService:
    """
    Handles fetching and loading secrets (API keys, passwords, etc.)
    from Infisical a cloud-based secret's manager.
    """


    def __init__(self):
        self.client = InfisicalSDKClient(
            host = "https://app.infisical.com"
        )
        self.secrets = [
            "REDDIT_CLIENT_ID",
            "REDDIT_CLIENT_SECRET",
            "REDDIT_USER_AGENT",
            "NOTION_API_KEY",
            "NOTION_DB_ID",
            "GEMINI_API_KEY",
            "DATABASE_URL",
            "EMAIL_ADDRESS",
            "EMAIL_APP_PASSWORD",
            "RECIPIENT_ADDRESS"
        ]


    def authenticate_infisical_client(
        self) -> MachineIdentityLoginResponse | None:
        """
        Authenticates the Infisical client using Universal Auth credentials.
        Returns:
        AuthenticationResponse | None: The authentication response on success,
        or None if credentials are absent or authentication fails.
        """
        client_id = os.getenv("INFISICAL_CLIENT_ID")
        client_secret = os.getenv("INFISICAL_CLIENT_SECRET")

        if not client_id or not client_secret:
            logger.warning(
                "Infisical credentials not found. Skipping Infisical authentication.")
            return None

        try:
            logger.info("Authenticating infisical client...")
            response = self.client.auth.universal_auth.login(
                client_id = client_id,
                client_secret = client_secret
            )
            logger.info("Infisical client authenticated successfully.")
            return response
        except Exception as error:
            logger.error(
                f"Error authenticating Infisical Client: {error}. Falling back to local environment.")
            return None


    def load_infisical_secrets(self) -> List[Any] | None:
        """
        Fetches secrets from Infisical and injects them into the environment.
        Returns:
        list[str]: A list of loaded secrets in 'KEY:VALUE' format, or an empty
        list if the project ID is missing or an error occurs.
        """
        project_id = os.getenv("INFISICAL_PROJECT_ID")
        if not project_id:
            logger.warning(
                "INFISICAL_PROJECT_ID not found. Skipping secret fetching.")
            return []

        missing_secrets = []
        loaded_secrets = []

        try:
            logger.info("Fetching Secrets From Infisical...")
            response = self.client.secrets.list_secrets(
                project_id = project_id,
                environment_slug = "dev",
                secret_path = "/"
            )

            missing_key_count = 0
            loaded_key_count = 0

            for secret in response.secrets:
                os.environ[secret.secretKey] = secret.secretValue

                if secret.secretKey not in self.secrets:
                    missing_key_count += 1
                    missing_secrets.append(secret.secretKey)

                loaded_secrets.append(
                    f"{secret.secretKey}:{secret.secretValue}")
                loaded_key_count += 1
                logger.info(f"{secret.secretKey} has been loaded")

            logger.info(
                f"{loaded_key_count} infisical secrets have been fetched successfully")

            if missing_secrets:
                for missing_secret in missing_secrets:
                    logger.warning(
                        f"{missing_secret} secret not loaded in app secrets list")
                logger.warning(
                    f"{missing_key_count} secrets have not been loaded")

            return loaded_secrets
        except Exception as error:
            logger.error(
                f"Error fetching secrets from infisical: {error}. Falling back to local environment.")
            return []
