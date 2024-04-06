# Task Management System API

This is a RESTful API for managing tasks in a task management system. It allows users to perform CRUD operations on tasks.

## Getting Started

To get started with the API, follow the instructions below.

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or remotely
- npm package manager

### Installation

1. Clone the repository: git clone <https://github.com/Saurabh8657/FLuid_AI_Assignment.git>
2. Install dependencies: npm install
3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Define the following variables:
    - `tokenKey`: Secret key for JWT token generation
    - `mongoURL`: MongoDB connection string
4. Start the server: npm run server


## API Documentation

### User Routes

## Register

**Endpoint:** `POST http://localhost:8080/users/register`

**Description:** Register a new user.

**Request Body:**
- `userName` (string): User's username.
- `email` (string): User's email.
- `pass` (string): User's password.

**Response:**
- `200 OK`: User successfully registered.
- `400 Bad Request`: Password hashing failed.
- `500 Internal Server Error`: Internal server error.

## Login

**Endpoint:** `POST http://localhost:8080/users/login`

**Description:** Login with existing user credentials.

**Request Body:**
- `email` (string): User's email.
- `pass` (string): User's password.

**Response:**
- `200 OK`: Login successful. Returns user details and JWT token.
- `400 Bad Request`: Password dehashing failed.
- `500 Internal Server Error`: Internal server error.

## Logout

**Endpoint:** `POST http://localhost:8080/users/logout`

**Description:** Logout the user and blacklist the token.

**Request Headers:**
- `Authorization`: JWT token.

**Response:**
- `200 OK`: Logout successful.
- `400 Bad Request`: Error occurred during logout.
- `500 Internal Server Error`: Internal server error.

### Task Routes

#### Get All Tasks

**Endpoint:** `GET http://localhost:8080/tasks/`

**Description:** Retrieve a list of all tasks for the authenticated user.

**Request Headers:**
- `Authorization`: JWT token.

**Response:**
- `200 OK`: Returns tasks for the authenticated user.
- `500 Internal Server Error`: Internal server error.

#### Get Task by ID

**Endpoint:** `GET http://localhost:8080/tasks/:id`

**Description:** Retrieve a single task by its ID for the authenticated user.

**Request Parameters:**
- `id` (string): Task ID.

**Request Headers:**
- `Authorization`: JWT token.

**Response:**
- `200 OK`: Returns the task with the provided ID.
- `500 Internal Server Error`: Internal server error.

#### Add New Task

**Endpoint:** `POST http://localhost:8080/tasks/add`

**Description:** Add a new task for the authenticated user.

**Request Body:**
- `title` (string): Task title.
- `description` (string): Task description.
- `dueDate` (Date): Task due date.
- `priority` (string): Task priority.
- `status` (string): Task status.

**Request Headers:**
- `Authorization`: JWT token.

**Response:**
- `200 OK`: New task added successfully.
- `500 Internal Server Error`: Internal server error.

#### Update Task

**Endpoint:** `PATCH http://localhost:8080/tasks/update/:id`

**Description:** Update an existing task by its ID for the authenticated user.

**Request Parameters:**
- `id` (string): Task ID.

**Request Body:**
- `title` (string): Task title.
- `description` (string): Task description.
- `dueDate` (Date): Task due date.
- `priority` (string): Task priority.
- `status` (string): Task status.

**Request Headers:**
- `Authorization`: JWT token.

**Response:**
- `200 OK`: Task updated successfully.
- `500 Internal Server Error`: Internal server error.

#### Delete Task

**Endpoint:** `DELETE http://localhost:8080/tasks/delete/:id`

**Description:** Delete an existing task by its ID for the authenticated user.

**Request Parameters:**
- `id` (string): Task ID.

**Request Headers:**
- `Authorization`: JWT token.

**Response:**
- `200 OK`: Task deleted successfully.
- `500 Internal Server Error`: Internal server error.

## Author

- [Saurabh Ganguly](https://saurabh8657.github.io/)
  - Email: saurabhganguly38@gmail.com
