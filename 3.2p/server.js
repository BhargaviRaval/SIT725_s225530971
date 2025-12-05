var express = require("express");
var app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  description: String,
  pages: Number,
  genre: String,
});

const Book = mongoose.model("Book", bookSchema);

// Seed data once
async function seedBooks() {
  const count = await Book.countDocuments();
  if (count > 0) return;

  const sampleBooks = [
    {
      title: "Twisted Love",
      author: "Ana Huang",
      image: "images/t1.jpg",
      description:
        "A dark, emotional romance that explores love, trauma, and second chances.",
      pages: 464,
      genre: "Romance",
    },
    {
      title: "Twisted Games",
      author: "Ana Huang",
      image: "images/book2.jpg",
      description:
        "A royal bodyguard romance with forbidden tension and fantasy vibes.",
      pages: 304,
      genre: "Forbidden Fantasy",
    },
    {
      title: "Twisted Hate",
      author: "Ana Huang",
      image: "images/book3.jpg",
      description:
        "An enemies-to-lovers story full of tension, banter, and emotional payoff.",
      pages: 320,
      genre: "Fiction",
    },
    {
      title: "Twisted Lies",
      author: "Ana Huang",
      image: "images/book4.jpg",
      description:
        "A slow-burn romance with secrets, fake dating, and high stakes.",
      pages: 496,
      genre: "Fantasy",
    },
  ];

  await Book.insertMany(sampleBooks);
  console.log("Sample books inserted!");
}
seedBooks();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.PORT || 4000;

// GET from MongoDB
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ statusCode: 200, data: books, message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
});

app.listen(port, () => {
  console.log("App listening to: http://localhost:" + port);
});
