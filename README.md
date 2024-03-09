# Postaway
 Postaway: Social Networking Platform API Postaway is a social networking platform designed to facilitate seamless user interaction through posts, media sharing, likes, and comments. This project focuses on developing a robust API using the Express-Node framework, empowering developers to create a dynamic and engaging social media application.
## Project Overview

Postaway's core functionality revolves around allowing users to create posts enriched with text and media, as well as facilitating interactions through likes and comments. The project's focus is on developing an efficient API using the Express-Node framework, ensuring robustness, scalability, and maintainability.

## Technologies Used
[![Languages Used](https://skillicons.dev/icons?i=js,nodejs,express,postman)](https://skillicons.dev)
- **Express.js**: Web application framework for Node.js used to build the API.
- **Node.js**: Server-side JavaScript runtime environment.
- **Swagger UI**: API documentation tool used to provide comprehensive information about the application's endpoints.
- **Data Structures**: Utilized for storing values in the absence of a database.
- **Postman**: API development environment used for testing and debugging.
- **Multer**: Middleware for handling multipart/form-data, used for storing media uploads.

## Key Features

- **User Authentication**: Users can sign up and sign in securely to access the platform's features.
- **Create and Manage Posts**: Users can create, update, delete, and archive their posts, incorporating text and media content.
- **Engagement Features**: Postaway supports user engagement with like and comment functionalities for each post.
- **Bookmarking and Saving**: Users can bookmark or save posts for later reference.
- **Filtering**: Posts can be filtered based on captions, enhancing discoverability.
- **Pagination**: Retrieve posts and comments in a paginated format for optimized performance.

## API Endpoints

### User Management
- `POST /api/users/signup`: Register a new user.
- `POST /api/users/signin`: Authenticate an existing user.

### Posts
- `GET /api/posts/filter`: Filter posts based on captions.
- `POST /api/posts/:postId/save`: Save a post by postId.
- `PUT /api/posts/:postId/archieve`: Archive a post by postId.
- `POST /api/posts/:postId/bookmark`: Bookmark a post by postId.
- `GET /api/posts/all`: Retrieve all posts in a paginated format.
- `POST /api/posts/`: Create a new post.
- `GET /:id`: Retrieve a specific post by postId.
- `PUT /api/posts/:id`: Update a post by postId.
- `DELETE /api/posts/:id`: Delete a post by postId.
- `GET /api/posts/`: Retrieve posts based on user credentials.

### Comments
- `PUT /api/comments/:id`: Update a comment by commentId.
- `GET /api/comments/:id`: Retrieve comments for a specific post by postId.
- `POST /api/comments/:id`: Create a comment for a specific post by postId.
- `DELETE /api/comments/:id`: Delete a comment by commentId.
- `GET /pages/:id`: Retrieve comments in a paginated format.

### Likes
- `POST /api/likes/:id`: Toggle like feature to like or unlike a post.
- `GET /api/likes/:id`: Retrieve all likes for a specific post by postId.

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

For the initial development phase, Postaway utilizes data structures to store values. However, in future iterations, I plan to integrate with MongoDB for enhanced data management and scalability.

Join us on this journey to create a dynamic social networking experience with Postaway!

---
*Note: This project description assumes familiarity with Express-Node framework and RESTful API concepts.*
