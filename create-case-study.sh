#!/bin/bash

# Case Study Creator Script
# Usage: ./create-case-study.sh "project-slug" "Project Title"

if [ $# -ne 2 ]; then
    echo "Usage: $0 <project-slug> <Project Title>"
    echo "Example: $0 supply-chain-analytics 'Supply Chain Analytics Platform'"
    exit 1
fi

SLUG=$1
TITLE=$2
FILENAME="${SLUG}.html"

echo "Creating case study: $FILENAME"

# Copy template
cp case-study.html "$FILENAME"

# Update title and basic info
sed -i "s|Case Study: \[Project Name\]|Case Study: $TITLE|g" "$FILENAME"
sed -i "s|case-study: \[Project Name\]|case-study: $TITLE|g" "$FILENAME"
sed -i "s|\[Project Title\]|$TITLE|g" "$FILENAME"

# Create image directory
mkdir -p "images/case-studies/$SLUG"

echo "Created $FILENAME"
echo "Created images/case-studies/$SLUG/"
echo ""
echo "Next steps:"
echo "1. Edit $FILENAME with project details"
echo "2. Add screenshots to images/case-studies/$SLUG/"
echo "3. Update projects.json with the new case study link"
echo "4. Test the page at http://localhost:8000/$FILENAME"