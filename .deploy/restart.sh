#!/bin/bash
#
# Script to restart (stop + start) reverse proxy & webserver in the screen session

./stop || ./stop.sh # 'Stop' reverse proxy & webserver script
./start || ./start.sh # 'Start' reverse proxy & webserver script
