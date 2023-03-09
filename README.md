
Ticket Management API
===============================
### The Ticket Management API is a Representational State Transfer (RESTful) API developed using TypeScript and the Express library. The API's backend is powered by MongoDB, which provides full CRUD (Create, Read, Update, Delete) functionality for managing Operation Tickets. This functionality allows businesses to effectively track and manage internal tickets related to customer orders, including those associated with assembly lines. The API utilizes the popular Mongoose library to facilitate connections to MongoDB and enforces user authentication through the use of JSON Web Tokens (JWTs). This comprehensive solution presents businesses with a robust and flexible option for streamlining their internal ticketing processes.

* * *

Getting started tips
--------------------

This application uses the https protocol. Therefore, it is recommended to follow the steps outlined below.

### Setting the application up on your machine

1.  Create the `.env` file in the root of the project. (See [`.env.sample`](.env.sample) for guidance.)
2.  Due to the application using the https protocol, begin by generating a `certificate.crt` file and a `private.key` file, using the command `openssl req -nodes -new -x509 -keyout server.key -out server.cert` assuming you have the openssl cli installed. If not, you can install it [here](https://www.openssl.org/source/)
3.  Install corresponding Node.js packaged using the `npm install` command.
4.  Test your configuration is running properly by running `npm run dev` or `npm run start`.

* * *

API Documentation
-----------------

### Authentication

Authentication is done using JWT tokens. To get a token, make a POST request to `https://localhost:{YOUR_PORT}/api/auth/login` with the following payload

<sup>Keys annotated with \* are required. See [models/User](src/models/User.ts) for which fields are required in the database.</sup>

    {
          "isAdmin": null,
        * "firstname": "John",
        * "lastname": "Doe",
        * "username": "johndoe",
          "email": "jdoe@exmaple.com"
        * "password": "1234"
    }

#### Commands available in this application
|Command  | Description |
|--|--|
| `npm install` | Install required dependencies for the application |
| `npm run build` | Compile the application to the build directory |
| `npm run start` | Start the application in production mode. (Must run build command before!) |
| `npm run dev` | Start the application in development mode. This will also run the typescript compiler in watch mode as well as utilize the npm package nodemon, which is install as a dev dependency |
| `npm run docs` | Build the documentation included in the source code to the [`docs`](/docs) directory. The route `/docs` will become available when the application is running. |