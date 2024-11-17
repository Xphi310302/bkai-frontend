# Dockerfile
# Start of Selection
FROM node:20-alpine
# End of Selection

WORKDIR /app 


COPY package*.json ./  

RUN npm install

COPY . .  

CMD ["npm", "run", "dev"]  