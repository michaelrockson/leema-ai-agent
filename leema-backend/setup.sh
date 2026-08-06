#!/bin/bash
set -e

echo "Setting up project..."

# 1. Detect OS
OS=$(uname -s)

# 2. Set Python command and activate path based on OS
if [ "$OS" = "Darwin" ] || [ "$OS" = "Linux" ]; then
    PYTHON_CMD=python3
    VENV_ACTIVATE=.venv/bin/activate
else
    PYTHON_CMD=python
    VENV_ACTIVATE=.venv/Scripts/activate
fi

# 3. Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    $PYTHON_CMD -m venv .venv
else
    echo ".venv already exists. Skipping creation."
fi

# 4. Activate virtual environment
echo "Activating virtual environment..."
source $VENV_ACTIVATE

# 4. Copy the example environment variable file
if [ ! -f ".env" ]; then
    echo "Setting up env template file..."
    cp .env.example .env
else
    echo ".env file already exists. Skipping."
fi

# 5. Install requirements
if [ -f "requirements.txt" ]; then
    echo "Installing packages..."
    pip install -r requirements.txt
else
    echo "requirements.txt not found. Skipping."
fi

echo "Setup complete!"