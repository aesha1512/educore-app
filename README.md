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