# Stage 1: Build the application
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with hot reloading during development
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["npm", "start"]