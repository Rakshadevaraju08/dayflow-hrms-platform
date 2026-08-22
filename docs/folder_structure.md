# Dayflow HRMS - Project Structure

This document outlines the folder structure of the Dayflow HRMS project. The project follows a standard multi-tier architecture with a React frontend and an Express/Prisma backend.

## Root Directory

```text
c:\Users\Raksha\OdooxNMIT_project\
├── backend/          # Express API server & Prisma ORM
├── frontend/         # React frontend application (Vite)
├── docs/             # Project documentation
├── .gitignore
├── .env.example
└── README.md
```

## Backend Structure (`/backend`)

```text
backend/
├── prisma/
│   ├── schema.prisma # Database models (User, Attendance, LeaveRequest, etc.)
│   └── migrations/   # Database migrations
├── src/
│   ├── controllers/  # API controllers handling business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── attendanceController.js
│   │   ├── leaveController.js
│   │   └── healthController.js
│   ├── routes/       # Express route definitions
│   │   ├── index.js  # Main router mounting other routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── attendanceRoutes.js
│   │   └── leaveRoutes.js
│   ├── middleware/   # Express middleware (error handling, auth verification)
│   ├── services/     # Third-party integrations & complex logic
│   ├── utils/        # Helper functions & formatters
│   ├── generated/    # Auto-generated Prisma client
│   └── app.js        # Express app configuration
├── index.js          # Entry point for backend server
├── prisma.config.ts  # Prisma configuration file
└── package.json
```

## Frontend Structure (`/frontend`)

```text
frontend/
├── src/
│   ├── components/   # Reusable UI components (Buttons, Modals, Forms)
│   ├── pages/        # Route components (Page level views)
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Attendance.jsx
│   │   └── Leave.jsx
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API service functions (fetch wrappers)
│   ├── utils/        # Helper functions
│   ├── App.jsx       # Main application component & Routing
│   ├── main.jsx      # Entry point for React app
│   ├── index.css     # Global styles & Tailwind imports
│   └── App.css       # App specific styles
├── public/           # Static assets (images, icons)
├── vite.config.js    # Vite bundler configuration
└── package.json
```
