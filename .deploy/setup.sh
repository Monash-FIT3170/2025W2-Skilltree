#!/bin/bash
#
# Linux Server Setup: Ubuntu 24.04 LTS (Noble) amd64

PROJECT_DIR="$HOME/2025W2-Skilltree"

# Update Ubuntu
sudo apt update && sudo apt upgrade -y

# Install packages
sudo apt install screen micro btop gdu pipx -y
pipx install ps_mem
pipx ensurepath

# NodeJS (24) Installation
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 24

# MeteorJS Installation
npx meteor

# Project Setup
cd $PROJECT_DIR
meteor npm run setup

# Allow unprivileged port 80
sudo echo 'net.ipv4.ip_unprivileged_port_start=79' > /etc/sysctl.d/50-unprivileged-ports.conf
sudo sysctl --system

# Set default shell to bash
sudo chsh -s /bin/bash ubuntu

# Setup scripts symlinks
cd $HOME
ln -s $PROJECT_DIR/.deploy/setup.sh setup
ln -s $PROJECT_DIR/.deploy/start.sh start
ln -s $PROJECT_DIR/.deploy/stop.sh stop
ln -s $PROJECT_DIR/.deploy/restart.sh restart
ln -s $PROJECT_DIR/.deploy/console.sh console
ln -s $PROJECT_DIR/.deploy/pull.sh pull

# Add executable permission to scripts
chmod +x $PROJECT_DIR/.deploy/setup.sh
chmod +x $PROJECT_DIR/.deploy/start.sh
chmod +x $PROJECT_DIR/.deploy/stop.sh
chmod +x $PROJECT_DIR/.deploy/restart.sh
chmod +x $PROJECT_DIR/.deploy/console.sh
chmod +x $PROJECT_DIR/.deploy/pull.sh

chmod +x $HOME/setup
chmod +x $HOME/start
chmod +x $HOME/stop
chmod +x $HOME/restart
chmod +x $HOME/console
chmod +x $HOME/pull

# Automate pull on default branch every 5 min (cronjob) 
(crontab -l 2>/dev/null; echo "*/5 * * * * $HOME/pull") | crontab -