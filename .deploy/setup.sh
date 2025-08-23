#!/bin/bash
#
# Linux Server Setup: Ubuntu 24.04 LTS (Noble) amd64

PROJECT_DIR="$HOME/2025W2-Skilltree"

# Update Ubuntu
sudo apt update && sudo apt upgrade -y

# Install packages
sudo apt install screen micro btop gdu pipx -y
pipx install ps_mem
echo -e '#!/bin/bash\nsudo $HOME/.local/share/pipx/venvs/ps-mem/bin/ps_mem "$@"' > $HOME/ps_mem && chmod +x $HOME/ps_mem

# NodeJS (24) Installation
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22.13.1

# MongoDB setup
sudo apt-get install gnupg curl -y
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl enable mongod --now

# Caddy Installation (Reverse Proxy SSL)
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg
chmod o+r /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy -y
sudo systemctl disable caddy --now

# MeteorJS Installation
npx meteor

# Project Setup
cd $PROJECT_DIR
npm install --omit=dev

# Set UDP Buffer Sizes ~ https://github.com/quic-go/quic-go/wiki/UDP-Buffer-Sizes
echo -e 'net.core.rmem_max=7500000\nnet.core.wmem_max=7500000' | sudo tee /etc/sysctl.d/99-socket-buffer-size.conf
sudo sysctl --system

# Set default shell to bash
sudo chsh -s /bin/bash ubuntu
echo '[[ -f ~/.bashrc ]] && . ~/.bashrc' >> ~/.bash_profile # Fix SSH login not sourcing .bashrc

# Setup scripts symlinks
cd $HOME
ln -s $PROJECT_DIR/.deploy/setup.sh setup
ln -s $PROJECT_DIR/.deploy/start.sh start
ln -s $PROJECT_DIR/.deploy/stop.sh stop
ln -s $PROJECT_DIR/.deploy/restart.sh restart
ln -s $PROJECT_DIR/.deploy/console.sh console
ln -s $PROJECT_DIR/.deploy/console-proxy.sh console-proxy
ln -s $PROJECT_DIR/.deploy/console-build.sh console-build
ln -s $PROJECT_DIR/.deploy/build.sh build
ln -s $PROJECT_DIR/.deploy/pull.sh pull
ln -s $PROJECT_DIR/.deploy/pull-rebuild.sh pull-rebuild
ln -s $PROJECT_DIR/.deploy/update.sh update

# Add executable permission to scripts
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

# Automate pull + rebuild on changes at default branch every 5 min (cronjob) 
(crontab -l 2>/dev/null; echo "*/5 * * * * . $HOME/.bash_profile; $HOME/update") | crontab -

# Automate webserver start on server reboot
(crontab -l; echo "@reboot . $HOME/.bash_profile; $HOME/start") | crontab -
