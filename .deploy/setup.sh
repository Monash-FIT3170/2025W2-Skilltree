#!/bin/bash
#
# Linux Server Setup: Ubuntu 24.04 LTS (Noble) amd64
#
# git clone https://github.com/Monash-FIT3170/2025W2-Skilltree
# chmod +x ./2025W2-Skilltree/.deploy/setup.sh
# ./2025W2-Skilltree/.deploy/setup.sh

PROJECT_DIR="$HOME/2025W2-Skilltree"

# Update Ubuntu
sudo apt update && sudo apt upgrade -y

# Install packages
sudo apt install screen micro btop gdu 

# NodeJS (24) Installation
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 24

# MeteorJS Installation
npx meteor
export PATH=/home/ubuntu/.meteor:$PATH

# Project Setup
cd $PROJECT_DIR
meteor npm run setup

# Allow unprivileged port 80
sudo echo 'net.ipv4.ip_unprivileged_port_start=79' > /etc/sysctl.d/50-unprivileged-ports.conf
sudo sysctl --system

# Setup scripts symlinks
cd $HOME
ln -s $PROJECT_DIR/.deploy/start.sh start
ln -s $PROJECT_DIR/.deploy/stop.sh stop
ln -s $PROJECT_DIR/.deploy/restart.sh restart
ln -s $PROJECT_DIR/.deploy/console.sh console

# Add executable permission to scripts
chmod +x $PROJECT_DIR/.deploy/setup.sh
chmod +x $PROJECT_DIR/.deploy/start.sh
chmod +x $PROJECT_DIR/.deploy/stop.sh
chmod +x $PROJECT_DIR/.deploy/restart.sh
chmod +x $PROJECT_DIR/.deploy/console.sh

chmod +x $HOME/start
chmod +x $HOME/stop
chmod +x $HOME/restart
chmod +x $HOME/console