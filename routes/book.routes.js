const router = require("express").Router();
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth.js");
const Book = require("../models/book.js")
// add book- admin

router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { url, title, author, price, desc, language } = req.body;
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ message: "User id missing" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "you are not having access to perform admin work" });
    }

    const body = await Book.create({
      url,
      title,
      author,
      price,
      desc,
      language,
    });
    return res.status(200).json(body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



// update Book
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { url,
      title,
      author,
      price,
      desc,
      language }= req.body;
    const { bookid } = req.headers;
    const body = await Book.findByIdAndUpdate(bookid, {
      url,
      title,
      author,
      price,
      desc,
      language,
    });
    return res.status(200).json({ message: "Book updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



// Delete-book
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    const body = await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// get  book by id

router.get("/get-book-by-id/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status:"Success",
      data:book,

    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// get all books 

router.get("/get-all-books",async (req, res) => {
  try {
    const books = await Book.find().sort({createdAt:-1});
    return res.json({
      status:"Success",
      data:books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// get-recent-books - added books limit 4
router.get("/get-recent-books",async (req, res) => {
  try {
    const books = await Book.find().sort({createdAt:-1}).limit(4);
    return res.json({
      status:"Success",
      data:books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;