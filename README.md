# Travel Agency API

## Description

This is a Node.js-based API for a travel agency that allows users to book offers, manage their accounts, and browse available trips. It includes authentication, role-based access control, and real-time features with WebSockets.

## Features

### Users:
- Register and delete accounts.
- Book offers and manage bookings.
- Edit personal data.
- Browse offers without logging in.

### Admin:
- View all user bookings.
- Add, edit, and manage travel packages.

### Authentication & Security:
- JWT authentication for secure access.
- Password encryption.
- Role-based user management (Admin, User, Guest).

### RESTful API:
- CRUD operations for users, bookings, and offers.
- Data search using patterns.
- Login system following RESTful standards.

### Database:
- PostgreSQL

## WebSockets
- WebSockets are used for real-time connection with admin to ask questions.

## Database
- Uses MongoDB / PostgreSQL (specify which one you use).
- Stores user data, bookings, and travel offers.

## Security Measures
- Passwords are encrypted before storing in the database.
- JWT is used for authentication and authorization.
- Role-based access control is implemented.

## API Documentation
- Swagger 
![image](https://github.com/user-attachments/assets/97d345f8-c3d7-4bd9-920d-c7a77bee2f74)
![image](https://github.com/user-attachments/assets/fdb617b1-7dc2-4d69-9759-220d2e543fef)


## Frontend
- The frontend can be accessed at:
  ```
  https://github.com/kuczkoowska/podRUSHe---front
  ```

