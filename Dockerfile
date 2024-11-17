# Use the official Node.js image as the base image for development
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the development server will run on
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]