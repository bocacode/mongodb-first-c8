// Let's to everything we can in MongoDB
// Select, Select fancy, insert, update, and update fancy
// Notice that if it seems to "hang" or not return to the prompt you forgot the last line or simply press CTRL-C (the control key plus the letter C at the same time)

// Let's load our librarry. did you install it?
import { MongoClient,ObjectId } from "mongodb";

// This is an example of a secet we will .gitingore
import { uri, otherSecret } from "./credentials.js";


const client = new MongoClient(uri); // our connect to the server
const db = client.db("sample_mflix"); // our reference or pointer to the database in the server
const moviesCollection = db.collection("movies"); // We call it movie collection to remind us it's a reference to the collection.

// make sure to add db.close() and the end of every example!!


// -- Let's query to get all movies -- 
// find() looks for the collection with the query. 
// the {} query means give us everything and "exclude" nothing
// limit(25) gives us only the first 25 (there are 5000+ movies)
// toArray gives us the results in a nice array
let AllMoviesArray = await moviesCollection.find({}).limit(25).toArray(); // a {} means give us everything , limit 
console.log(AllMoviesArray)


// Now let's get fancy and learn how to query;
let onlyOneMovieQuery = {title: 'The Terminator'}
let oneMovieArray = await moviesCollection.find(onlyOneMovieQuery).toArray();
console.table(StarWarsMovie) // being fancy. Introduce console.table


// Fancy Query:
let AllStarWarsMoviesQuery = { title: { $regex: /star wars/i } }; //seach for "terminator" anywhere in the title and ignore case
let AllStarWaysMovuesArray = await moviesCollection
  .find(AllStarWarsMoviesQuery)
  .toArray();

// Interate through array to show ONLY the titles:
for (let i = 0; i < movieArray.length; i++) {
  console.log(movieArray[i].title);
}



// Add a new movie
const newMovie = {
  title: "The Boca Code story",
  rating: 10,
  genre: ["Comedy"],
  releaseDate: "2022/12/16",
};

const results = await moviesCollection.insertOne(newMovie)
console.log("Results of insert",results) // notice what comes back


// Update one specific movie (for example the one we just insernted above, which for me returned ObjectID: 6345ca5bc15b8a8140a1c262)
const updateQuery = { _id: new ObjectId("6345ca5bc15b8a8140a1c262") }; 
const update = { $set: {title: "the NEW Boca Code Story"}}
const results = await moviesCollection.findOneAndUpdate(updateQuery,update);
console.log(results) // notice what we get back!


// Fancy Update where we increment the "watched" variable and notice that we don't check the value so we never make a mistake  
db.people.findAndModify({
    query: {  title: "The Boca Code story", releaseDate: "2022/12/16", rating: { $gt: 5 } }, // check for many fields and some where we check if it's "$gt" or Greater than
    sort: { rating: 1 }, // Sort by rating, biggest to smallest
    update: { $inc: { watched: 1 } } // update a numberical value (creating it if it doesn't exist) and increment it without worrying about the prior value. Just increase it so we never have a race condition and loose a "watched"
})


// If you don't have this next line in your example the code will look like it's hanging. But it's just waiting for you to Ctrl-C
db.close()
