#!/bin/bash
#
# Script to restart (stop + start) reverse proxy & webserver in the screen session

./stop || ./stop.sh # 'Stop' reverse proxy & webserver script
sleep 1 # Need to give some time to stop to avoid race condition
./start || ./start.sh # 'Start' reverse proxy & webserver script
