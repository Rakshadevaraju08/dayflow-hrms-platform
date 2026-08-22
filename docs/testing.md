# Testing

## Connection Test (Frontend -> Backend)

1. Start both the frontend and backend servers.
2. The frontend root page should make a `GET` request to `/api/health`.
3. Check the frontend UI to ensure it displays "API is running" or a similar success message indicating the connection is successful.

## API Endpoint Testing

Use tools like Postman, Insomnia, or Thunder Client (VS Code extension) to manually test API routes as they are built.

- **Health Check**: Send a `GET` request to `http://localhost:5000/api/health`.

## Database Connection Testing

Once `DATABASE_URL` is set:
1. Run `npx prisma db push` in the `backend` directory.
2. If it succeeds, the database connection is working.
