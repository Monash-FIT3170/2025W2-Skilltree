#!/bin/bash
#
# Script to build deployment bundle

PROJECT_DIR="$HOME/2025W2-Skilltree"
WEBSERVER_DIR="$HOME/webserver"

# Navigate to project directory
cd $PROJECT_DIR

# Build deployment bundle
$HOME/.meteor/meteor build $WEBSERVER_DIR --architecture=os.linux.x86_64 --directory
cd $WEBSERVER_DIR/bundle/programs/server
npm install
