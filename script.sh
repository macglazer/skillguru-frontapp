#!/bin/bash

# Print Node.js version
node_version=$(node --version)
echo "Node.js Version: $node_version"

# Print NODE_PATH environment variable
node_path=$NODE_PATH
echo "NODE_PATH: $node_path"

# Print other environment variables
echo "Environment Variables:"
printenv

# Print current directory
current_directory=$(pwd)
echo "Current Directory: $current_directory"

# Print the content of the package.json file
package_json=$(cat package.json)
echo "package.json Content:"
echo "$package_json"

# Start the React app
echo "Starting React app..."
#/root/.nvm/versions/node/v21.5.0/bin/npm start
node -v
npm --version
npm start
# Log a message
echo "React app started at $(date)" >> /opt/skillguru_pl/log.log

