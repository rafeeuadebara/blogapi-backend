# Blog API (Node.js + Express + PostgreSQL)

A RESTful backend API for a blog platform with authentication built using Express and PostgreSQL.

Includes automated CI with GitHub Actions and production deployment on Render.

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- pg (node-postgres)
- JWT Authentication
- GitHub Actions (CI)
- Render (Deployment)

---

## Features

- User registration and login
- JWT-based authentication
- Create and fetch blog posts
- Automatic database schema setup on application startup
- Fully tested via CI pipeline

---

## Project Structure

config/
controllers/
routes/
models/
db/
  ├── schema.sql
  └── init.js
app.js
index.js
.github/workflows/ci.yml

---

## Environment Variables

Create a `.env` file locally:

DATABASE_URL=postgresql://your_database_url  
JWT_SECRET=your_secret  

Production environment variables are managed through Render.

---

## Running Locally

1. Install dependencies:

npm install

2. Start PostgreSQL and create database:

createdb blog_api

3. Apply schema:

psql blog_api -f db/schema.sql

4. Start server:

npm run dev

---

## CI Pipeline

GitHub Actions runs on every push:

- Spins up a PostgreSQL test container
- Applies database schema
- Executes the test suite

Each CI run uses a fresh database instance.

---

## Deployment

The API is deployed on Render (free tier).

On startup, the application ensures required tables exist before serving requests.

---

## API Endpoints

POST /api/auth/register – Register user  
POST /api/auth/login – Login user  
GET /api/posts – Fetch posts  
POST /api/posts – Create post (authentication required)  
GET /health – Health check  

---


## Testing the API (curl)

Set base URL:

export BASE_URL="https://blogapi-backend-csvh.onrender.com/"
# or local:
# export BASE_URL="http://localhost:8000"

---

### Health check

curl -i "$BASE_URL/health"

Expected: 200 OK with {"ok":true}

---

### Register user

curl -i -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

Expected: 201 Created

---

### Login

curl -i -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

Copy token from response:

export TOKEN="PASTE_TOKEN_HERE"

---

### Create post (auth required)

curl -i -X POST "$BASE_URL/api/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"My first post","content":"Hello world!"}'

Expected: 201 Created

---

### List posts

curl -i "$BASE_URL/api/posts"

---

### Get post by id

curl -i "$BASE_URL/api/posts/1"

---

### Update post

curl -i -X PUT "$BASE_URL/api/posts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Updated title","content":"Updated content"}'

---

### Delete post

curl -i -X DELETE "$BASE_URL/api/posts/1" \
  -H "Authorization: Bearer $TOKEN"
