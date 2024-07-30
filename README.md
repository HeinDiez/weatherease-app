# weatherease-app
Check real time weather forcast in a flash.


Project Setup
This project consists of a React frontend and a Node.js backend. The development environment is set up using Docker and Docker Compose to enable hot reloading for the client and live reloading for the backend.

Prerequisites
Docker
Docker Compose


# Project Structure
```
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

```
    
# Setting Up the Project

# Step 1: Clone the Repository
Clone the repository to your local machine:

```
git clone git@github.com:HeinDiez/weatherease-app.git
cd project-root
```

# Step 2: Start the Containers

From the root of the project, run the following command to build and start the containers:

```
docker-compose up --build
```
This will start both the client and backend services. The client will be accessible at http://localhost:3000 and the backend at http://localhost:4000.

# Step 3: Verify the Setup

Client: Navigate to http://localhost:3000 in your browser. You should see your React application running.
Backend: The backend server should be running at http://localhost:4000. You can verify this by making API requests or checking the logs in the terminal.

# Step 4: Development Workflow

Any changes you make in the client directory will trigger hot reloading in the React application.
Any changes you make in the backend directory will trigger nodemon to restart the Node.js server.

# Troubleshooting
Ensure Docker and Docker Compose are installed and running.
Check for any permission issues with the mounted volumes. Adjust user permissions in the Dockerfiles if necessary.

