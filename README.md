# weatherease-app
Check real time weather forcast in a flash.


Project Setup
This project consists of a React frontend and a Node.js backend. The development environment is set up using Docker and Docker Compose to enable hot reloading for the client and live reloading for the backend.

Prerequisites
Docker
Docker Compose
Project Structure
go
Copy code
project-root/
├── client/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── (other React app files)
└── backend/
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    └── (other backend files)
Setting Up the Project
Step 1: Clone the Repository
Clone the repository to your local machine:

sh
Copy code
git clone <repository-url>
cd project-root
Step 2: Create Dockerfiles
client/Dockerfile

dockerfile
Copy code
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
backend/Dockerfile

dockerfile
Copy code
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 4000
CMD ["nodemon", "--watch", ".", "--ext", "js,json", "--exec", "node", "index.js"]
Step 3: Create Docker Compose File
Create a docker-compose.yml file in the root of the project:

yaml
Copy code
version: "3.8"
services:
  client:
    build: ./client
    container_name: client_c
    ports:
      - '3000:3000'
    volumes:
      - ./client:/app
      - /app/node_modules
  backend:
    build: ./backend
    container_name: backend_c
    ports:
      - '4000:4000'
    stdin_open: true
    tty: true
    volumes:
      - ./backend:/app
      - /app/node_modules
Step 4: Start the Containers
From the root of the project, run the following command to build and start the containers:

sh
Copy code
docker-compose up --build
This will start both the client and backend services. The client will be accessible at http://localhost:3000 and the backend at http://localhost:4000.

Step 5: Verify the Setup
Client: Navigate to http://localhost:3000 in your browser. You should see your React application running.
Backend: The backend server should be running at http://localhost:4000. You can verify this by making API requests or checking the logs in the terminal.
Step 6: Development Workflow
Any changes you make in the client directory will trigger hot reloading in the React application.
Any changes you make in the backend directory will trigger nodemon to restart the Node.js server.
Troubleshooting
Ensure Docker and Docker Compose are installed and running.
Check for any permission issues with the mounted volumes. Adjust user permissions in the Dockerfiles if necessary.
Optional: User Setup in Dockerfile
If you encounter permission issues, you might need to adjust the user permissions inside the Docker containers by adding the following lines to your Dockerfiles:

dockerfile
Copy code
# At the beginning of the Dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
