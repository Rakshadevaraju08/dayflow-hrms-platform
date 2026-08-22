# Database Documentation

## Setup

The database uses **PostgreSQL** with the **Prisma ORM**.

- Connection configuration is handled via the `DATABASE_URL` environment variable.
- The schema is located in `backend/prisma/schema.prisma`.

## Future Models

*(To be populated after the problem statement is released)*

We will define models here once we know what data we need to store. Do not create preemptive models (like User, Job, Transaction) until the problem is known.

### Common Prisma Commands
- `npx prisma generate`: Regenerates Prisma Client after schema changes.
- `npx prisma db push`: Pushes the schema state to the database without creating a formal migration (ideal for rapid hackathon changes).
- `npx prisma migrate dev`: Creates formal migration files.
- `npx prisma studio`: Opens a local UI for viewing and editing data.
