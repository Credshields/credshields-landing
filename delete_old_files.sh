#!/bin/bash

# Script to delete all files ending with old.html
# Run from the credshields-landing directory

echo "Finding files ending with 'old.html'..."
files=$(find . -name "*old.html" -type f)

if [ -z "$files" ]; then
    echo "No files found ending with 'old.html'"
    exit 0
fi

echo "The following files will be deleted:"
echo "$files"
echo ""
read -p "Are you sure you want to delete these files? (y/n): " confirm

if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
    find . -name "*old.html" -type f -delete
    echo "Files deleted successfully!"
else
    echo "Operation cancelled."
fi
