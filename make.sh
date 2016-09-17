#!/bin/bash

#
# Makersphere HQ <opensource@makersphere.org>
#
VERSION=1.0.0
#
# Colors
#
RED='\033[0;31m'
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'
#
# Main Application
#
if [ -f ./build/application.html ]; then
	if [ -f ./bookmarklet.min.js ]; then
		rm ./bookmarklet.min.js
	fi
	echo
	echo -e "${ORANGE}+++ Emoji Passcodes +++${NC}";
	echo
	echo "Version @$VERSION"
	echo
	echo -e "${ORANGE}=> Build Script${NC}";
	echo
	echo -e "${ORANGE}> Encoding source file...${NC}";
	FILE_SOURCE=$(cat ./build/application.html);
	FILE_ENCODED=$(echo -n "$FILE_SOURCE" | base64);
	echo
	echo -e "${ORANGE}> Building bookmarklet...${NC}";
	JS_RAW=$(echo "open('data:text/html;charset=utf8;base64,$FILE_ENCODED', 'emoji-passcode', 'height=580,width=770,resizable=no,scrollbars=no,titlebar=no,location=no')");
	JS_ENCODED=$(echo -n "$JS_RAW" | perl -MURI::Escape -ne 'print uri_escape($_)');
	echo "javascript:(function()%7B${JS_ENCODED}%7D)()" > bookmarklet.min.js
	echo
	echo -e "${GREEN}==> Project successfully built${NC}";
else
    echo -e "${RED}==> HTML File is missing${NC}";
    exit 1;
fi
