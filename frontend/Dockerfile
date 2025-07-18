# Stage 1: Use a specific, lightweight version of Node.js based on Alpine Linux
FROM node:18-alpine AS development

# Install `curl` which is required for the healthcheck in docker-compose.yml
# --no-cache avoids storing the apk index, keeping the image smaller.
RUN apk add --no-cache curl

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# The command to run the development server will be provided by docker-compose.yml