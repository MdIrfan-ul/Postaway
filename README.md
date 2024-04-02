# Postaway-II-Project-social-media


## Project Overview

To Develop a robust social media backend REST API that empowers users to post,comment, like, send friend requests and reset their passwords using OTP for enhanced security.

## Technologies Used
[![Languages Used](https://skillicons.dev/icons?i=js,nodejs,express,mongodb,postman)](https://skillicons.dev)
- **Express.js**: Web application framework for Node.js used to build the API.
- **Node.js**: Server-side JavaScript runtime environment.
- **MongoDB**: A document-based, NoSQL database used for data storage and retrieval.
- **JWT**: JSON Web Token used for secure authentication.
- **Multer**: Middleware for handling multipart/form-data, used for storing media uploads.
- **Postman**: API development environment used for testing and debugging.

## Key Features

- **User Authentication**: Users can sign up and sign in securely to access the platform's features. JWT is used for authentication.
- **Password Reset**: Users can reset their passwords securely using OTP (One-Time Password).
- **Create and Manage Posts**: Users can create, update, delete, and archive their posts, incorporating text and media content.
- **Engagement Features**: Postaway supports user engagement with like and comment functionalities for each post.
- **Friend Management**: Users can send friend requests, accept or reject pending requests, and manage their friends list.
- **Bookmarking and Saving**: Users can bookmark or save posts for later reference.
- **Filtering**: Posts can be filtered based on captions, enhancing discoverability.
- **Pagination**: Retrieve posts and comments in a paginated format for optimized performance.

## API Endpoints

### User Management
- `POST /api/users/signup`: Register a new user.
- `POST /api/users/signin`: Authenticate an existing user.
- `GET /api/users/logout`: Logout the user from the current device.
- `GET /api/users/logout-all-devices`: Logout the user from all devices.
- `GET /api/users/get-details/:userId`: Get details of a specific user.
- `GET /api/users/get-all-details`: Get details of all users.
- `PUT /api/users/update-details/:userId`: Update user details, including avatar.

### Posts
- `POST /api/posts/`: Create a new post.
- `GET /api/posts/all`: Retrieve all posts in a paginated format.
- `GET /api/posts/:postId`: Retrieve a specific post by postId.
- `GET /api/posts/`: Retrieve posts based on user credentials.
- `PUT /api/posts/:postId`: Update a post by postId.
- `DELETE /api/posts/:postId`: Delete a post by postId.

### Comments
- `GET /api/comments/:postId`: Retrieve comments for a specific post by postId.
- `POST /api/comments/:postId`: Create a comment for a specific post by postId.
- `PUT /api/comments/:commentId`: Update a comment by commentId.
- `DELETE /api/comments/:commentId`: Delete a comment by commentId.

### Likes
- `GET /api/likes/:postId`: Retrieve all likes for a specific post by postId.
- `GET /api/likes/toggle/:postId`: Toggle like feature to like or unlike a post.

### Friends
- `GET /api/friends/get-friends/:userId`: Get friends of a user.
- `GET /api/friends/get-pending-requests`: Get pending friend requests for the user.
- `GET /api/friends/toggle-friendship/:friendId`: Toggle friendship with another user.
- `GET /api/friends/response-to-request/:friendId`: Respond to a friend request.

### OTP
- `POST /api/otp/send`: Send OTP for password reset.
- `PUT /api/otp/verify`: Verify OTP for password reset.

## Documentation

API documentation is available using Swagger UI at `/api/docs` for comprehensive information about the application and its endpoints.

## How to Use

To use the API, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the server using `npm start`.
5. Access the API endpoints as described in the documentation.

## Database Usage

Postaway utilizes MongoDB for data storage and retrieval. Ensure you have MongoDB installed and configured for the application to function properly.

Join us on this journey to create a dynamic social networking experience with Postaway!

---
*Note: This project description assumes familiarity with Express-Node framework and RESTful API concepts.*
