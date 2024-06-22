// Array operations in MongoDB
/*
sample data:
[
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
    "_id": "6655c641773265f8538961a5",
    "name": "parul",
    "gender": "female",
    "age": 28,
    "city": "pilibhit",
    "dogs": [
      "coco",
      "shadow"
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

//Find Queries

1. Querying for Array Elements
db.users.find({dogs: "shadow"})
Gives all the documents where the dogs array contains the element "shadow".

2. Querying for Array Elements with $all
db.users.find({dogs: {$all: ["shadow", "marshal"]}})
Gives all the documents where the dogs array contains both the elements "shadow" and "marshal" (any order).

3. Querying for Array Elements with $size (accepts only number)
db.users.find({dogs: {$size: 2}})
Gives all the documents where the dogs array contains exactly 2 elements.

4. Querying for Array Elements with $elemMatch
db.users.find({dogs: {$elemMatch: {$eq: "shadow", $ne: "marshal"}}})
Gives all the documents where the dogs array contains the element "shadow".
Use $elemMatch when you want to match multiple criteria on a single element.

5. Querying for Array Index Positions
db.users.find({"dogs.0": "shadow"})
Gives all the documents where the first element of the dogs array is "shadow".

6. Updating Array Elements
db.users.updateOne({name: "paras"}, {$push: {dogs: "coco"}})
Adds the element "coco" to the dogs array of the document where the name is "paras".

//Update Queries

1. $push
db.users.updateOne({name: "paras"}, {$push: {dogs: "coco"}})
Adds the element "coco" to the dogs array of the document where the name is "paras".  To add multiple elements, use $each (point 5)

2. $pop
db.users.updateOne({name: "paras"}, {$pop: {dogs: 1}})
Removes the last element from the dogs array of the document where the name is "paras". -1 removes the first element.

3. $pull
db.users.updateMany({dogs: "shadow"}, {$pull: {dogs: "shadow"}})
Removes the element "shadow" from the dogs array of all the documents where it exists.
$pull can remove multiple elements at once. It is different from $pop which removes only one element.

4. $addToSet
db.users.updateOne({name: "paras"}, {$addToSet: {dogs: "coco"}})
Adds the element "coco" to the dogs array of the document where the name is "paras" only if it does not already exist.

5. $each
db.users.updateOne({name: "paras"}, {$push: {dogs: {$each: ["coco", "bruno"]}}})
Adds the elements "coco" and "bruno" to the dogs array of the document where the name is "paras".
It is different from $push: {dogs: ["coco", "bruno"]} which would add an array of elements instead of individual elements.

6. $position
db.users.updateOne({name: "paras"}, {$push: {dogs: {$each: ["coco", "bruno"], $position: 1}})
Adds the elements "coco" and "bruno" to the dogs array of the document where the name is "paras" at the second position. The first position is 0. Coco will be at index 1 and Bruno will be at index 2.

7. $map
db.users.updateOne({name: "paras"}, {$set: {dogs: {$map: {input: "$dogs", as: "dog", in: {name: "$$dog"}}}})
Transforms the dogs array of the document where the name is "paras" into an array of objects with a "name" field.

*/

// Array Filter
/*
Sample Data:
[
  {
    "_id": "6655c641773265f8538961a4",
    "name":'paras',
    "posts": [
        {
            "title": "post1",
            "content": "content1"
        },
        {
            "title": "post2",
            "content": "content2"
        }
        ]
    },
    {
    "_id": "6655c641773265f8538961a5",
    "name":'parul',
    "posts": [
        {
            "title": "post3",
            "content": "content3"
        },
        {
            "title": "post4",
            "content": "content4"
        }
        ]
    },
    {
    "_id": "6655c641773265f8538961a6",
    "name":'prakhar',
    "posts": [
        {
            "title": "post5",
            "content": "content5"
        },
        {
            "title": "post6",
            "content": "content6"
        }
        ]
    }
]

// Array Filter
Array filters in MongoDB allow you to target specific elements within an array that meet certain conditions when performing update operations. This feature was introduced in MongoDB 3.6 and is particularly useful when you need to update elements based on their value or position within the array.

db.collection.updateOne(
  { <query> },
  { <update> },
  {
    arrayFilters: [ { <identifier>: <condition> }, ... ],
    multi: <boolean> // multi means update all the documents that match the query, default is false
  }
)

1. Updating the Content of a Specific Post
db.users.updateOne(
  { name: "paras" },
  { $set: { "posts.$[elem].content": "new content" } },
  { arrayFilters: [ { "elem.title": "post1" } ] }
)
Updates the content of the post with the title "post1" for the user with the name "paras".

2. Updating Multiple Posts
db.collection.updateMany(
  { },
  { $set: { 
      "posts.$[postElem1].content": "updated content3", 
      "posts.$[postElem2].content": "updated content5" 
    } 
  },
  { arrayFilters: [
      { "postElem1.title": "post3" },
      { "postElem2.title": "post5" }
    ]
  }
)
Updates the content of the post with the title "post3" to "updated content3" and the content of the post with the title "post5" to "updated content5" for all users.

3. Updating Posts Based on Position
db.collection.updateOne(
  { name: "paras" },
  { $set: { "posts.$[elem].content": "new content" } },
  { arrayFilters: [ { "elem": 0 } ] }
)
Updates the content of the first post for the user with the name "paras".

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sample Questions
/*
// Customers collection:
[
    {
        "_id": 1,
        "name": "Alice",
        "age": 30,
        "email": "alice@example.com",
        "address": {
            "street": "123 Maple St",
            "city": "Wonderland",
            "zip": "12345"
        },
        "hobbies": ["reading", "gardening"],
        "friends": [2, 3],
        "created_at": "2022-01-01T10:00:00Z"
    },
    {
        "_id": 2,
        "name": "Bob",
        "age": 25,
        "email": "bob@example.com",
        "address": {
            "street": "456 Oak St",
            "city": "Dreamland",
            "zip": "67890"
        },
        "hobbies": ["cycling", "chess"],
        "friends": [1],
        "created_at": "2022-02-15T12:00:00Z"
    },
    {
        "_id": 3,
        "name": "Charlie",
        "age": 35,
        "email": "charlie@example.com",
        "address": {
            "street": "789 Pine St",
            "city": "Adventureland",
            "zip": "11223"
        },
        "hobbies": ["hiking", "photography"],
        "friends": [1],
        "created_at": "2022-03-20T14:00:00Z"
    },
    {
        "_id": 4,
        "name": "David",
        "age": 28,
        "email": "david@example.com",
        "address": {
            "street": "101 Elm St",
            "city": "Fantasyland",
            "zip": "44556"
        },
        "hobbies": ["reading"],
        friends: [],
        "created_at": "2022-04-25T16:00:00Z"
    }

]

// Orders collection:
[
    {
        "_id": 101,
        "user_id": 1,
        "products": [
            {
                "name": "Book",
                "price": 12.99,
                "quantity": 2
            },
            {
                "name": "Garden Tools",
                "price": 25.50,
                "quantity": 1
            }
        ],
        "order_date": "2023-01-10T09:00:00Z",
        "status": "shipped"
    },
    {
        "_id": 102,
        "user_id": 2,
        "products": [
            {
                "name": "Bicycle",
                "price": 199.99,
                "quantity": 1
            }
        ],
        "order_date": "2023-01-15T10:30:00Z",
        "status": "processing"
    },
    {
        "_id": 103,
        "user_id": 3,
        "products": [
            {
                "name": "Camera",
                "price": 499.99,
                "quantity": 1
            },
            {
                "name": "Hiking Boots",
                "price": 89.99,
                "quantity": 1
            }
        ],
        "order_date": "2023-02-20T14:45:00Z",
        "status": "delivered"
    },
    {
        "_id": 104,
        "user_id": 1,
        "products": [
            {
                "name": "Chess Set",
                "price": 19.99,
                "quantity": 1
            }
        ],
        "order_date": "2023-03-05T16:00:00Z",
        "status": "shipped"
    }
]


1.Find all orders where the total price of the products is greater than 100
[
  {
    "$unwind": {
      "path": "$products"
    }
  },
  {
    "$group": {
      "_id": "$_id",
      "total": {
        "$sum": "$products.price"
      }
    }
  },
  {
    "$match": {
      "total": {
        "$gt": 100
      }
    }
  }
]

2.Find all users who have "cycling" as one of their hobbies.
{
  "hobbies": "cycling"
}

3.Find all orders that were placed in the month of January 2023.
{
  "order_date": {
    "$gte": "2023-01-01T00:00:00Z",
    "$lt": "2023-02-01T00:00:00Z"
  }
}
or
{
  "$expr": {
    "$and": [
      {
        "$eq": [
          {
            "$month": "$order_date"
          },
          1
        ]
      },
      {
        "$eq": [
          {
            "$year": "$order_date"
          },
          2023
        ]
      }
    ]
  }
}

4. Find all users who have more than one friend.
{
  "$expr": {
    "$gt": [
      {
        "$size": "$friends"
      },
      1
    ]
  }
}

5. find the total number of product qty ordered by the user with _id of 1.
{
  "$match": {
    "user_id": 1
  }
},
{
  "$unwind": {
    "path": "$products"
  }
},
{
  "$group": {
    "_id": "$user_id",
    "total_qty": {
      "$sum": "$products.quantity"
    }
  }
}

6. Find all users who were created in the year 2022.
{
  "$expr": {
    "$eq": [
      {
        "$year": "$created_at"
      },
      2022
    ]
  }
}

7. Find the average age of all users.
{
  "$group": {
    "_id": null,
    "avg_age": {
      "$avg": "$age"
    }
  }
}

8. Add a new field "total_price" to each order, which is the sum of the price*quantity for each product in the order.
{
  "$addFields": {
    "total_price": {
      "$sum": {
        "$map": {
          "input": "$products",
          "in": {
            "$multiply": [
              "$$this.price",
              "$$this.quantity"
            ]
          }
        }
      }
    }
  }
}
or
{
    "$addFields": {
      "total_price": {
        "$sum": {
          "$map": {
            "input": "$products",
            "as": "product",
            "in": {
              "$multiply": [
                "$$product.price",
                "$$product.quantity"
              ]
            }
          }
        }
      }
    }
  }

9. Find all users who have either "reading" or "cycling" as one of their hobbies.
{
  "$or": [
    {
      "hobbies": "reading"
    },
    {
      "hobbies": "cycling"
    }
  ]
}
or
{
  "hobbies": {
    "$in": [
      "reading",
      "cycling"
    ]
  }
}

10. Find the order IDs and user IDs for all orders that have more than two distinct products.
{
  "$project": {
    "order_id": "$_id",
    "user_id": 1,
    "num_products": {
      "$size": "$products"
    }
  }
},
{
  "$match": {
    "num_products": {
      "$gt": 2
    }
  }
}
or
{
  "$match": {
    "$expr": {
      "$gt": [
        {
          "$size": "$products"
        },
        2
      ]
    }
  }
},
{
  "$project": {
    "order_id": "$_id",
    "user_id": 1
  }
}

11. Update all users to add a new field membership with the value "basic" if the field does not already exist.
db.users.updateMany(
  { "membership": { "$exists": false } },
  { "$set": { "membership": "basic" } }
);

12. Find the most recent order placed by each user.
[
  {
    "$sort": {
      "order_date": -1
    }
  },
  {
    "$group": {
      "_id": "$user_id",
      "most_recent_order": {
        "$first": "$$ROOT"
      }
    }
  }
]

13. Find all users who have at least one friend and one hobby.
{
  "$expr": {
    "$and": [
      { "$gt": [{ "$size": "$friends" }, 0] },
      { "$gt": [{ "$size": "$hobbies" }, 0] }
    ]
  }
}

14. Find all orders where any product has a price greater than 100.
{
  "products.price": {
    "$gt": 100
  }
}

15. Find the users who do not have any friends
{
  "friends": []
}
or
{
  "$expr": {
    "$eq": [
      { "$size": "$friends" },
      0
    ]
  }
}
or
{
  "friends.0": { "$exists": false }
}
or
{
  "friends": { "$size": 0 }
}

16. Find the total number of distinct hobbies among all users.
[
  {
    "$unwind": "$hobbies"
  },
  {
    "$group": {
      "_id": "$hobbies"
    }
  },
  {
    "$count": "hobbies"
  }
]

17. Find all users whose age is between 25 and 35 inclusive.
{
  "age": {
    "$gte": 25,
    "$lte": 35
  }
}

18. Find the total quantity of products ordered by each user. Include the user's name in the result.
[
  {
    "$lookup": {
      "from": "customers",
      "localField": "user_id",
      "foreignField": "_id",
      "as": "user"
    }
  },
  {
    "$unwind": "$user"
  },
  {
    "$unwind": "$products"
  },
  {
    "$group": {
      "_id": "$user.name",
      "total_qty": {
        "$sum": "$products.quantity"
      }
    }
  }
]

or

[
  {
    "$unwind": "$products"
  },
  {
    "$group": {
      "_id": "$user_id",
      "totalProducts": {
        "$sum": "$products.quantity"
      }
    }
  },
  {
    "$lookup": {
      "from": "customers",
      "as": "user",
      "let": {
        "userId": "$_id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$_id",
                "$$userId"
              ]
            }
          }
        },
        {
          "$project": {
            "name": 1,
            "_id": 0
          }
        }
      ]
    }
  },
  {
    "$unwind": "$user"
  },
  {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          {
            "totalProducts": "$totalProducts"
          },
          "$user"
        ]
      }
    }
  }
]

19. Find the most popular product by total quantity ordered.
[
  {
    "$unwind": "$products"
  },
  {
    "$group": {
      "_id": "$products.name",
      "total": {
        "$sum": "$products.quantity"
      }
    }
  },
  {
    "$sort": {
      "total": -1
    }
  },
  {
    "$limit": 1
  }
]


20. For each user, find the total amount spent on orders. Include the user's name and email in the result.
[
  {
    "$unwind": "$products"
  },
  {
    "$addFields": {
      "amount": {
        "$multiply": [
          "$products.price",
          "$products.quantity"
        ]
      }
    }
  },
  {
    "$group": {
      "_id": "$user_id",
      "totalAmount": {
        "$sum": "$amount"
      }
    }
  },
  {
    "$lookup": {
      "from": "customers",
      "as": "user",
      "foreignField": "_id",
      "localField": "_id"
    }
  },
  {
    "$project": {
      "_id": 0,
      "totalAmount": 1,
      "name": {
        "$first": "$user.name"
      },
      "email": {
        "$first": "$user.email"
      }
    }
  }
]

21. Find the average age of users who have placed at least one order.
[
  {
    "$lookup": {
      "from": "orders",
      "localField": "_id",
      "foreignField": "user_id",
      "as": "orders"
    }
  },
   {
    "$match": {
      "$expr": {
        "$gte": [
          {
            "$size": "$orders"
          },
          1
        ]
      }
    }
  },
  // or
  //  {
  //   "$match": {
  //     "orders": {
  //       "$ne": []
  //     }
  //   }
  // },
  {
    "$group": {
      "_id": null,
      "avgAge": {
        "$avg": "$age"
      }
    }
  }
]

22. For each user(who have ordered), list their name, email, and the names of friends who also have placed at least one order.
[
  {
    "$lookup": {
      "from": "orders",
      "as": "orders",
      "foreignField": "user_id",
      "localField": "_id"
    }
  },
  {
    "$match": {
      "orders": {
        "$ne": []
      }
    }
  },
  {
    "$unwind": "$friends"
  },
  {
    "$lookup": {
      "from": "customers",
      "as": "friends",
      "let": {
        "friend_id": "$friends"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$_id",
                "$$friend_id"
              ]
            }
          }
        },
        {
          "$lookup": {
            "from": "orders",
            "as": "orders",
            "foreignField": "user_id",
            "localField": "_id"
          }
        },
        {
          "$match": {
            "orders": {
              "$ne": []
            }
          }
        },
        {
          "$project": {
            "_id": 0,
            "name": 1
          }
        }
      ]
    }
  },
  {
    "$project": {
      "name": 1,
      "email": 1,
      "friend": {
        "$first": "$friends.name"
      }
    }
  },
  {
    "$group": {
      "_id": {
        "_id": "$_id",
        "name": "$name",
        "email": "$email"
      },
      "friends": {
        "$push": "$friend"
      }
    }
  },
  {
    "$project": {
      "_id": "$_id._id",
      "name": "$_id.name",
      "email": "$_id.email",
      "friends": 1
    }
  }
]


*/
