# SmartSME API - Postman Collection

This directory contains the Postman collection and environment for testing the SmartSME Manufacturing ERP API.

## Quick Start

1. **Import Collection**: Import `collections/smartsme-api.postman_collection.json` into Postman
2. **Import Environment**: Import `environments/development.postman_environment.json`
3. **Set Environment**: Select "SmartSME Development" environment in Postman
4. **Login**: Use any login request to authenticate and test role-based access
5. **Test Endpoints**: All manufacturing endpoints are organized by functionality

## Collection

### `smartsme-api.postman_collection.json`
Complete Manufacturing ERP API collection with all endpoints:

- **Authentication**: User login for all 9 roles, token refresh, user info, logout
- **Products**: CRUD operations for die-cast products
- **Machines**: CRUD operations for manufacturing machines
- **Orders**: CRUD operations for customer orders
- **Production Shifts**: CRUD operations for production shift tracking
- **Companies**: Company information retrieval
- **Users**: User management endpoints
- **Permissions**: Role-based permission checking
- **Actions**: Role-based action checking

## Environment

### `development.postman_environment.json`
- **Base URL**: `http://127.0.0.1:8080/api/1.0.0`
- **Environment**: `development`

## Testing Workflow

### 1. Manufacturing Endpoints Testing
Test the manufacturing endpoints:

**Products**:
- GET `/api/1.0.0/products` - List all products
- GET `/api/1.0.0/products/{id}` - Get specific product
- POST `/api/1.0.0/products` - Create new product
- PUT `/api/1.0.0/products/{id}` - Update product
- DELETE `/api/1.0.0/products/{id}` - Delete product

**Machines**:
- GET `/api/1.0.0/machines` - List all machines
- GET `/api/1.0.0/machines/{id}` - Get specific machine
- POST `/api/1.0.0/machines` - Create new machine
- PUT `/api/1.0.0/machines/{id}` - Update machine
- DELETE `/api/1.0.0/machines/{id}` - Delete machine

**Orders**:
- GET `/api/1.0.0/orders` - List all orders
- GET `/api/1.0.0/orders/{id}` - Get specific order
- POST `/api/1.0.0/orders` - Create new order
- PUT `/api/1.0.0/orders/{id}` - Update order
- DELETE `/api/1.0.0/orders/{id}` - Delete order

**Production Shifts**:
- GET `/api/1.0.0/production-shift` - List all shifts (with pagination & search)
- GET `/api/1.0.0/production-shift/{id}` - Get specific shift
- POST `/api/1.0.0/production-shift` - Create new shift
- PUT `/api/1.0.0/production-shift/{id}` - Update shift
- DELETE `/api/1.0.0/production-shift/{id}` - Delete shift

**Companies**:
- GET `/api/1.0.0/companies` - List all companies (with pagination & search)
- GET `/api/1.0.0/companies/{id}` - Get specific company
- POST `/api/1.0.0/companies` - Create new company
- PUT `/api/1.0.0/companies/{id}` - Update company
- DELETE `/api/1.0.0/companies/{id}` - Delete company

**Users**:
- GET `/api/1.0.0/users` - List all users (excludes passwords)
- GET `/api/1.0.0/users/{id}` - Get specific user
- POST `/api/1.0.0/users` - Create new user
- PUT `/api/1.0.0/users/{id}` - Update user
- DELETE `/api/1.0.0/users/{id}` - Delete user

### 2. Role-Based Testing
1. **Login as different roles**:
   - **OWNER (Tamil)**: Full system access - all CRUD operations
   - **ADMIN (Nandha)**: Administrative access - most operations
   - **PLANT_HEAD (Alice)**: Plant management - production oversight
   - **SHIFT_INCHARGE (Bob)**: Production management - shift operations
   - **STORES_INCHARGE (Diana)**: Inventory management - materials & stock
   - **PRODUCTION_EMPLOYEE (Ethan)**: Limited production access - floor operations
   - **SECONDARY_PROCESS_EMPLOYEE (George)**: Secondary process operations
   - **ACCOUNTANT (Ian)**: Billing and accounting access - financial data

2. **Test permissions**: Use "Check Permissions" to see role differences
3. **Test actions**: Use "Check Actions" to see available actions per role
4. **Role hierarchy**: Test access levels from OWNER (highest) to EMPLOYEE (lowest)

### 3. Token Management
- Access tokens are automatically stored after login
- Use "Refresh Token" to get new access tokens
- Tokens are included in subsequent requests automatically

## Available Test Users

| Username | Role | Password | Description |
|----------|------|----------|-------------|
| tamil | OWNER | password123 | Full system access |
| nandha | ADMIN | password123 | Administrative access |
| alicej | PLANT_HEAD | password123 | Plant management |
| bobsmith | SHIFT_INCHARGE | password123 | Production management |
| charlieb | SHIFT_INCHARGE | password123 | Production management |
| dianap | STORES_INCHARGE | password123 | Inventory management |
| ethanh | PRODUCTION_EMPLOYEE | password123 | Production operations |
| fionag | PRODUCTION_EMPLOYEE | password123 | Production operations |
| georgem | SECONDARY_PROCESS_EMPLOYEE | password123 | Secondary processes |
| hannahl | SECONDARY_PROCESS_EMPLOYEE | password123 | Secondary processes |
| ianc | ACCOUNTANT | password123 | Billing and accounting |
| jasminep | PRODUCTION_EMPLOYEE | password123 | Production operations |
| kevinw | STORES_INCHARGE | password123 | Inventory management |

## Permission Examples

### SHIFT_INCHARGE Permissions
```json
{
  "permissions": [
    {"name": "PRODUCTION_CREATE", "resource": "PRODUCTION"},
    {"name": "PRODUCTION_READ", "resource": "PRODUCTION"},
    {"name": "PRODUCTION_UPDATE", "resource": "PRODUCTION"},
    {"name": "SECONDARY_PROCESS_CREATE", "resource": "SECONDARY_PROCESS"},
    {"name": "SECONDARY_PROCESS_READ", "resource": "SECONDARY_PROCESS"},
    {"name": "SECONDARY_PROCESS_UPDATE", "resource": "SECONDARY_PROCESS"}
  ]
}
```

## Action Examples

### SHIFT_INCHARGE Actions
```json
{
  "actions": [
    {"name": "CREATE", "description": "Create new records"},
    {"name": "READ", "description": "View/Read records"},
    {"name": "UPDATE", "description": "Update existing records"},
    {"name": "APPROVE", "description": "Approve records or transactions"}
  ]
}
```

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: 
   - Check if you're logged in
   - Verify access token is set
   - Try refreshing the token

2. **403 Forbidden**:
   - User doesn't have required permissions
   - Try logging in with a different role

3. **Environment Variables**:
   - Ensure correct environment is selected
   - Verify `baseUrl` is set correctly

### Debug Tips

- Check the Postman Console for request/response details
- Verify JWT token payload at [jwt.io](https://jwt.io)
- Use "Get User Info" to check current user's roles
- Test authentication first to verify API is working

## API Documentation

For complete API documentation, see:
- OpenAPI Spec: `../openapi.yaml`
- Interactive docs: Available when server is running at `/docs` (if configured)
