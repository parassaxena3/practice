//Transactions in MongoDB
/*
Transactions in MongoDB allow multiple operations to be executed in an all-or-nothing manner. This is useful for maintaining data integrity in applications requiring multi-document operations.

Key Points:
ACID Properties: MongoDB transactions provide ACID (Atomicity, Consistency, Isolation, Durability) guarantees.
Start a Session: Transactions are tied to sessions.
Operations in Transactions: You can perform multiple read and write operations within a transaction.
Commit or Abort: A transaction must be either committed or aborted.

Example of a Transaction in MongoDB:
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await MyModel.create([{ name: 'John' }], { session });
    await MyOtherModel.updateOne({ name: 'Doe' }, { $set: { name: 'Jane' } }, { session });

    await session.commitTransaction();
    console.log('Transaction committed.');
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction aborted due to an error:', error);
  } finally {
    session.endSession();
  }


Note: There can be multiple transactions within a session, but only one transaction can be active at a time.
Eg:
async function run() {
  const session = await mongoose.startSession();
  try {
    // Start the first transaction
    session.startTransaction();
    // Perform some operations within the first transaction
    await SomeModel.updateOne({ _id: someId }, { $set: { field: value } }, { session });
    // Commit the first transaction
    await session.commitTransaction();

    // Start a second transaction
    session.startTransaction();
    // Perform some operations within the second transaction
    await AnotherModel.create([{ field: newValue }], { session });
    // Commit the second transaction
    await session.commitTransaction();
  } catch (error) {
    // Abort transaction in case of error
    await session.abortTransaction();
    console.error('Transaction error:', error);
  } finally {
    // End the session
    session.endSession();
  }
}


*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Various operators in MongoDB
/*
1. Comparsion Operators:
// can be used in queries like:
{ field: { $eq: value } }        // Equal
{ field: { $ne: value } }      // Not equal 
{ field: { $gt: value } }      // Greater than
{ field: { $gte: value } }     // Greater than or equal to
{ field: { $lt: value } }      // Less than
{ field: { $lte: value } }     // Less than or equal to
{ field: { $in: [value1, value2] } }  // In array
{ field: { $nin: [value1, value2] } } // Not in array
//can be used in projection or addFields like:
{ $eq: ['$field1', '$field2'] }    // Equal
{ $ne: ['$field1', '$field2'] }    // Not equal
{ $gt: ['$field1', '$field2'] }    // Greater than
{ $gte: ['$field1', '$field2'] }   // Greater than or equal to
{ $lt: ['$field1', '$field2'] }    // Less than
{ $lte: ['$field1', '$field2'] }   // Less than or equal to
{ $in: ['$field', ['value1', 'value2']] }  // In array
{ $nin: ['$field', ['value1', 'value2']] } // Not in array


2. Logical Operators: (can be used in queries and projections)
$and: [{ query1 }, { query2 }]   // Logical AND
$or: [{ query1 }, { query2 }]    // Logical OR
$not: { query }                 // Logical NOT
$nor: [{ query1 }, { query2 }]  // Logical NOR

3. Element Operators: (can be used in queries)
$exists: { field: true/false }    // Field exists
$type: { field: type }            // Field is of the specified type, eg are string, number, boolean, array, object, date, null, undefined


4. Evaluation Operators: (can be used in queries)
$regex: { field: /pattern/ }      // Regular expression
$options: 'i'                     // Options for $regex (e.g., 'i' for case-insensitive)
$text: { $search: "text" }        // Text search (requires text index)
$where: 'function() { return this.field > 0; }'  // JavaScript expression
$expr: { $gt: ['$field1', '$field2'] }     // Expressions used to compare fields in both aggregation and without aggregation. it can have only 1 operator

5. Array Operators: (used in find)
tags: { $all: ['red', 'blank'] }         // Matches all elements in array in any order, means both red and blank should be present but order can be anything, if any extra element is present then also it will be matched
$elemMatch: { field: { query } }  // Matches at least one element in array with specified condition
$size: { field: size }            // Array size  eg: { field: { $size: 2 } } accepts only number
$map: { input: 'field', as: 'alias', in: 'expression' }  // Applies an expression to each element in an array and returns the result

6. String Operators: (used in project or addFields)
$concat: ["$firstName", " ", "$lastName"]      // Concatenate strings
$substr: ["$field", start, length]             // Substring
$toLower: "$field"                            // Convert to lowercase
$toUpper: "$field"                            // Convert to uppercase, eg
$trim: { input: "$field" }                     // Remove whitespace
$split: ["$field", " "]                        // Split string by delimiter and return array

7. Date Operators: (used in both projection and queries)
$dayOfMonth: "$dateField"                      // Day of month (1-31)
$dayOfWeek: "$dateField"                       // Day of week (1-7)
$dayOfYear: "$dateField"                       // Day of year (1-366)
$month: "$dateField"                           // Month (1-12)
$year: "$dateField"                            // Year
$hour: "$dateField"                            // Hour (0-23)
$minute: "$dateField"                          // Minute (0-59)
$second: "$dateField"                          // Second (0-59)
$millisecond: "$dateField"                     // Millisecond (0-999)
$dateToString: { format: "%Y-%m-%d", date: "$dateField" }  // Format date as string

8. Conditional Operators: (used in project or addFields)
$cond : { if: { condition }, then: 'value1', else: 'value2' }  // Conditional expression
$switch: { branches: [ { case: { condition }, then: 'value' } ], default: 'value' }  // Switch case
$ifNull: ['$field', 'default']  // Return field value if not null, otherwise return default value


9. Update Operators:(used in updateOne, updateMany, findOneAndUpdate, etc.)
$set: { field: value }            // Set field to value
$unset: { field: "" }             // Remove field
$inc: { field: amount }           // Increment field by amount
$mul: { field: amount }           // Multiply field by amount
$rename: { oldField: newField }   // Rename field
$min: { field: value }            // Only update if field is greater than value
$max: { field: value }            // Only update if field is less than value
$addToSet: { field: value }       // Add value to array if not present
$pop: { field: 1 or -1 }          // Remove first (-1) or last (1) element from array
$pull: { field: query }           // Remove all array elements that match query
$push: { field: value }           // Add value to array
$each: [ values ]                 // Used with $push to add multiple values

// Add a value to an array if it doesn't already exist
await Model.updateOne({ _id: id }, { $addToSet: { tags: 'uniqueTag' } });

// Remove the first element from the array
await Model.updateOne({ _id: id }, { $pop: { tags: -1 } });

// Remove a specific value from an array
await Model.updateOne({ _id: id }, { $pull: { tags: 'removeTag' } });

// Add a single value to an array
await Model.updateOne({ _id: id }, { $push: { tags: 'newTag' } });

// Add multiple values to an array
await Model.updateOne({ _id: id }, { $push: { tags: { $each: ['tag1', 'tag2', 'tag3'] } } });

Que: Mongodb query to find records where a field doent exist or it is null or undefined?
  db.collection.find({
    $or: [
      { fieldName: { $exists: false } },
      { fieldName: null }
    ]
  })





*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Aggregation in MongoDB
/*

[
  {
    "_id": "6655c641773265f8538961a4",
    "name": "paras",
    "gender": "male",
    "age": 30,
    "city": "pilibhit",
    "dogs": ["shadow", "marshal"]
  },
  {
    "_id": "6655c641773265f8538961a5",
    "name": "parul",
    "gender": "female",
    "age": 28,
    "city": "pilibhit",
    "dogs": ["coco"]
  },
  {
    "_id": "6655c641773265f8538961a6",
    "name": "prakhar",
    "gender": "male",
    "age": 23,
    "city": "pilibhit",
    "dogs": ["bruno"]
  }
]

// Aggregation Pipeline Stages:

1. $match: Filters documents based on a specified condition.
   eg: { $match: { status: 'A' } }

2. $project: Reshapes documents by including, excluding, or renaming fields.
    eg: { $project: { _id: 0, item: 1, status: 1, xyx: '$field' } }

3. $limit: Limits the number of documents passed to the next stage.
    eg: { $limit: 5 }

4. $skip: Skips a specified number of documents.
    eg: { $skip: 5 }

5. $sort: Sorts documents based on a specified field.
    eg: { $sort: { item: 1 } }

6. $group: Groups documents by a specified expression.
    egs: 
    
// Group by field and calculate average and total
    { $group: { _id: '$gender', avg: { $avg: '$age' },total: { $sum: '$age' } } } 
    Output:
    [
      {
        "_id": "female",
        "avg": 28,
         "total": 28
      },
      {
        "_id": "male",
        "avg": 26.5,
         "total": 53
      }
    ]

 // Group by multiple fields and calculate total
   {
    "$group": {
      "_id": {
        "genderx": "$gender",
        "cityx": "$city"
      },
      "total": {
        "$sum": "$age"
      }
    }
  }
  Output:
  [
    {
      "_id": {
        "cityx": "pilibhit",
        "genderx": "male"
      },
      "total": 53
    },
    {
      "_id": {
        "cityx": "pilibhit",
        "genderx": "female"
      },
      "total": 28
    }
  ]

// Group all documents and calculate total
  { $group: { _id: null, total: { $sum: '$age' } } } 
  Output:
  [
    {
      "_id": null,
      "total": 81
    }
  ]

// Groups by gender and returns first and last values
  { $group: { _id: '$gender', first: { $first: '$name' }, last: { $last: '$name' } } } 
  Output:
  [
  {
    "_id": "female",
    "first": "parul",
    "last": "parul"
  },
  {
    "_id": "male",
    "first": "paras",
    "last": "prakhar"
  }
  ]

  or use with $$ROOT to get all fields
 
  { $group: { _id: '$gender', first: { $first: '$$ROOT' }, last: { $last: '$$ROOT' } } }
  Output:
  [
  {
    "_id":"female",
    "first": {
      "_id": "6655c641773265f8538961a5",
      "name": "parul",
    },
    "last": {
      "_id": "6655c641773265f8538961a5",
      "name": "parul",
    }
  },
  {
    "_id":"male",
    "first": {
      "_id": "6655c641773265f8538961a4",
      "name": "paras",
    },
    "last": {
      "_id": "6655c641773265f8538961a6",
      "name": "prakhar",
    }
  }
]


// Groups by city and returns unique genders and all genders
 {
    "$group": {
      "_id": "$city",
      "uniqueValues": {
        "$addToSet": "$gender"
      },
      "allValues": { $push: '$gender' }
    }
  }
  Output:
  [
  {
    "_id": "pilibhit",
    "uniqueValues": [
      "male",
      "female"
    ],
    "allValues": [
    "male",
    "female",
    "male"
    ]
  }
]
// use $push with $$ROOT to group all documents based on gender and group all documents
{
    $group: {
      _id: "$gender",
      documents: { $push: "$$ROOT" }
    }
  }
  Output:
  [
  {
    "_id": "female",
    "documents": [
      {
        "_id": "6655c641773265f8538961a5",
        "name": "parul",
        "gender": "female",
        "age": 28,
        "city": "pilibhit",
        "dogs": [
          "coco",
          "shadow"
        ]
      }
    ]
  },
  {
    "_id": "male",
    "documents": [
      {
        "_id": "6655c641773265f8538961a4",
        "name": "paras",
        "gender": "male",
        "age": 30,
        "city": "pilibhit",
        "dogs": [
          "shadow",
          "marshal"
        ]
      },
      {
        "_id": "6655c641773265f8538961a6",
        "name": "prakhar",
        "gender": "male",
        "age": 23,
        "city": "pilibhit",
        "dogs": [
          "bruno",
          "marshal"
        ]
      }
    ]
  }
]

7. $unwind: Deconstructs an array field from the input documents to output a document for each element.
    eg: { $unwind: '$dogs' }
    or
    // unwind with path and preserveNullAndEmptyArrays
{
    $unwind: {
      path: "$dogs",
      preserveNullAndEmptyArrays: true
    }
  }

   Output:
   [
  {
    "name": "paras",
    "dogs": "shadow"
  },
  {
    "name": "paras",
    "dogs": "marshal"
  },
  {
    "name": "parul",
    "dogs": "coco"
  },
  {
    "name": "prakhar",
    "dogs": "bruno"
  }
]

 

8. $lookup: Performs a left outer join to another collection in the same database.
    orders:
    [
  { "_id": 1, "orderId": "A123", "productId": 101, "quantity": 2 },
  { "_id": 2, "orderId": "A124", "productId": 102, "quantity": 1 },
  { "_id": 3, "orderId": "A125", "productId": 103, "quantity": 4 }
]

  inventory:
  [
    { "_id": 1, "productId": 101, "warehouse": "A", "stock": 20 },
    { "_id": 2, "productId": 102, "warehouse": "B", "stock": 30 },
    { "_id": 3, "productId": 103, "warehouse": "A", "stock": 15 }
  ]

  Lookup: 
  {$lookup: {
    from: 'inventory',
    localField: 'productId',
    foreignField: 'productId',
    as: 'inventory_docs'
  }}
  }

  Lookup with pipeline:
    The pipeline option inside a $lookup provides a powerful way to specify more complex join conditions and transformations. This option allows you to use an aggregation pipeline to process the documents in the joined collection before they are matched with the documents from the primary collection.
    
    eg:
     {
    $lookup: {
      from: "inventory",
      let: { productId: "$productId" },
      pipeline: [
        { $match: { $expr: { $eq: ["$productId", "$$productId"] } } },
        { $match: { stock: { $gt: 5 } } }  // Additional condition to filter documents
      ],
      as: "inventoryDetails"
    }
  }

9. $addFields: Adds new fields to documents.
    eg: { $addFields: { newField: 'value' } }

10. $replaceRoot: Replaces the input document with the specified document. (supports only object not array)
    eg: { $replaceRoot: { newRoot: '$field' } }

    {
  "_id": 1,
  "name": "John Doe",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL"
  }
}

  db.users.aggregate([
    {
      $replaceRoot: { newRoot: "$address" }
    }
  ])

  Output:
  {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL"
  }

In this example, the address sub-document is promoted to the top level, and the original fields outside of address are discarded.

If you want to include fields from both the root document and a sub-document, you can use a combination of $root and the fields you want to keep.

    db.users.aggregate([
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { _id: "$_id", name: "$name" },
              "$address"
            ]
          }
        }
      }
    ])

    Output:
    {
      "_id": 1,
      "name": "John Doe",
      "street": "123 Main St",
      "city": "Springfield",
      "state": "IL"
    }

10. $Count: Counts the number of documents at this stage of the aggregation pipeline.
    eg: { $count: 'total' }
    
*/
