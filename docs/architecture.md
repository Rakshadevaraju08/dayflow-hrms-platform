# Architecture Overview

This project uses a standard multi-tier architecture suitable for rapid hackathon development.

## Flow

`React Frontend (Vite) -> Express API -> Prisma ORM -> PostgreSQL`

### Components

1. **Frontend (React)**: Handles the UI and state. Communicates with the backend using HTTP requests.
2. **Backend (Express)**: Provides RESTful API endpoints. Handles business logic, validations, and database interactions.
3. **Database (PostgreSQL)**: Relational database managed through Prisma ORM.

## Future Extensions

- **AI Integration**: The backend is structured to easily integrate external AI APIs via simple HTTP calls in the `services/` folder.
- **Python/FastAPI**: If computer vision, OCR, Whisper, or heavy ML models are needed, a separate Python service will be created and connected to the Express backend.
