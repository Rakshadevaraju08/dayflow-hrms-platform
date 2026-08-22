# API Documentation

## Available Endpoints

### Health Check
- **Method**: `GET`
- **Endpoint**: `/api/health`
- **Purpose**: Verifies that the backend API is running and accessible.
- **Request Parameters**: None
- **Request Body**: None
- **Response**:
  ```json
  {
    "success": true,
    "message": "API is running"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Internal Server Error"
  }
  ```

---

## Template for Future Endpoints

Use this template to document new endpoints as they are created.

### [Feature Name] Endpoint
- **Method**: `[GET / POST / PUT / DELETE]`
- **Endpoint**: `/api/...`
- **Description**: [What does this endpoint do?]
- **Authentication**: [Required / Not Required]
- **Request Parameters**:
  - `param_name`: [Description]
- **Request Body**:
  ```json
  {
    "key": "value"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`
  - `401 Unauthorized`
  - `404 Not Found`
  - `500 Internal Server Error`
