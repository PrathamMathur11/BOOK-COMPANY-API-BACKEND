const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

//Import the mongoose module
var mongoose = require("mongoose");
//Set up the default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("CONNECTION ESTABLISHED"));

//GET APIs ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//localhost:5000/
http: app.get("/", (req, res) => {
  return res.json({ WELCOME: `to my Backend Software for the Book Company` });
});

// http://localhost:5000/books   (gets all books)
app.get("/books", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

// http://localhost:5000/book-isbn/1234Three  (get a specific book by ISBN)
app.get("/book-isbn/:isbn", async (req, res) => {
  // console.log(req.params);
  const { isbn } = req.params;
  // console.log(isbn);
  const getSpecificBook = await BookModel.findOne({ ISBN: isbn });
  // console.log(getSpecificBook);
  if (getSpecificBook === null) {
    return res.json({ error: `No Book found for the ISBN of ${isbn}` });
  }
  return res.json(getSpecificBook);
});

// http://localhost:5000/book-category/programming  (gets books by categories)
app.get("/book-category/:category", async (req, res) => {
  // console.log(req.params);
  const { category } = req.params;
  // console.log(category);
  const getSpecificBooks = await BookModel.find({ category: category });
  // console.log(getSpecificBooks);
  // console.log(getSpecificBooks.length);
  if (getSpecificBooks.length === 0) {
    return res.json({
      error: `No Books found for the category of ${category}`,
    });
  }
  return res.json(getSpecificBooks);
});

// http://localhost:5000/authors   (get all authors)
app.get("/authors", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

// http://localhost:5000/author-id/1  (get specific Author by their id)
app.get("/author-id/:id", async (req, res) => {
  const { id } = req.params;
  const getSpecificAuthor = await AuthorModel.findOne({ id: id });
  if (getSpecificAuthor === null) {
    return res.json({ error: `No Author found the id of ${id}` });
  }
  return res.json(getSpecificAuthor);
});

// http://localhost:5000/author-isbn/12345Three  (get specific author by book's isbn)
app.get("/author-isbn/:isbn", async (req, res) => {
  // console.log(req.params);
  const { isbn } = req.params;
  // console.log(isbn);
  const getSpecificAuthors = await AuthorModel.find({ books: isbn });
  if (getSpecificAuthors.length===0) {
    return res.json({ error: `No Author found for the Book of ${isbn}` });
  }
  // console.log(getSpecificAuthors);
  return res.json(getSpecificAuthors);
});

// http://localhost:5000/publications   (get all publications)
app.get("/publications", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
});

// http://localhost:5000/publication-id/1  (get publication by id)
app.get("/publication-id/:id", async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  // console.log(id);
  const getSpecificPublications = await PublicationModel.findOne({ id: id });
  if (getSpecificPublications=== null) {
    return res.json({ error: `No Author found for the Book of ${id}` });
  }
  // console.log(getSpecificPublications);
  return res.json(getSpecificPublications);
});

// http://localhost:5000/publication-isbn/12345ONE  (get publication by isbn)
app.get("/publication-isbn/:isbn", async (req, res) => {
  // console.log(req.params);
  const { isbn } = req.params;
  // console.log(isbn);
  const getSpecificPublications = await PublicationModel.find({ books: isbn });
  if (getSpecificPublications=== null) {
    return res.json({ error: `No Author found for the Book of ${isbn}` });
  }
  // console.log(getSpecificPublications);
  return res.json(getSpecificPublications);
});

//POST APIs ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// http://localhost:5000/book   (posting new book)
app.post("/book", async (req, res) => {
  // console.log(req.body);
  const addNewBook = await BookModel.create(req.body);
  return res.json({ bookAdded: addNewBook, message: "Book was added !!!" });
});

// http://localhost:5000/author   (posting new author)
app.post("/author", async (req, res) => {
  // console.log(req.body);
  const addNewAuthor = await AuthorModel.create(req.body);
  return res.json({
    authorAdded: addNewAuthor,
    message: "Author was added !!!",
  });
});

// http://localhost:5000/publication   (posting new publication)
app.post("/publication", async (req, res) => {
  // console.log(req.body);
  const addNewPublication = await PublicationModel.create(req.body);
  return res.json({
    publicationAdded: addNewPublication,
    message: "Publication was added !!!",
  });
});

// PUT APIs----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// http://localhost:5000/book-update/12345Two   (updating one book)
app.put("/book-update/:isbn", async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const { isbn } = req.params;
  const updateBook = await BookModel.findOneAndUpdate(
    { ISBN: isbn },
    req.body,
    { new: true }
  );
  return res.json({ bookUpdated: updateBook, message: "Book was Updated !!!" });
  // console.log(db.books)
});

// http://localhost:5000/author-update/1   (updating one author)
app.put("/author-update/:id", async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const { id } = req.params;
  const updateAuthor = await AuthorModel.findOneAndUpdate(
    { id: id },
    req.body,
    { new: true }
  );
  return res.json({
    authorUpdated: updateAuthor,
    message: "Author was Updated !!!",
  });
  // console.log(db.authors)
});

// http://localhost:5000/publication-update/1   (updating one publication)
app.put("/publication-update/:id", async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const { id } = req.params;
  const updatePublication = await PublicationModel.findOneAndUpdate(
    { id: id },
    req.body,
    { new: true }
  );
  return res.json({
    publicationUpdated: updatePublication,
    message: "Publication was Updated !!!",
  });
  // console.log(db.publications)
});

// DELETE APIs ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// http://localhost:5000/book-delete/12345ONE (deleting one book)
app.delete("/book-delete/:isbn", async(req, res) => {
  const { isbn } = req.params;
  const deleteBook = await BookModel.deleteOne({ ISBN: isbn });
  return res.json({ bookdeleted: deleteBook, message: "Book was Deleted !!!" });
});

// http://localhost:5000/book-author-delete/12345ONE/1 (deleting specific author from specific book)
app.delete("/book-author-delete/:isbn/:id", async(req, res) => {
  // console.log(req.params);
  let { isbn, id } = req.params;
  let getSpecificBook = await BookModel.findOne({ISBN:isbn});
  if(getSpecificBook===null){
    return res.json({"error":`No Book found for the ISBN of ${isbn}`});
  }
  else {
    getSpecificBook.authors.remove(id);
    const updateBook = await BookModel.findOneAndUpdate({ISBN:isbn},getSpecificBook,{new:true});
    return res.json({bookAuthorsUpdated:updateBook, message:"Author was Deleted from the Book !!!"});
  }
});

// http://localhost:5000/author-book-delete/1/12345ONE (deleting specific book from specific author)
app.delete("/author-book-delete/:id/:isbn", async(req, res) => {
  // console.log(req.params);
  let { id, isbn } = req.params;
  let getSpecificAuthor = await AuthorModel.findOne({id:id});
  if(getSpecificAuthor===null){
    return res.json({"error":`No Author found for the id of ${id}`});
  }
  else {
    getSpecificAuthor.books.remove(isbn);
    const updateAuthor = await AuthorModel.findOneAndUpdate({id:id},getSpecificAuthor,{new:true});
    return res.json({authorBooksUpdated:updateAuthor, message:"Book was Deleted from the Author !!!"});
  }
});

// http://localhost:5000/author-delete/1 (deleting author using it's id)
app.delete("/author-delete/:id", async(req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  const deleteAuthor = await AuthorModel.deleteOne({ id: id });
  return res.json({ authordeleted: deleteAuthor, message: "Author was Deleted !!!" });
});

// http://localhost:5000/publication-delete/1 (deleting publication using it's id)
app.delete("/publication-delete/:id", async(req, res) => {
  const { id } = req.params;
  const deletePublication = await PublicationModel.deleteOne({ id: id });
  return res.json({ publicationdeleted: deletePublication, message: "Publication was Deleted !!!" });
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(5000, () => {
  console.log("MY EXPRESS APP IS RUNNING.....");
});
