# Use a Node LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the NestJS files
COPY . .

# Build the NestJS project
RUN npm run build

# Expose the NestJS port
EXPOSE 3000

# Start the NestJS server
CMD ["yarn", "start:prod"]
