# EduCore — Learning Dashboard

A frontend web application for course discovery, enrolment, and progress tracking, built for ICT 930 Assignment 2 (Frontend Design Overview).

## Live Application

🔗 🔗 [https://educore-app-lovat.vercel.app](https://educore-app-lovat.vercel.app)

## Team Members

- Aesha Prajapati
- Soniya Aryl
- Jobayed Hasnath
- Surjeet

## Technology Stack

- **React** (functional components + hooks)
- **Vite** — build tool and dev server
- **React Router** — client-side routing
- **Recharts** — data visualization (bar chart, donut chart)
- **React Context + useState** — shared application state
- Plain CSS (no framework) with responsive media queries

## Features

- **Dashboard** — weekly study activity chart, enrolled courses overview, upcoming deadlines
- **Courses** — searchable, filterable course catalogue with category tags
- **Course Detail** — individual course information with an enrolment form (client-side validation)
- **Progress** — overall progress breakdown (donut chart) and per-course completion table
- Simulated asynchronous data loading with loading states
- Fully responsive design (desktop and mobile)
- Accessibility considerations: semantic HTML, ARIA attributes on form errors, visible keyboard focus states, verified color contrast (4.92:1)

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/aesha1512/educore-app.git
   cd educore-app
```

2. Install dependencies:
```bash
   npm install
```

3. Run the development server:
```bash
   npm run dev
```

4. Open the URL shown in your terminal (usually `http://localhost:5173`)

## Project Structure

## Backend (Express + MySQL)

The Express API lives in the `backend/` folder and uses a MySQL database called `educore_db` with three tables: `users`, `courses` and `enrolments`.

### Run the backend
1. Install MySQL and create the database: `CREATE DATABASE educore_db;`
2. Create the `users`, `courses` and `enrolments` tables.
3. In `backend/`, create a `.env` file with these variables:
```
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=educore_db
   PORT=5000
   JWT_SECRET=any_long_random_string
```
4. Install and start the server:
```
   cd backend
   npm install
   node server.js
```
   It runs at http://localhost:5000.

### Run the frontend
From the project root: `npm install` then `npm run dev`. It runs at http://localhost:5173 and calls the API at http://localhost:5000.

### API routes
- Public: GET /api/courses, GET /api/courses/:id, POST /api/register, POST /api/login
- Needs a JWT: POST /api/enrolments, GET /api/enrolments/:userId, PUT /api/enrolments/:id, DELETE /api/enrolments/:id