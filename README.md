# Course Selling App

The Course Selling App is a full-stack web application that enables users to buy and sell courses. It provides a user-friendly interface for managing courses, user authentication, and facilitating course purchases.

## Features

- User and Admin authentication using JWT tokens
- CRUD operations for courses (Admin only)
- User signup, login, and course purchase
- View purchased courses by users
- MongoDB database integration
- Express server with token-based authentication

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB (via Mongoose)

### Authentication

- JSON Web Tokens (JWT)

### Frontend (In development)

- React
- MUI

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/course-selling-app.git
   cd course-selling-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your MongoDB database:**

   Update the connection string in `index.js`:

   ```javascript
   mongoose.connect('your-mongodb-connection-string', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       dbName: "course-app"
   });
   ```

4. **Run the application:**

   ```bash
   npm start
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- **Admin routes:**
  - `/admin/signup`, `/admin/login`, `/admin/courses` to manage courses.

- **User routes:**
  - `/users/signup`, `/users/login`, `/users/courses`, `/users/courses/:courseId`, `/users/purchasedCourses` for user-related operations.

## Tech Details

Provide more detailed information about your tech choices. Explain why you chose a particular stack, how components interact, and any other relevant technical details.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Follow the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.
