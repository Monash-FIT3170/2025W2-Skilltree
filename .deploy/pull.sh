#!/bin/bash
#
# Script to pull on default branch

PROJECT_DIR="$HOME/2025W2-Skilltree"

# Navigate to project directory
cd $PROJECT_DIR

# Fetch
git fetch

# Allow git to set origin/HEAD
git remote set-head origin --auto

# Change to default branch
git checkout $(basename $(git rev-parse --abbrev-ref origin/HEAD))

# Pull
git pull
