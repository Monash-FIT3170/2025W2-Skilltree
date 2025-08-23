#!/bin/bash
#
# Script to start the webserver in the screen session

PROJECT_DIR="$HOME/2025W2-Skilltree"

# Create screen session skilltree if it does not exist
screen -ls | grep skilltree || screen -dmS skilltree bash

# Send CD project directory command + enter to screen session skilltree
screen -S skilltree -p 0 -X stuff "cd $PROJECT_DIR$(echo -ne '\015')"

# Send webserver startup command + enter to screen session skilltree
screen -S skilltree -p 0 -X stuff "/home/ubuntu/.meteor/meteor run --port 80 --settings settings.json --exclude-archs web.browser.legacy,web.cordova --production$(echo -ne '\015')"
