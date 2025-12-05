let allBooks = []

const getBooks = () => {
    console.log("Fetching /api/books ...")
    fetch('/api/books')
        .then(res => res.json())
        .then(result => {
            console.log("API result:", result)
            allBooks = result.data || [] 
            addCards(allBooks)
        })
        .catch(err => console.error("Error fetching books:", err))
}

const addCards = (books) => {
    console.log("addCards got:", books)

    const cardSection = document.getElementById('card-section')
    cardSection.innerHTML = ''

    if (!books.length) {
        cardSection.innerHTML =
            '<div class="col s12 center-align grey-text">No books found.</div>'
        return
    }

    books.forEach(book => {
        const id = book.id || book._id  

        const card =
        `<div class="col s12 m6 l3">
            <div class="card hoverable book-card">
                <div class="card-image book-image-wrapper" data-id="${id}">
                    <img src="${book.image}" alt="${book.title}">
                    <span class="card-title card-title-bg">${book.title}</span>
                </div>
                <div class="card-content">
                    <p class="book-author">${book.title}</p>
                    <p class="book-genre">Genre: ${book.genre}</p>
                </div>
                <div class="book-extra" id="extra-${id}">
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Pages:</strong> ${book.pages}</p>
                    <p class="book-desc">${book.description}</p>
                </div>
            </div>
        </div>`
        cardSection.innerHTML += card
    })

    $('.book-image-wrapper').off('click').on('click', function() {
        const id = $(this).data('id')
        const extra = $('#extra-' + id)
        extra.slideToggle(300)
    })
}

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

const setupAddBookButton = () => {
    $('#addBookBtn').on('click', function() {
        const modalElem = document.getElementById('addBookModal')
        const modalInstance = M.Modal.getInstance(modalElem)
        modalInstance.open()
    })
}

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

        const newBook = {
            id: allBooks.length ? Math.max(...allBooks.map(b => b.id || 0)) + 1 : 1,
            title: title,
            author: 'Custom Book',
            image: 'images/t1.jpg',
            description: description,
            pages: pages,
            genre: genre
        }

        allBooks.push(newBook)
        addCards(allBooks)

        $('#newTitle').val('')
        $('#newPages').val('')
        $('#newGenre').val('')
        $('#newDescription').val('')
        M.updateTextFields()

        const modalElem = document.getElementById('addBookModal')
        const modalInstance = M.Modal.getInstance(modalElem)
        modalInstance.close()
    })
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Document ready")

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
