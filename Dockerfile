FROM node:14

# Create root folder for app
WORKDIR /usr/src/app

# Install required npm packages
COPY package*.json ./

RUN npm install

# Copy app source to container root folder
COPY . .

# Expose external port
EXPOSE 3000

# Run node and start the app
CMD [ "node", "app"]