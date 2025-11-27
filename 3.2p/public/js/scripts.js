let allBooks = []

// GET /api/books and then render cards
const getBooks = () => {
    console.log("Fetching /api/books ...")
    fetch('/api/books')
        .then(res => res.json())
        .then(data => {
            allBooks = data
            addCards(allBooks)
        })
        .catch(err => console.error("Error fetching books:", err))
}

// Create cards in the #card-section
const addCards = (books) => {
    const cardSection = document.getElementById('card-section')
    cardSection.innerHTML = ''

    if (!books.length) {
        cardSection.innerHTML =
            '<div class="col s12 center-align grey-text">No books found.</div>'
        return
    }

    books.forEach(book => {
        const card =
        `<div class="col s12 m6 l3">
            <div class="card hoverable book-card">
                <div class="card-image book-image-wrapper" data-id="${book.id}">
                    <img src="${book.image}" alt="${book.title}">
                    <span class="card-title card-title-bg">${book.title}</span>
                </div>
                <div class="card-content">
                    <p class="book-author">${book.title}</p>
                    <p class="book-genre">Genre: ${book.genre}</p>
                </div>
                <div class="book-extra" id="extra-${book.id}">
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Pages:</strong> ${book.pages}</p>
                    <p class="book-desc">${book.description}</p>
                </div>
            </div>
        </div>`
        cardSection.innerHTML += card
    })

    // click on image -> slide up/down book info
    $('.book-image-wrapper').off('click').on('click', function() {
        const id = $(this).data('id')
        const extra = $('#extra-' + id)
        extra.slideToggle(300)
    })
}

// Smooth scroll + hash in URL for nav links
const setupNavScrolling = () => {
    $('.nav-link').on('click', function(e) {
        e.preventDefault()
        const target = $(this).attr('href')
        if (target && target !== '#') {
            window.location.hash = target
            $('html, body').animate({
                scrollTop: $(target).offset().top - 60
            }, 600)
        }
    })
}

// About box slide toggle
const setupAboutBox = () => {
    $('#aboutBox').on('click', function() {
        $('#aboutDetails').slideToggle(300)
        const icon = $('#aboutIcon')
        if (icon.hasClass('rotated')) {
            icon.removeClass('rotated').css('transform', 'rotate(0deg)')
        } else {
            icon.addClass('rotated').css('transform', 'rotate(180deg)')
        }
    })
}

// Open modal when Add Book button clicked
const setupAddBookButton = () => {
    $('#addBookBtn').on('click', function() {
        const modalElem = document.getElementById('addBookModal')
        const modalInstance = M.Modal.getInstance(modalElem)
        modalInstance.open()
    })
}

// Handle Add Book form submit (client-side only)
const setupAddBookForm = () => {
    $('#addBookForm').on('submit', function(e) {
        e.preventDefault()

        const title = $('#newTitle').val().trim()
        const pages = parseInt($('#newPages').val(), 10)
        const genre = $('#newGenre').val().trim()
        const description = $('#newDescription').val().trim()

        if (!title || !pages || !genre || !description) {
            alert('Please fill in all fields.')
            return
        }

        // create a new book object (client-side only)
        const newBook = {
            id: allBooks.length ? Math.max(...allBooks.map(b => b.id)) + 1 : 1,
            title: title,
            author: 'Custom Book',
            image: 'images/t1.jpg', // placeholder image – change if you like
            description: description,
            pages: pages,
            genre: genre
        }

        allBooks.push(newBook)
        addCards(allBooks)

        // clear form
        $('#newTitle').val('')
        $('#newPages').val('')
        $('#newGenre').val('')
        $('#newDescription').val('')
        M.updateTextFields()

        // close modal
        const modalElem = document.getElementById('addBookModal')
        const modalInstance = M.Modal.getInstance(modalElem)
        modalInstance.close()
    })
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Document ready")

    // Init Materialize components
    const selectElems = document.querySelectorAll('select')
    M.FormSelect.init(selectElems)

    const modalElems = document.querySelectorAll('.modal')
    M.Modal.init(modalElems)

    setupNavScrolling()
    setupAboutBox()
    setupAddBookButton()
    setupAddBookForm()
    getBooks()
})
