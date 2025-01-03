import os
from dotenv import load_dotenv
import telegram
import asyncio

# Load environment variables from .env file
load_dotenv()

# Fetch the bot token and chat ID from environment variables
bot_token = os.getenv("BOT_TOKEN")
chat_id = os.getenv("CHAT_ID")

# Initialize the bot with the token
bot = telegram.Bot(token=bot_token)

# Define the main asynchronous function to send a message
async def main():
    # Test message sent to the provided chat ID
        await bot.send_message(chat_id=chat_id, text="Hello, this is a test message from your bot!")

# Ensure that asyncio runs the main function as an asynchronous task
if __name__ == '__main__':
    asyncio.run(main())