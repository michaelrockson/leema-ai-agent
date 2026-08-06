from services.scout_bot_service import ScoutBotService
from utils.logger import logger


class ScoutBotPipeline:
    """
    Pipeline responsible for scouting and validating potential pain points from Reddit.
    This is the first stage in the system, identifying software-solvable problems.
    """


    def __init__(self):
        self.service = ScoutBotService()


    def run(self):
        """
        Executes the scouting pipeline:
        Agent validates and stores IDs in the database.
        Returns:
            bool: True if the pipeline succeeded and found data, False otherwise.
        """
        try:
            self.service.agent_validate_posts()

            if not self.service.has_unprocessed_posts():
                logger.warning(
                    "No software-solvable problems were validated by the agent. Stopping pipeline.")
                return False

            return True

        except Exception as e:
            logger.error(f"Error in Scout Bot pipeline: {e}",
                         exc_info = True)
            return False
