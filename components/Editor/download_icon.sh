#!/bin/bash
if [ "$1" = "" -o "$2" = "" ]; then
	echo no input
	exit 1
fi

set -e

wget https://github.com/google/material-design-icons/raw/master/$1/drawable-mdpi/$2_48dp.png -O $2.png
wget https://github.com/google/material-design-icons/raw/master/$1/drawable-xhdpi/$2_48dp.png -O $2@2x.png
wget https://github.com/google/material-design-icons/raw/master/$1/drawable-xxhdpi/$2_48dp.png -O $2@3x.png
wget https://github.com/google/material-design-icons/raw/master/$1/drawable-xxxhdpi/$2_48dp.png -O $2@4x.png
