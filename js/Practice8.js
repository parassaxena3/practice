//Key differences between NoSQL and SQL databases:
/*
SQL Databases (Relational):
Structure: Tables with fixed schemas.
Data Integrity: Strong ACID compliance (Atomicity, Consistency, Isolation, Durability).
Scalability: Vertical scaling (adding more power to a single machine).
Query Language: SQL (Structured Query Language).
Examples: MySQL, PostgreSQL, Oracle, SQL Server.
Use Cases: Suitable for complex queries, transactional systems, and applications requiring data integrity.

NoSQL Databases (Non-Relational):
Structure: Flexible schemas, often document, key-value, column-family, or graph-based.
Data Integrity: Generally follows BASE principles (Basically Available, Soft state, Eventually consistent).
Scalability: Horizontal scaling (adding more machines to handle the load).
Query Language: Varies by database (e.g., MongoDB uses JSON-like queries).
Examples: MongoDB, Cassandra, Redis, Neo4j.
Use Cases: Ideal for large-scale data, real-time web apps, and scenarios requiring flexibility in data modeling.

Acid:
Atomicity: All operations in a transaction must be completed successfully, or none of them are.
Example: Consider a banking system where a transfer of $100 from Account A to Account B occurs. The transaction involves two operations:
Deduct $100 from Account A.
Add $100 to Account B.
If the deduction from Account A succeeds but the addition to Account B fails, the transaction should be rolled back so that Account A still has the $100.

Consistency: Data must be in a consistent state before and after the transaction.
Example: In an e-commerce database, a consistency rule might state that the total amount of items in an order must equal the sum of the quantities of each item in the order. If an update violates this rule, the transaction should not be committed.

Isolation: Transactions are isolated from each other until they are completed.
Example: Two transactions simultaneously attempting to update the same account balance should not interfere with each other. If one transaction is updating an account's balance, another transaction should wait until the first one is finished.

Durability: Once a transaction is committed, the changes are permanent and survive system failures.
Example: If a database confirms a booking transaction for a flight ticket, even if the system crashes immediately after, the booking should remain in the database after the system is restored.

BASE:
Basically Available: The system remains operational even in the presence of failures.
Soft state: The system may not be in a consistent state at all times.
Eventually consistent: The system will become consistent over time without blocking operations.
*/

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MongoDB
/*
MongoDB Overview:
Type: Document-oriented database.
Data Model: Stores data in flexible, JSON-like documents.
Scalability: Designed for horizontal scaling through sharding.
Query Language: MongoDB Query Language (MQL), which is similar to JSON.

Key Concepts in MongoDB:
Database: A container for collections.
Collection: A group of MongoDB documents, similar to a table in relational databases.
Document: A set of key-value pairs, similar to a row in relational databases. Documents can have varied structures.
Field: A key-value pair within a document.

//Mongodb limits:
1. Maximum Database Size: 64 TB
2. Maximum Document Size: 16 MB
3. Maximum Number of Documents in a Collection: No hard limits
4. Maximum Number of Indexes on a Collection: No hard limits
5. Maximum Index Size: 1024 bytes
6. Maximum Number of Fields in an Index: 32
7. Maximum Number of Indexes on a Collection: 64
8. Maximum Number of Collections in a Database: No hard limits
9. Maximum Number of Databases on a MongoDB Server: No hard limits
10. Maximum Number of Connections: Varies based on system resources
11. Maximum Number of Fields in a Document: No hard limits
12. Maximum Number of Nested Levels in a Document: 100
13. Maximum Number of Documents Returned by a Query: 16 MB

//Capped Collections in MongoDB:
Capped collections are fixed-size collections that maintain insertion order. Once a collection reaches its maximum size, it behaves like a circular queue, overwriting the oldest documents with new ones. Capped collections are useful for storing logs, event data, or other time-series data. They have the following properties:
1. Fixed Size: Capped collections have a maximum size set during creation.
2. Insertion Order: Documents are stored in the order they were inserted.
3. Automatic Overwrite: When the collection reaches its maximum size, new documents overwrite the oldest ones.
4. No Deletion: Documents cannot be deleted from a capped collection, only overwritten.

*/

//Mongoose
/*
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data, offering a way to structure and validate documents in MongoDB.

Key Features of Mongoose:
Schema Definitions: Define the structure of your documents and enforce data types and validation.
Model Creation: Models are constructed from schemas and provide an interface to interact with the database.
Middleware: Supports pre and post hooks for various operations (e.g., save, remove).
Validation: Built-in and custom validation to ensure data integrity.
Plugins: Extendable through plugins to add functionality.

// Initialize Mongoose and Connect to MongoDB:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

// Define a schema:
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model('User', userSchema);

Example showing all datatypes in Mongoose:

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  zipCode: Number,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  email: { type: String, unique: true },
  isActive: Boolean,
  tags: [String],
  address: addressSchema,
  refId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  profilePicture: Buffer,
  anyField: mongoose.Schema.Types.Mixed,
  salary: mongoose.Schema.Types.Decimal128,
  meta: {
    type: Map,
    of: String
  },
  uuid: {
    type: Buffer,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

const User = mongoose.model('User', userSchema);


You can have a field in a Mongoose schema that references documents from multiple collections. This is often referred to as "polymorphic" relationships.
const userSchema = new mongoose.Schema({
  // Other fields...
  refId: {
    kind: String,
    item: { type: mongoose.Schema.Types.ObjectId, refPath: 'refId.kind' }
  }
});

refId is an object with two properties: kind and item. kind is a string that should be set to the name of the collection you want to reference. item is the actual reference, and its refPath option is set to 'refId.kind', which means it will use the value of refId.kind as the collection name for the reference.

User.find().populate('refId.item');

This will fetch the document with the ID stored in refId.item from the collection named by refId.kind.
Remember that you'll need to manually manage these references, including setting the kind property correctly when you create or update documents.
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Indexing in MongoDB:
/*
Indexing is a way to optimize database queries by creating data structures that allow for faster retrieval of data. In MongoDB, indexes can be created on fields in a collection to improve query performance.

1. **Structure**: Indexes are special data structures that store a small portion of the data set in an easily traversable form. The most common type is the B-tree index. B-tree indexes store keys in sorted order, allowing for efficient search, insert, and delete operations. B-tree looks like a binary tree but can have more than two children. Time complexity for search, insert, and delete operations is O(log n).

2. **Types of Indexes**:
   - **Single Field Index**: Created on a single field of a document.
   - **Compound Index**: Created on multiple fields.
   - **Multikey Index**: Used for fields that contain arrays.
   - **Text Index**: Supports text search queries.
   - **Geospatial Index**: Supports queries for location-based data.
   - **Hashed Index**: Uses hashed values of the indexed field.

3. **Creation**: You can create an index using the `createIndex` method. For example:
   db.collection.createIndex({ field: 1 });
The number 1 indicates an ascending index, while -1 indicates a descending index.

4. **Selection**: MongoDB's query planner uses indexes to find efficient ways to execute queries. It can choose from available indexes or perform a full collection scan if no suitable index is found.

5. **Impact on Write Operations**: While indexes speed up read operations, they can slow down write operations (inserts, updates, deletes) because the index also needs to be updated.

6. **Storage**: Indexes require additional storage space. The size depends on the fields and the data types.

7. **Usage**:
   - **Query Optimization**: Indexes significantly reduce the number of documents MongoDB needs to scan to find matching documents.
   - **Sort Operations**: Indexes can also be used to optimize sort operations.

8. **Monitoring and Maintenance**:
   - Use `explain()` to understand how MongoDB uses indexes in a query.
   - Regularly review and optimize indexes to ensure they match the query patterns.

Indexes are crucial for optimizing query performance in MongoDB. However, it's essential to balance their benefits against the additional storage and maintenance costs.

// Example of creating indexes in Mongoose:

const complexSchema = new mongoose.Schema({
  name: { type: String, index: true }, // Single field index
  age: Number,
  email: { type: String, unique: true }, // Unique index
  tags: { type: [String], index: true }, // Multi-key index
  title: String,
  content: String,
  ip: { type: String, index: 'hashed' }, // Hashed index
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
});

complexSchema.index({ title: 'text', content: 'text' }); // Text index
complexSchema.index({ name: 1, age: -1 }); // Compound index
complexSchema.index({ location: '2dsphere' }); // Geospatial index

const ComplexModel = mongoose.model('Complex', complexSchema);

//ensureIndexes 
//ensureIndexes is a method in Mongoose that ensures that all defined indexes are created on the collection. It can be called on a model to create indexes based on the schema definition.

ComplexModel.ensureIndexes().then(() => {
  console.log('Indexes ensured');
}).catch(err => {
  console.error('Error ensuring indexes:', err);
});

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Advanced concepts of Mongooose
/*

Schema Options:
----------------
Schema options are additional configurations you can set when defining a schema.

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  versionKey: false, // Disables the __v version key
  toJSON: { virtuals: true }, // Include virtuals in toJSON output
  toObject: { virtuals: true }, // Include virtuals in toObject output
});


Custom Validators:
-------------------
Custom validators ensure that data meets specific criteria before it is saved to the database.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot exceed 120'],
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Email is not valid'],
  },
});

Hooks:
------
Hooks in Mongoose are also known as middleware. They allow you to execute custom logic before or after certain operations, such as saving, validating, removing, or updating documents in MongoDB. There are two types of hooks: pre and post.

// Pre-save hook
schema.pre('save', function(next) {
  // Perform some logic before saving the document
  if (this.age < 0) { // this refers to the document being saved
    this.age = 0; // Ensure age is non-negative
  }
  next(); // calling next is required in pre hooks to continue the save operation
});

// Post-save hook (showing use of async/await)
schema.post('save', async function(doc,next) {
  await someAsyncFunction(doc); // doc is the saved document, this is the query object
//calling next is optional in post hooks, it is used if any error needs to be passed to the next middleware, eg next(new Error('Some error'));
});


Summary of Hook Types (all of them support pre and post hooks):

*Document Middleware: save, validate, remove, updateOne, deleteOne
*Query Middleware: count, countDocuments, deleteMany, deleteOne, find, findOne, findOneAndDelete, findOneAndRemove, findOneAndUpdate, replaceOne, update, updateMany, updateOne
*Aggregate Middleware: aggregate
*Model Middleware: insertMany

Note: this keyword inside hooks:
*In Mongoose pre hooks, the this keyword refers to the document being saved, updated, or removed. You can access and modify document properties using this. 
*In post hooks, the this keyword refers to the query object, not the document itself. You can access the document using the doc parameter passed to the hook function. 


Discriminators:
---------------
Discriminators are a way to model inheritance in Mongoose. They allow you to create different models that share a common schema.Discriminators work by adding a special field (discriminator key) to your schema. This field distinguishes between the different models (or subclasses). When you query the collection, Mongoose uses the discriminator key to determine which model schema to use.

const animalSchema = new Schema({
  name: String,
  age: Number
}, { discriminatorKey: 'kind' });
const Animal = mongoose.model('Animal', animalSchema)

const dogSchema = new Schema({
  breed: String
});
const Dog = Animal.discriminator('Dog', dogSchema);

const catSchema = new Schema({
    color: String
    });
const Cat = Animal.discriminator('Cat', catSchema);


Virtuals:
----------
Purpose: 
Virtuals are document properties that are not stored in the database. They are computed values based on other document properties.
Scope: 
Specific to a schema and its instances.
Usage: 
Useful for creating computed properties, like full names from first and last names, or derived data.

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});


Plugins:
--------
Purpose: 
Mongoose plugins are reusable pieces of middleware that can add functionality to schemas.
Scope: 
They can be applied to multiple schemas.
Usage:
Ideal for adding common functionality across models, such as adding timestamps, soft deletes, or other shared behaviors.

function timestampPlugin(schema) {
  schema.add({ createdAt: Date, updatedAt: Date });

  schema.pre('save', function(next) {
    const now = Date.now();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
}
userSchema.plugin(timestampPlugin);


Static and Instance Methods:
----------------------------

// Static method
Purpose: 
Static methods are methods available on the model itself, not on individual document instances.
Scope: 
Apply to the entire collection and are called on the model.
Usage: 
Ideal for operations that involve multiple documents or for creating custom queries.

// Example of a static method to find a user by email:
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};
const User = mongoose.model('User', userSchema);
User.findByEmail('test@example.com').then(user => {
  console.log(user);
}).catch(err => {
  console.error(err);
});


// Instance method
Purpose: 
Instance methods are methods available on document instances.
Scope: 
Apply to individual documents and are called on document instances.
Usage: 
Ideal for operations specific to a single document, such as manipulating its data or performing validations.

// Example of an instance method to get the full name of a user:
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

const User = mongoose.model('User', userSchema);
const user = new User({ firstName: 'John', lastName: 'Doe' });
user.getFullName(); // 'John Doe'

Note:While both instance methods and virtuals can be used to compute values based on document properties, instance methods are functions that can perform more complex operations, while virtuals are properties that are computed based on other properties in the document.


Populate:
---------
Populate is a feature in Mongoose that allows you to reference documents in other collections and automatically retrieve the referenced documents when querying. It helps to avoid manual fetching of related data. Populate works by replacing the specified field with the actual document(s) from another collection.

Populating Multiple Paths:
You can populate multiple fields in a single query by passing an array of field names to the populate method or by chaining multiple populate calls.
const bookSchema = new mongoose.Schema({
  title: String,
  pages: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' }, // Another reference
});

async function getBooks() {
  const books = await Book.find().populate('author').populate('publisher').exec();
  // Or using an array
  // const books = await Book.find().populate(['author', 'publisher']).exec();
  console.log('Books with populated author and publisher:', books);
}

Deep Population:
You can populate fields in nested documents by specifying the path using dot notation.

Post.findOne({ title: 'Some Post Title' })
  .populate({
    path: 'comments',
    select: 'text', // Select specific fields from the top-level populate
    populate: {
      path: 'author',
      select: 'name email' // Select specific fields from the nested populated document
    }
  })
  .then(post => {
    console.log(post);
  })
  .catch(err => {
    console.error(err);
  });

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection Pooling in MongoDB:
/*
Connection pooling is a technique used to manage and reuse database connections efficiently. It helps to reduce the overhead associated with establishing and closing connections by maintaining a pool of active connections that can be reused for multiple requests.

Note: Mongoose and Mondogb driver for node, by default, use connection pooling when connecting to MongoDB. The connection pool settings can be configured to control the number of connections in the pool, the maximum number of connections, and other parameters.

Key Benefits of Connection Pooling:
1. **Performance**: Reusing connections reduces the overhead of establishing new connections for each request, improving performance.
2. **Resource Management**: Connection pooling helps manage database connections efficiently, preventing resource exhaustion.
3. **Scalability**: Connection pooling allows for better scalability by efficiently managing connections to handle increasing loads.

Example of Connection Pooling in Mongoose:
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  minPoolSize: 5, // Minimum number of connections in the pool
  maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity.
};
mongoose.connect('mongodb://localhost:27017/mydatabase', advancedOptions);

*/
