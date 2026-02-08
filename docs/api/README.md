# SmartSME API Documentation

Complete API documentation for the SmartSME backend system with Role-Based Access Control (RBAC).

## Overview

SmartSME API provides a comprehensive backend system for manufacturing management with:

- **JWT Authentication** with role-based access control
- **Guest Access** for public endpoints (read-only)
- **8 User Roles** with granular permissions
- **RESTful API** design with OpenAPI specification
- **Production & Secondary Process** management
- **Inventory & Dispatch** tracking

## Quick Start

1. **Start the server**: `npm start` (runs on port 8080)
2. **Import Postman collection**: Use files in `postman/collections/`
3. **Test guest access**: No authentication required for read operations
4. **Login**: Use any test user to get JWT tokens
5. **Explore roles**: Test different user roles to see permission differences

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user info
- `POST /auth/logout` - User logout

### Permissions (RBAC)
- `POST /permissions/check` - Check specific permissions
- `GET /permissions/me` - Get all user permissions

### Actions (RBAC)
- `POST /actions/check` - Check specific actions
- `GET /actions/me` - Get all user actions

## User Roles & Permissions

### Role Hierarchy
1. **OWNER** (ID: 1) - Full system access
2. **ADMIN** (ID: 2) - Administrative access
3. **PLANT_HEAD** (ID: 3) - Plant management
4. **SHIFT_INCHARGE** (ID: 4) - Production & secondary processes
5. **STORES_INCHARGE** (ID: 5) - Inventory & dispatch
6. **PRODUCTION_EMPLOYEE** (ID: 6) - Production operations
7. **SECONDARY_PROCESS_EMPLOYEE** (ID: 7) - Secondary processes
8. **ACCOUNTANT** (ID: 8) - Billing & accounting
9. **GUEST** (ID: 0) - Read-only access (no authentication)

### Permission Matrix

| Role | Production | Secondary Process | Stores | Billing |
|------|------------|-------------------|--------|---------|
| OWNER | Full | Full | Full | Full |
| ADMIN | Full | Full | Full | Full |
| PLANT_HEAD | Full | Full | Read | Read |
| SHIFT_INCHARGE | Full | Full | - | - |
| STORES_INCHARGE | - | - | Full | - |
| PRODUCTION_EMPLOYEE | Limited | - | - | - |
| SECONDARY_PROCESS_EMPLOYEE | - | Limited | - | - |
| ACCOUNTANT | - | - | Read | Full |
| GUEST | Read | Read | - | - |

### Available Actions

| Role | CREATE | READ | UPDATE | DELETE | APPROVE | EXPORT |
|------|--------|------|--------|--------|---------|--------|
| OWNER | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| SHIFT_INCHARGE | ✓ | ✓ | ✓ | - | ✓ | - |
| Others | Varies | ✓ | Varies | - | - | - |
| GUEST | - | ✓ | - | - | - | - |

## Authentication Flow

### 1. Guest Access (No Authentication)
```bash
# No Authorization header required
curl -X GET http://localhost:8080/permissions/me
```

**Response**: Read-only permissions
```json
{
  "permissions": [
    {"name": "PRODUCTION_READ", "resource": "PRODUCTION"},
    {"name": "SECONDARY_PROCESS_READ", "resource": "SECONDARY_PROCESS"}
  ]
}
```

### 2. User Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "tamil", "password": "password123"}'
```

**Response**: JWT tokens + user info
```json
{
  "user": {
    "id": 1,
    "username": "tamil",
    "name": "Tamilselvan M",
    "roles": [{"id": 1, "name": "OWNER"}]
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 3. Authenticated Requests
```bash
curl -X GET http://localhost:8080/permissions/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## Testing with Postman

### Collections Available
- **Complete Collection**: `postman/collections/smartsme-api.postman_collection.json`
- **Development Environment**: `postman/environments/development.postman_environment.json`
- **Staging Environment**: `postman/environments/staging.postman_environment.json`

### Test Scenarios

1. **Guest Access Testing**
   - Test all endpoints without authentication
   - Verify only read permissions are granted
   - Confirm read-only actions are available

2. **Role-Based Testing**
   - Login as different roles
   - Compare permission differences
   - Test action availability per role

3. **Token Management**
   - Test token refresh functionality
   - Verify token expiration handling
   - Test logout behavior

## Database Schema

### Core RBAC Tables
- `users` - User accounts with profile information
- `roles` - System roles (OWNER, ADMIN, etc.)
- `actions` - Available actions (CREATE, READ, UPDATE, etc.)
- `permissions` - Resource-specific permissions
- `map_user_role` - User-to-role assignments
- `map_role_permission` - Role-to-permission mappings
- `map_role_action` - Role-to-action mappings

### Key Relationships
- Users can have multiple roles
- Roles have multiple permissions and actions
- Permissions are resource-specific (PRODUCTION, SECONDARY_PROCESS)
- Guest role (ID: 0) is handled in code, not database

## Environment Configuration

### Required Environment Variables
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=smartsme
DB_USER=smartsmeusr
DB_PASSWORD=sm@rtsmepwd

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Server
PORT=8080
NODE_ENV=development
```

### Development Setup
```bash
# Install dependencies
npm install

# Start MySQL with Docker
docker build -f mysql.Dockerfile -t smartsme-mysql:8.0.23 .
docker run -d --name smartsme-mysql \
  -e MYSQL_DATABASE=smartsme \
  -e MYSQL_USER=smartsmeusr \
  -e MYSQL_PASSWORD='sm@rtsmepwd' \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 \
  smartsme-mysql:8.0.23

# Start the server
npm start
```

## API Specification

Complete OpenAPI 3.0 specification available at: `openapi.yaml`

### Key Features
- **Security Schemes**: JWT Bearer + Guest access
- **Comprehensive Schemas**: User, Role, Permission, Action models
- **Detailed Examples**: Request/response examples for all endpoints
- **Error Handling**: Standardized error responses
- **Multiple Environments**: Development, staging, production servers

## Support & Contributing

### Documentation Structure
```
docs/
├── api/
│   ├── openapi.yaml           # OpenAPI specification
│   ├── README.md              # This file
│   └── postman/
│       ├── collections/       # Postman collections
│       ├── environments/      # Environment configs
│       └── README.md          # Postman guide
```

### Getting Help
- Check Postman collection examples
- Review OpenAPI specification
- Test with guest access first
- Verify environment configuration

### Best Practices
- Always test guest access functionality
- Use appropriate roles for testing
- Keep JWT secrets secure
- Follow RESTful API conventions
- Implement proper error handling
