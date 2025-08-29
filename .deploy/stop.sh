#!/bin/bash
#
# Script to send ctrl+c to the screen session

# Send Ctrl+C to screen session proxy
screen -S proxy -p 0 -X stuff $'\003'

# Send Ctrl+C to screen session webserver
screen -S webserver -p 0 -X stuff $'\003'
