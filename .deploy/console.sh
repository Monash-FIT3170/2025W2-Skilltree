#!/bin/bash
#
# Script to enter the screen session for accessing the webserver console

echo "DO NOT PRESS CTRL+C OR CTRL+D TO EXIT"
echo "Ctrl+A then D to detach from the session instead."
read -t 5 -p "Press Enter to continue..." input # Wait 5 sec or until enter is pressed

# Enter screen session named skilltree or create & enter if it does not exist
screen -r skilltree || screen -S skilltree && screen -r skilltree
