#!/bin/bash
#
# Script to start the reverse proxy & webserver in the screen sessions

# Set environment variables
: "${ENV_HOSTNAME:="$(hostname -I | cut -d' ' -f1)"}"
: "${ENV_MONGO_URL:="mongodb://localhost:27017/skilltree"}"
: "${ENV_PORT:="3000"}"
: "${ENV_METEOR_SETTINGS:="\$(cat \$HOME/2025W2-Skilltree/settings.json)"}"
PROJECT_DIR="$HOME/2025W2-Skilltree"
WEBSERVER_DIR="$HOME/webserver"

# Create screen session proxy if it does not exist
screen -ls | grep -q proxy || screen -dmS proxy bash

# Send caddy command + enter to screen session proxy
screen -S proxy -p 0 -X stuff "sudo caddy reverse-proxy --from $ENV_HOSTNAME --to :$ENV_PORT $(echo -ne '\015')"

# Create screen session webserver if it does not exist
screen -ls | grep -q webserver || screen -dmS webserver bash

# Send webserver startup command + enter to screen session webserver
screen -S webserver -p 0 -X stuff "MONGO_URL=$ENV_MONGO_URL PORT=$ENV_PORT ROOT_URL=https://$ENV_HOSTNAME/ METEOR_SETTINGS=\"$ENV_METEOR_SETTINGS\" node $WEBSERVER_DIR/bundle/main.js $(echo -ne '\015')"
