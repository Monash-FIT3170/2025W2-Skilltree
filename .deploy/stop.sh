#!/bin/bash
#
# Script to send ctrl+c to the screen session

# Send Ctrl+C to screen session webserver
screen -S webserver -p 0 -X stuff $'\003'
