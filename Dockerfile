# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Expose the port NestJS runs on
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]