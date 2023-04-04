#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null
then
  echo "ImageMagick is not installed. Please install ImageMagick using 'brew install imagemagick' and try again."
  exit 1
fi

# Check if the input file exists
if [ ! -f "logo.png" ]; then
  echo "logo.png not found. Make sure it is in the same directory as this script."
  exit 1
fi

# Resize the image to generate icons
convert logo.png -resize 16x16 icon16.png
convert logo.png -resize 48x48 icon48.png
convert logo.png -resize 128x128 icon128.png

echo "Icons generated successfully!"

