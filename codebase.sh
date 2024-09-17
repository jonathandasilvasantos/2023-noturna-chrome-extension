#!/bin/bash

# Function to print file content
print_file_content() {
  local file=$1
  echo ""
  echo "$file"
  cat "$file"
  echo ""
}

# Find and print all .json, .js, and .html files in the current directory
find . -maxdepth 1 -type f \( -name "*.json" -o -name "*.js" -o -name "*.html" \) | while read -r file; do
  print_file_content "$file"
done

