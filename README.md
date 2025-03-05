# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

# WTWR(What to Wear?) - Back-End Overview

Overview: The back-end of the ("WTWR") application powers the logic and functionality that enables users to receive personalized outfit suggestions based on weather data an their preferences. The server interacts with a database to store user information and preferences, and it fetches live weather data to provide relevant outfit recommendations.

## Technologies Used:

1. Node.js:
   Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to write server-side code using JavaScript, enabling full-stack JavaScript development.

Why Using Node.js?

Asynchronous and Non-blocking: Node.js is ideal for building APIs that handle multiple requests at once. Since WTWR involves fetching external weather data, Node’s event-driven model is useful for asynchronous operations (like API calls).
Fast and Scalable: Node.js can handle a large number of requests concurrently, making it a great fit for real-time applications like WTWR that need to respond to various user requests efficiently.
Unified JavaScript Development: With Node.js, you can use the same language (JavaScript) on both the front-end and back-end, simplifying the development process.

2. Express.js:
   Express.js is a minimal web application framework for Node.js. It simplifies the creation of APIs and web servers by providing tools for routing, handling requests, middleware support, and more.

Why Using Express.js?

Routing and Middleware: Express allows you to easily set up API routes (e.g., for user registration, login, and fetching weather data). You can also add middleware for security, logging, or error handling.
Simplifies Development: Express helps streamline common tasks in backend development, such as handling HTTP requests, managing sessions, and routing API endpoints.
Flexibility: You can integrate other packages (like Mongoose for MongoDB) and use it with different databases, making Express highly flexible.

3. Mongoose:

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward way to interact with MongoDB by allowing you to define models and schemas, making database management easier.

Why Using Mongoose?

Schema-Based Data Modeling: Mongoose lets you define how data should be structured in MongoDB, ensuring consistency and validation. For example, you could have schemas for users, outfits, and preferences.
Built-in Validation: Mongoose allows you to set validation rules for your data, ensuring that users' input (like emails, usernames, and clothing preferences) is formatted correctly before it's saved to the database.
Ease of Use: Mongoose abstracts away many of the complex aspects of interacting with MongoDB, such as managing relationships between collections and querying data.

4. MongoDB:

MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. Unlike traditional relational databases, MongoDB allows for unstructured or semi-structured data, making it a great choice for modern web applications that require flexibility in storing data.

Why Using MongoDB?

Scalability and Flexibility: MongoDB handles large-scale applications with ease. The NoSQL structure allows for easy scaling and changes to data models without downtime.
Document-Oriented: Since the data in WTWR (e.g., user profiles, weather data, outfit preferences) is somewhat flexible and may change over time, MongoDB’s document-based model is a good fit.
Real-Time Data: MongoDB allows for high-speed reads and writes, making it ideal for applications where data is constantly changing or being updated, such as live weather data and user preferences.
