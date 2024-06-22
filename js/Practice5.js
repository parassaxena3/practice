//Express.js
/*
Express.js is a web application framework for Node.js. It provides a robust set of features for building web applications and APIs, including routing, middleware, and templating.

Basic Express.js Example:
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

Middleware:
Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can perform various tasks such as executing code, making changes to the request and response objects, ending the request-response cycle, and calling the next middleware function in the stack.

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

Note:
Both res.json and res.send send the response to the client and end the response process. They do not pass control to the next middleware in the chain. If you want to pass control to the next middleware, you should use next(). 
res.json: Sends a JSON response. This method sets the Content-Type header to application/json and converts the given object or array to a JSON string.
res.send: Sends the HTTP response. The body parameter can be a Buffer object, a String, an object, or an array. It automatically sets the Content-Type header based on the data type.


Routing:
Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, etc.).

app.get('/user/:id', (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});

or using express.Router:

const router = express.Router();
router.get('/user/:id', (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});

Error Handling:
Express.js provides a built-in error-handling middleware function that can be used to catch errors and handle them in a centralized way.
This middleware function takes four arguments: (err, req, res, next) while other middleware functions take three arguments: (req, res, next).
If an error is thrown in a route handler or another middleware function, Express will call this error-handling middleware function. 
It should be defined as the last app.use() method.

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}

Handling 404 Errors:
Define middleware to handle 404 errors (route not found).

app.use((req, res, next) => {
  res.status(404).send('Sorry, can\'t find that!');
}


Static Files:

To serve static files using Express.js, you can use the built-in middleware function express.static. This middleware allows you to specify a directory from which to serve static assets such as HTML files, CSS files, JavaScript files, images, and other static content.

public/
├── index.html
├── styles.css
└── script.js


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

http://localhost:3000/ will serve index.html.
http://localhost:3000/styles.css will serve styles.css.
http://localhost:3000/script.js will serve script.js.

When you navigate to http://localhost:3000/, the express.static middleware will serve public/index.html because it is defined before the route handler for /.
If the express.static middleware does not find index.html or another matching static file, it would then pass the request to the next middleware or route handler, which is your app.get('/', ...) route.


*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Multer Middleware
/*
Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It is designed to work with Express.js and Node.js.
Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, and the file or files object contains the files uploaded via the form.
It has various options for configuring the upload behavior, such as setting the destination directory, renaming the uploaded files, and limiting the file size. You can also specify the number of files to upload in a single request or the file types allowed for upload.

Basic Multer Example:
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
})
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Joi Validation
/*
Joi is a powerful schema description language and data validator for JavaScript. It is used to validate and sanitize data before using it in an application. Joi allows you to define a schema for your data and validate it against that schema.

Basic Joi Example:
const Joi = require('joi');
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(99).required(),
});
const { error, value } = schema.validate ({ username: 'JohnDoe', email: 'jd@e.com', age: 25 });
if (error) {
  console.log(error.details);
}
else {
  console.log(value);
}

express-validation:
express-validation is a middleware for Express.js that simplifies request validation using Joi. It allows you to define validation schemas for your routes and automatically validates the request data against those schemas.

Basic express-validation Example:
const { validate } = require('express-validation');
const Joi = require('joi');
const userValidation = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(99).required(),
  })
};
app.post('/user', validate(userValidation), (req, res) => {
  res.send('User created successfully!');
});
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Best Practices for Node.js
/*
Graceful Shutdown:
Ensure your application can shut down gracefully in case of uncaught exceptions or unhandled promise rejections.

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});


Logging:
Use a logging library like Winston or Bunyan to log application events and errors. Log important information such as request details, errors, and application state changes.

const winston = require('winston');
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).send('Something broke!');
});

// Helmet:
Helmet is a security middleware for Express.js that helps secure your application by setting various HTTP headers to prevent common security vulnerabilities. It provides protection against cross-site scripting (XSS), clickjacking, and other attacks.

const helmet = require('helmet');
app.use(helmet());

// CORS:
Cross-Origin Resource Sharing (CORS) is a security feature that restricts which resources a web page can request from another domain. Use the cors middleware to enable CORS in your Express.js application.

const cors = require('cors');
app.use(cors());

// Rate Limiting:
Rate limiting is a technique used to limit the number of requests a client can make to your server within a specific time frame. Use a rate-limiting middleware like express-rate-limit to prevent abuse and protect your server from denial-of-service attacks.

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Unit Testing in Node.js
/*
Unit testing is a software testing technique where individual units or components of a software application are tested in isolation. The goal of unit testing is to validate that each unit of the software performs as designed.

Best and most popular testing frameworks for Node.js are Mocha and Jest. They provide a rich set of features for writing and running tests, including support for asynchronous testing, test suites, and assertions. Mocha is more flexible and allows you to choose your assertion library and mocking framework, while Jest comes with built-in support for assertions, mocking, and code coverage.

Writing a Test for the Function:
const { test, expect } = require('@jest/globals');
const { add } = require('./math');
test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
}

Asynchronous Tests:
const { fetchData } = require('./api');
test('fetchData returns data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined(); // or expect(data).toBe('peanut butter');
});


Running Tests:
You can run Jest tests using the jest command in the terminal. Jest will automatically find and run test files with the .test.js or .spec.js extension.
Command is jest which you can run in terminal or you can add it in package.json file as a script.

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Package.json, Package-lock.json and Versioning
/*

Package.json:
package.json is a metadata file for Node.js projects that contains information about the project, its dependencies, and scripts to run various tasks. It is used to define the project's name, version, description, entry point, dependencies, and other details.

Example package.json:
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A sample Node.js application",
  "main": "index.js",
  "dependencies": {
    "express": "^4.17.1",
    "joi": "^17.4.0"
  },
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  }
}

Package-lock.json:
package-lock.json is an automatically generated file that contains information about the exact versions of dependencies installed in a project. It ensures that the same versions of dependencies are installed across different environments and prevents version conflicts. It is used to lock the dependency tree and ensure reproducible builds.

Versioning:
Semantic versioning (SemVer) is a versioning scheme that defines how version numbers are assigned and incremented for software releases. It consists of three numbers separated by dots: major.minor.patch.

Major version (X.0.0): Incremented for incompatible API changes.
Minor version (1.X.0): Incremented for backward-compatible functionality.
Patch version (1.0.X): Incremented for backward-compatible bug fixes.

Exact version: Specifies the exact version to use like "express": "4.17.1".
Wildcard (*): Allows any version.
Caret (^): Allows changes that do not modify the leftmost non-zero digit.
Tilde (~): Allows patch-level changes.

Example dependencies in package.json:
"dependencies": {
  "express": "^4.17.1",
  "joi": "~17.4.0"
}

*/
