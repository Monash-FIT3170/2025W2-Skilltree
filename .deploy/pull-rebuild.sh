#!/bin/bash
#
# Script to pull then rebuild deployment bundle if there are changes

PROJECT_DIR="$HOME/2025W2-Skilltree"

OUTPUT=$(./pull || ./pull.sh) # Pull

if [[ "$OUTPUT" != *"Already up to date"* ]]; then
    # Add executable permission to scripts just in case it resets on pull
    chmod +x $PROJECT_DIR/.deploy/setup.sh
    chmod +x $PROJECT_DIR/.deploy/start.sh
    chmod +x $PROJECT_DIR/.deploy/stop.sh
    chmod +x $PROJECT_DIR/.deploy/restart.sh
    chmod +x $PROJECT_DIR/.deploy/console.sh
    chmod +x $PROJECT_DIR/.deploy/console-proxy.sh
    chmod +x $PROJECT_DIR/.deploy/console-build.sh
    chmod +x $PROJECT_DIR/.deploy/build.sh
    chmod +x $PROJECT_DIR/.deploy/pull.sh
    chmod +x $PROJECT_DIR/.deploy/pull-rebuild.sh
    chmod +x $PROJECT_DIR/.deploy/update.sh

    chmod +x $HOME/setup
    chmod +x $HOME/start
    chmod +x $HOME/stop
    chmod +x $HOME/restart
    chmod +x $HOME/console
    chmod +x $HOME/console-proxy
    chmod +x $HOME/console-build
    chmod +x $HOME/build
    chmod +x $HOME/pull
    chmod +x $HOME/pull-rebuild
    chmod +x $HOME/update

    cd $PROJECT_DIR
    npm ci --omit=dev || npm install --omit=dev
    
    cd $HOME
    ./build || ./build.sh # Build if changes
    ./restart || ./restart.sh # Restart if changes
fi