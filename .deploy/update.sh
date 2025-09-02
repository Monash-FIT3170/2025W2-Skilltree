#!/bin/bash
#
# Script to update webserver (pull + rebuild) in the screen session

PROJECT_DIR="$HOME/2025W2-Skilltree"

# Create screen session build if it does not exist
screen -ls | grep -q build || screen -dmS build bash

# Send CD project directory command + enter to screen session build
screen -S build -p 0 -X stuff "$HOME/pull-rebuild || $PROJECT_DIR/.deploy/pull-rebuild.sh$(echo -ne '\015')"
