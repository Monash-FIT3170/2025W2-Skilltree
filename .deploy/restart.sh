#!/bin/bash
#
# Script to restart (stop + start) webserver in the screen session

./stop || ./stop.sh # 'Stop' webserver script
./start || ./start.sh # 'Start' webserver script
