# OMDB - Octaloop

This web application allows users to search for movies using the OMDB API and save the results to a local MongoDB database. The application also allows users to update movie details in the local database, view top-rated movies for a given release year and rating source from the local database, and implements token-based authentication to access the aforementioned features.

## Technology Stack

- Node.js: The backend of the application is built using Node.js, an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.
- MongoDB: The database used in this application is MongoDB, a NoSQL database that stores data in a JSON-like format.
- Express.js: Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- React.js: React.js is a JavaScript library for building user interfaces, used for the frontend of the application.
- Axios: Axios is a JavaScript library used for making HTTP requests, it is used in this application to make requests to the OMDB API and the server.

## Features

- **Search for movies** by title or IMDB ID and save the results to the local MongoDB database. The search feature allows users to find movies by keyword and display the details of the movie such as title, year, rating, etc.
- **Update movie details** in the local database, including the title and release year. The update feature allows users to change any information about the movie and save it in the database.
- **View top-rated movies** for a given release year and rating source, sorted by IMDB rating. The top-rated feature allows users to filter and see the top-rated movies of a specific year.
- **Token-based authentication** to access the aforementioned features, with the option to refresh expired tokens. This feature ensures that only authorized users can access the protected routes of the application.
- **User-friendly interface** for easy navigation and movie search. The application has a visually appealing and easy-to-use interface that makes it easy for users to find and view information about movies.

## Installation

1. Clone the repository: `git clone https://github.com/bhavy2908/omdb-octaloop`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Start the client: `npm run client`
5. In your browser, navigate to `http://localhost:3000`

## Conclusion

This Movie Database Web App is a great tool for movie lovers and enthusiasts, providing a simple and easy-to-use interface to search, view, and update information about movies. With its token-based authentication, it ensures that only authorized users can access the protected routes, making it a secure and reliable application.
