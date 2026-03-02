# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of app
COPY . .

# Expose React port
EXPOSE 3000

# Start dev server
CMD ["npm", "start"]