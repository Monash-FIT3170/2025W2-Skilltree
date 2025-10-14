#!/bin/sh

# Modified version of Meteor alternative install script to ensure reproducibility on the project's Meteor version within Devbox (Nix)
#

run_it () {


# This does a clean install of meteor by the project's (release) version
INSTALL_PATH="$(dirname "$(realpath "$0")")"

if [ -e "$INSTALL_PATH/.meteor" ]; then
  exit 0
fi

RELEASE_PATH="${INSTALL_PATH}/../.meteor/release"
PROJECT_VERSION=$(cat "$RELEASE_PATH" | sed 's/[^0-9.]*//g')
RELEASE="${PROJECT_VERSION}"

PREFIX="/usr/local"

set -e
set -u

# Let's display everything on stderr.
exec 1>&2

### Linux ###
LINUX_ARCH=$(uname -m)
if [ "${LINUX_ARCH}" = "x86_64" ] ; then
  PLATFORM="os.linux.x86_64"
elif [ "${LINUX_ARCH}" = "aarch64" ] ; then
  PLATFORM="os.linux.aarch64"
else
  echo "Unusable architecture: ${LINUX_ARCH}"
  echo "Meteor only supports x86_64 for now."
  exit 1
fi

trap "echo Installation failed." EXIT

TARBALL_URL="https://static.meteor.com/packages-bootstrap/${RELEASE}/meteor-bootstrap-${PLATFORM}.tar.gz"
INSTALL_TMPDIR="$INSTALL_PATH/.meteor-install-tmp"
TARBALL_FILE="$INSTALL_PATH/.meteor-tarball-tmp"

cleanUp() {
  rm -rf "$TARBALL_FILE"
  rm -rf "$INSTALL_TMPDIR"
}

# Remove temporary files now in case they exist.
cleanUp

# Make sure cleanUp gets called if we exit abnormally.
trap cleanUp EXIT

mkdir "$INSTALL_TMPDIR"

# Only show progress bar animations if we have a tty
# (Prevents tons of console junk when installing within a pipe)
VERBOSITY="--silent";
if [ -t 1 ]; then
  VERBOSITY="--progress-bar"
fi

echo "Downloading Meteor distribution"
# keep trying to curl the file until it works (resuming where possible)
MAX_ATTEMPTS=10
RETRY_DELAY_SECS=5
set +e
ATTEMPTS=0
while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]
do
  ATTEMPTS=$((ATTEMPTS + 1))

  curl $VERBOSITY --fail --continue-at - --max-time 180 \
    "$TARBALL_URL" --output "$TARBALL_FILE"

  if [ $? -eq 0 ]
  then
      break
  fi

  echo "Retrying download in $RETRY_DELAY_SECS seconds..."
  sleep $RETRY_DELAY_SECS
done
set -e

# bomb out if it didn't work, eg no net
test -e "${TARBALL_FILE}"
tar -xzf "$TARBALL_FILE" -C "$INSTALL_TMPDIR" -o

test -x "${INSTALL_TMPDIR}/.meteor/meteor"
mv "${INSTALL_TMPDIR}/.meteor" "$INSTALL_PATH"
# just double-checking :)
test -x "$INSTALL_PATH/.meteor/meteor"

# The `trap cleanUp EXIT` line above won't actually fire after the exec
# call below, so call cleanUp manually.
cleanUp

echo
echo "Meteor ${RELEASE} has been installed in ${INSTALL_PATH}/.meteor)."


trap - EXIT
}

run_it
