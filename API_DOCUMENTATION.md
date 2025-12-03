
# Task Management API Documentation

Base URL:  
```
http://localhost:5000/api
```

---

## Authentication / User Routes

### 1. Register a new user

**Endpoint:**  
```
POST /users/register
```

**Request Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success 201):**
```json
{
  "_id": "64ab1234abcd5678ef901234",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

**Response (Error 400/500):**
```json
{ "message": "User already exists" }
```

---

### 2. Login user

**Endpoint:**  
```
POST /users/login
```

**Request Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success 200):**
```json
{
  "_id": "64ab1234abcd5678ef901234",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

**Response (Error 401/500):**
```json
{ "message": "Invalid email or password" }
```

---

### 3. Get user profile

**Endpoint:**  
```
GET /users/profile
```

**Headers:**
```
Authorization: Bearer <jwt_token_here>
```

**Response (Success 200):**
```json
{
  "_id": "64ab1234abcd5678ef901234",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (Error 401/500):**
```json
{ "message": "Not authorized, token failed" }
```

---

### 4. Update user profile

**Endpoint:**  
```
PUT /users/profile
```

**Headers:**
```
Authorization: Bearer <jwt_token_here>
```

**Request Body (JSON) – optional fields:**
```json
{
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "password": "newpassword123"
}
```

**Response (Success 200):**
```json
{
  "_id": "64ab1234abcd5678ef901234",
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "token": "new_jwt_token_here"
}
```

---

## Task Routes

> All task routes require authentication (`Authorization: Bearer <token>`).

---

### 1. Create a task

**Endpoint:**  
```
POST /tasks
```

**Headers:**
```
Authorization: Bearer <jwt_token_here>
```

**Request Body (JSON):**
```json
{
  "title": "Finish project",
  "description": "Complete the backend API"
}
```

**Response (Success 201):**
```json
{
  "_id": "64ab5678abcd1234ef901234",
  "userId": "64ab1234abcd5678ef901234",
  "title": "Finish project",
  "description": "Complete the backend API",
  "completed": false,
  "createdAt": "2025-12-03T12:00:00.000Z",
  "updatedAt": "2025-12-03T12:00:00.000Z"
}
```

---

### 2. Get all tasks for logged-in user

**Endpoint:**  
```
GET /tasks
```

**Headers:**
```
Authorization: Bearer <jwt_token_here>
```

**Response (Success 200):**
```json
[
  {
    "_id": "64ab5678abcd1234ef901234",
    "userId": "64ab1234abcd5678ef901234",
    "title": "Finish project",
    "description": "Complete the backend API",
    "completed": false,
    "createdAt": "2025-12-03T12:00:00.000Z",
    "updatedAt": "2025-12-03T12:00:00.000Z"
  },
  {
    "_id": "64ab5678abcd1234ef901235",
    "userId": "64ab1234abcd5678ef901234",
    "title": "Read docs",
    "description": "",
    "completed": true,
    "createdAt": "2025-12-03T13:00:00.000Z",
    "updatedAt": "2025-12-03T14:00:00.000Z"
  }
]
```

---

### 3. Update a task

**Endpoint:**  
```
PUT /tasks/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token_here>
```

**Request Body (JSON) – fields optional:**
```json
{
  "title": "Finish API",
  "description": "Update API endpoints",
  "completed": true
}
```

**Response (Success 200):**
```json
{
  "_id": "64ab5678abcd1234ef901234",
  "userId": "64ab1234abcd5678ef901234",
  "title": "Finish API",
  "description": "Update API endpoints",
  "completed": true,
  "createdAt": "2025-12-03T12:00:00.000Z",
  "updatedAt": "2025-12-03T14:00:00.000Z"
}
```

---

### 4. Delete a task

**Endpoint:**  
```
DELETE /tasks/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token_here>
```

**Response (Success 200):**
```json
{ "message": "Task deleted successfully" }
```

**Response (Error 404/401):**
```json
{ "message": "Task not found or not authorized" }
```

---

## Notes

- All endpoints requiring authentication use JWT in the `Authorization` header:
```
Authorization: Bearer <token>
```
- `completed` is a boolean field, defaults to `false`.
- All date/time fields are in ISO 8601 format.
- Tasks are always linked to a specific user via `userId`.
