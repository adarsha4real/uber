## User Registration API Documentation

### Register User

- **Endpoint**: `/users/register`
- **Method**: POST
- **Description**: Register a new user with their details

#### Request Body

{
"fullname": {
"firstname": "string", // required, min 3 characters
"lastname": "string" // optional, min 3 characters if provided
},
"email": "string", // required, valid email format, min 5 characters
"password": "string" // required, min 6 characters
}

#### Success Response

- **Status Code**: 201 (Created)
- **Response Body**:

{
"token": "JWT_token_string",
"user": {
"fullname": {
"firstname": "string",
"lastname": "string"
},
"email": "string",
"\_id": "string",
// password field is not returned in response
},
"message": "User registered successfully"
}

#### Error Responses

1. Validation Error

- **Status Code**: 400 (Bad Request)
- **Response Body**:

{
"errors": [
{
"msg": "firstnamename is required",
"param": "fullname.firstname",
"location": "body"
}
]
}

2. Server Error

- **Status Code**: 500 (Internal Server Error)

#### Required Fields Validation

- firstname: Required, minimum 3 characters
- email: Required, valid email format, minimum 5 characters
- password: Required, minimum 6 characters

#### Notes

- Password is hashed before storing in database
- JWT token is generated upon successful registration
- Email must be unique in the system


 
### Login User

- **Endpoint**: `/users/login`
- **Method**: POST
- **Description**: Authenticate a user and get access token

#### Request Body

{
"email": "string",
 // required, valid email format
"password": "string"
 // required
}

#### Success Response

- **Status Code**: 200 (OK)
- **Response Body**:

{
"token": "JWT_token_string",
"user": {
"fullname": {
"firstname": "string",
"lastname": "string"
},
"email": "string",
"\_id": "string"
},
"message": "Login successful"
}

#### Error Responses

1. Validation Error

- **Status Code**: 400 (Bad Request)
- **Response Body**:

{
"errors": [
{
"msg": "Invalid email",
"param": "email",
"location": "body"
}
]
}

2. Authentication Error

- **Status Code**: 401 (Unauthorized)
- **Response Body**:

{
"message": "Invalid credentials"
}

3. Server Error

- **Status Code**: 500 (Internal Server Error)

#### Required Fields Validation

- email: Required, valid email format
- password: Required

#### Notes

- JWT token is generated upon successful authentication
- Email and password are validated against database
- Password is hashed before comparison


### GET /users/profile                  

#### Description
Get the authenticated user's profile information.

#### Authentication
Requires valid JWT token in Authorization header or cookie.

#### Success Response
- **Status Code**: 200 (OK)
- **Response Body**:

{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
  }
}


### GET /users/logout

#### Description
Logs out the currently authenticated user by invalidating their token.

#### Authentication
Requires valid JWT token in Authorization header or cookie.

#### Success Response
- **Status Code**: 200 (OK)
- **Response Body**:

{
  "message": "logged out"
}


#### Notes
- Clears token cookie
- Adds token to blacklist to prevent reuse

### POST /captain/register

#### Description
Register a new captain with vehicle information.

#### Request Body

{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}


#### Validation
- Email must be unique
- All fields are required
- Password will be hashed before storage

#### Success Response
- **Status Code**: 201 (Created)
- **Response Body**:

{
  "token": "string",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "_id": "string"
  },
  "message": "Captain registered successfully"
}


#### Error Responses
- **Status Code**: 400 (Bad Request)
  - If email already exists
  - If validation fails
- **Status Code**: 500 (Internal Server Error)
  - If server encounters an error
