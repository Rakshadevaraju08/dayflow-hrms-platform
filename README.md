# Hackathon Base Project

This is a problem-independent boilerplate ready for rapid development during an 8-hour hackathon. 
Problem-specific features will be added once the hackathon starts and the problem statement is released.

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS (optional/clean config), Axios/Fetch
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Prisma ORM
- **AI/Python**: Architecture is ready for external API integration (Python/FastAPI will be added if required).

## Folder Structure

```
hackathon-project/
├── frontend/          # React + Vite application
├── backend/           # Node.js + Express API
├── docs/              # Project documentation
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore rules
└── README.md          # Project instructions
```

## Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (ensure it's running locally or have a remote URL ready)

## Installation Instructions

1. **Clone/Download** the repository (Note: Git is intentionally NOT initialized yet).
2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

## Environment Variable Setup

1. Copy `.env.example` to `.env` in the root (or in specific backend/frontend folders as needed).
   ```bash
   cp .env.example .env
   ```
2. Update the `DATABASE_URL` with your actual PostgreSQL credentials.
3. Configure `PORT` (default 5000) and `FRONTEND_URL` (default http://localhost:5173).

## Database Configuration (Prisma)

Once PostgreSQL is running and `DATABASE_URL` is configured:

```bash
cd backend
npx prisma generate
npx prisma db push
```
*(Run `npx prisma studio` to view the database UI).*

## Running the Project

**Start Backend**:
```bash
cd backend
npm run dev
```
*(Runs on http://localhost:5000)*

**Start Frontend**:
```bash
cd frontend
npm run dev
```
*(Runs on http://localhost:5173)*

## Health Check Endpoint

To verify the backend is running, visit or call:
`GET http://localhost:5000/api/health`

## Development Workflow

1. Discuss and finalize the schema in `backend/prisma/schema.prisma` after the problem statement is released.
2. Build controllers and routes in the backend.
3. Build components, pages, and API services in the frontend.
4. Integrate and test!
