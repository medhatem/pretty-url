FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Build the React app
RUN npm run build

# Expose a port for local usage (Next steps would use a production server or serve -s)
EXPOSE 3000

# Start the development server (for demonstration). 
# For production, use a static server or something like serve. 
CMD ["yarn", "start"]
