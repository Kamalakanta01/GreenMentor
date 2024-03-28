# Task Manager Full Stack Application

Welcome to the Task Manager Full Stack Application! This application provides a comprehensive solution for managing tasks efficiently. It consists of a frontend developed using React, Tailwind CSS, and Redux, and a backend developed using Node.js, Express.js, and MongoDB.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
4. [Project Structure](#project-structure)
    - [Frontend Structure](#frontend-structure)
    - [Backend Structure](#backend-structure)
5. [Frontend Components](#frontend-components)
6. [Backend Endpoints](#backend-endpoints)
7. [Middleware](#middleware)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

The Task Manager Full Stack Application offers a user-friendly interface for managing tasks efficiently. Users can create, edit, and delete tasks, as well as filter tasks based on various criteria such as status and priority. The frontend interacts with the backend API to perform CRUD operations on tasks and manage user authentication.

## Features

- User Authentication: Secure user registration and login functionality.
- Task Management: Create, edit, and delete tasks with customizable attributes.
- Filtering: Filter tasks based on status, priority, and other criteria.
- Responsive Design: Mobile-friendly user interface for seamless access on various devices.

## Getting Started

### Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- Node.js and npm/yarn
- MongoDB

### Installation

To set up the application, follow these steps:

1. Clone the frontend and backend repositories from GitHub.
2. Navigate to the project directories in your terminal.
3. Install dependencies for both frontend and backend using npm or yarn:
-npm install
 or
-yarn install

### Running the Application

Once dependencies are installed, you can run the full stack application:

1. Start the backend server by running `node app.js`.
2. Start the frontend development server by running `npm start` or `yarn start`.

The frontend application will be accessible at http://localhost:3000, and the backend API will be accessible at http://localhost:8080.

## Project Structure

### Frontend Structure

The frontend project follows a structured directory layout:

- **src/components/**: Contains React components for the user interface.
- **src/Redux/**: Contains Redux-related files for state management.
- **src/Routes/**: Contains routing configuration files.
- **src/App.css**: CSS file for styling the frontend components.
- **src/App.js**: Entry point of the frontend application.
- **src/index.css**: Global CSS file.
- **src/index.js**: Entry point for rendering the React application into the DOM.

### Backend Structure

The backend project follows a structured directory layout:

- **app.js**: Entry point of the backend application.
- **connection.js**: File for establishing connection to the MongoDB database.
- **UsersSchema.js**: File defining the schema for user data.
- **todosSchema.js**: File defining the schema for task data.
- **todosRouter.js**: File containing routes for task-related endpoints.
- **middlewear.js**: File containing middleware functions for authentication.
- **package.json**: File containing project metadata and dependencies.

## Frontend Components

The frontend application consists of various React components for different pages and features, including:

- Landing Page
- Login
- Signup
- Dashboard
- Todo
- NewTodo
- EditTodo
- ComingSoon
- Features

## Backend Endpoints

The backend API provides RESTful endpoints for user authentication and task management, including:

1. POST /signup
2. POST /login
3. GET /todos
4. POST /todos/create
5. PUT /todos/:id
6. DELETE /todos/:id

## Middleware

The backend API includes middleware functions for authentication, ensuring secure access to the endpoints using JWT tokens.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
