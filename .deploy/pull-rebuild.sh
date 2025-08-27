#!/bin/bash
#
# Script to pull then rebuild deployment bundle if there are changes

PROJECT_DIR="$HOME/2025W2-Skilltree"

OUTPUT=$(./pull || ./pull.sh) # Pull

if [[ "$OUTPUT" != *"Already up to date"* ]]; then
    cd $PROJECT_DIR
    npm ci --omit=dev || npm install --omit=dev
    
    cd $HOME
    ./build || ./build.sh # Build if changes
    ./restart || ./restart.sh # Restart if changes
fi