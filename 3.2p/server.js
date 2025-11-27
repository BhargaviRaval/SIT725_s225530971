var express = require("express")
var app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var port = process.env.port || 3000

let books = [
    {
        id: 1,
        title: "Twisted Love",
        author: "Ana Huang",
        image: "images/t1.jpg",
        description: "A dark, emotional romance that explores love, trauma, and second chances.",
        pages: 464,
        genre: "Romance"
    },
    {
        id: 2,
        title: "Twisted Games",
        author: "Ana Huang",
        image: "images/book2.jpg",
        description: "A royal bodyguard romance with forbidden tension and fantasy vibes.",
        pages: 304,
        genre: "Forbidden Fantasy"
    },
    {
        id: 3,
        title: "Twisted Hate",
        author: "Ana Huang",
        image: "images/book3.jpg",
        description: "An enemies‑to‑lovers story full of tension, banter, and emotional payoff.",
        pages: 320,
        genre: "Fiction"
    },
    {
        id: 4,
        title: "Twisted Lies",
        author: "Ana Huang",
        image: "images/book4.jpg",
        description: "A slow‑burn romance with secrets, fake dating, and high stakes.",
        pages: 496,
        genre: "Fantasy"
    }
]

app.get('/api/books', (req, res) => {
    res.json(books)
})

app.listen(port, () => {
    console.log("App listening to: http://localhost:" + port)
})
