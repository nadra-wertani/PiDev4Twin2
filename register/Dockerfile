# Dockerfile
 FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port and start
EXPOSE 3000
CMD [ "npm", "start" ]
