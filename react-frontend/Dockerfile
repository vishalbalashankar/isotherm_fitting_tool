FROM node:latest

# A directory within the virtualized Docker environment
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package.json ./
#COPY package-lock.json ./ 

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . ./

# Uses port which is used by the actual application
EXPOSE 3000

CMD ["npm","start"]