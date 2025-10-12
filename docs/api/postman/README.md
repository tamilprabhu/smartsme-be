# SmartSME API - Postman Collections

This directory contains Postman collections and environments for testing the SmartSME API.

## Quick Start

1. **Import Collection**: Import `collections/smartsme-api.postman_collection.json` into Postman
2. **Import Environment**: Import `environments/development.postman_environment.json`
3. **Set Environment**: Select "SmartSME Development" environment in Postman
4. **Test Guest Access**: Run requests in "Guest Access (No Auth)" folder first
5. **Login**: Use any login request to authenticate and test role-based access

## Collections

### `smartsme-api.postman_collection.json`
Complete API collection with all endpoints organized by functionality:

- **Guest Access (No Auth)**: Test API without authentication (read-only access)
- **Authentication**: Login, logout, token refresh, user info
- **Permissions**: Check and retrieve user permissions
- **Actions**: Check and retrieve user actions

## Environments

### `development.postman_environment.json`
- **Base URL**: `http://127.0.0.1:8080`
- **Environment**: `development`

### `staging.postman_environment.json`
- **Base URL**: `https://staging-api.smartsme.com`
- **Environment**: `staging`

## Testing Workflow

### 1. Guest Access Testing
Run requests in "Guest Access (No Auth)" folder to test:
- Guest users get only READ permissions
- Guest users can only perform READ actions
- No authentication required

### 2. Role-Based Testing
1. **Login as different roles**:
   - OWNER (Tamil): Full access
   - SHIFT_INCHARGE (Bob): Production + Secondary Process
   - PRODUCTION_EMPLOYEE (Ethan): Limited production access

2. **Test permissions**: Use "Check Permissions" to see role differences
3. **Test actions**: Use "Check Actions" to see available actions per role

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

### Guest Permissions (No Auth)
```json
{
  "permissions": [
    {"name": "PRODUCTION_READ", "resource": "PRODUCTION"},
    {"name": "SECONDARY_PROCESS_READ", "resource": "SECONDARY_PROCESS"}
  ]
}
```

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

### Guest Actions (No Auth)
```json
{
  "actions": [
    {"name": "READ", "description": "View/Read records"}
  ]
}
```

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
- Test guest access first to verify API is working

## API Documentation

For complete API documentation, see:
- OpenAPI Spec: `../openapi.yaml`
- Interactive docs: Available when server is running at `/docs` (if configured)
