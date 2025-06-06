//TASK 2

//1.Find all books in a specific genre:
 db.books.find({ genre: 'Fiction'})

 //2.Find books published after a specific year:
 db.books.find({published_year:{$gt:1900}})

 //3.Find books by a specific author:
    db.books.find({author: 'George Orwell'})

//4.Update the price of a specific book
db.books.updateOne({ title: 'The Alchemist'},{$set:{price:21.99}})

//.5.Delete a book by title:
 db.books.deleteOne({ title: 'The Alchemist'})

 //TASK 3
 //1. Find books that are both in stock and published after 2010
  db.books.find({ in_stock: true,published_year:{$gt:2010}})

  //2.Use projection to return only the title, author, and price fields in your queries
    db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })    

    //3.Implement sorting to display books by price (both ascending and descending)
    db.books.aggregate([$sort:{price:-1}])
    db.books.aggregate([$sort:{price:1}])

    //4.Use the `limit` and `skip` methods to implement pagination (5 books per page)
    db.books.find().skip(0).limit(5);  
    db.books.find().skip(5).limit(5);  

//TASK 4
//1.Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([{$group: {  _id: "$genre",  averagePrice: { $avg: "$price" } }}]);

//2.Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);
//3.Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      bookCount: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $multiply: ["$_id", 10] },
      bookCount: 1,
      _id: 0
    }
  },
  { $sort: { decade: 1 } }
]);

 //Task 5: Indexing
//1.Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 });
//2.Create a compound index on `author` and `published_year
db.books.createIndex({ author: 1, published_year: 1 });
//3.Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: '1984' }).explain("executionStats");
db.books.find({ author: 'George Orwell', published_year: { $gt: 1940 } }).explain("executionStats");
