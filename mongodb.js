import { MongoClient,ObjectId } from "mongodb";

import { uri, otherSecret } from "./credentials.js";

const client = new MongoClient(uri);
const db = client.db("sample_mflix");
const moviesCollection = db.collection("movies");

// console.log(await moviesCollection.findOne({}))
let query = { title: { $regex: /star wars/i } }; //seach for "terminator" anywhere in the title and ignore case
let movieArray = await moviesCollection
  .find(query)
  //.limit(3)
  .toArray(); // make it into an array

for (let i = 0; i < movieArray.length; i++) {
  console.log(movieArray[i].title);
}

// let firstMovie = movieArray[0]
// console.log(firstMovie.title)

//console.log(`there are ${movieArray.length} movies`)

// add a new movie
const newMovie = {
  title: "The Boca Code story",
  rating: "R",
  genre: ["Comedy"],
  releaseDate: "2022/12/16",
};

// const results = await moviesCollection.insertOne(newMovie)
// console.log("Results of insert",results)

const updateQuery = { _id: new ObjectId("6345ca5bc15b8a8140a1c262") };
const update = { $set: {title: "the NEW Boca Code Story"}}
const results = await moviesCollection.findOneAndUpdate(updateQuery,update);
console.log(results)
// db.people.findAndModify({
//     query: { name: "Tom", state: "active", rating: { $gt: 10 } },
//     sort: { rating: 1 },
//     update: { $inc: { score: 1 } }
// })

// db.close()
