# Recipe App with Authentication

## Overview

Welcome to the Recipe App with Authentication repository! This project is a web application that allows users to discover, save, and share their favorite recipes. The application includes authentication features to enhance user experience and security.

## Features

- **User Authentication:** Secure user authentication system to register, log in, and log out.
- **Recipe Management:** Create, view, edit, and delete recipes.
- **Favorites:** Save your favorite recipes for quick access.
- **Responsive Design:** The application is designed to work seamlessly on various devices.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Vedant817/Recipe-App-Authentication.git
```
2. Navigate to the project directory:
```bash
cd Recipe-App-Authentication
```
3. Install dependencies:
```bash
npm install
```
4.  Set up the environment variables:
  
    Create a `.env` file in the project root and add the following:
    ```bash
    PORT=3000
    MONGODB_URI=your_mongodb_uri_here
    SESSION_SECRET=your_session_secret_here
    ``` 
    
    Replace `your_mongodb_uri_here` and `your_session_secret_here` with your MongoDB connection URI and a secret for session management.
    
5.  Start the application:
`npm start` 

The application should be running at `http://localhost:3000`.

## Usage

1.  Register for an account or log in if you already have one.
2.  Explore recipes, add new recipes, and save your favorites.
3.  Enjoy a personalized cooking experience with the Recipe App!

## Contributing

If you'd like to contribute to this project:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature-branch`.
3.  Make your changes and commit them: `git commit -m 'Add new feature'`.
4.  Push to the branch: `git push origin feature-branch`.
5.  Submit a pull request.

Your contributions are welcome and appreciated!
