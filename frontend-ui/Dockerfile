FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY frontend-ui/package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY frontend-ui/ .

# Build the application
RUN npm run build

# Install serve to run the built application
RUN npm install -g serve

# Expose the port
EXPOSE 5173

# Run the application
CMD ["serve", "-s", "dist", "-l", "5173"]