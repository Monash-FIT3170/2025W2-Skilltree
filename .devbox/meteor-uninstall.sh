#!/bin/sh

INSTALL_PATH="$(dirname "$(realpath "$0")")"
rm -rf $INSTALL_PATH/.meteor
echo "Meteor has been removed from ${INSTALL_PATH}/.meteor)."