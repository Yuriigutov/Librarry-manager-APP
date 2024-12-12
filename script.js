const bookList = document.getElementById('book-list');
const addBookForm = document.getElementById('add-book-form');
const filterForm = document.getElementById('filter-form');

let books = JSON.parse(localStorage.getItem('books')) || [
    { title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Adventures', year: '2001', status: "Read" },
    { title: 'The Sisters', author: 'Claire Douglas', genre: 'Fantasy', year: '2014', status: "Almost read" },
];
let editIndex = -1; // Variable to store the index of the book being edited

// Function to display books
function displayBooks(filteredBooks) {
    bookList.innerHTML = '';
    const booksToDisplay = filteredBooks || books;
    booksToDisplay.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        // Displaying book details with options to edit or remove
        bookItem.innerHTML = `<p><strong>Title:</strong> ${book.title}</p>
                              <p><strong>Author:</strong> ${book.author}</p>
                              <p><strong>Genre:</strong> ${book.genre}</p>
                              <p><strong>Year of Release:</strong> ${book.year}</p>
                              <p><strong>Reading Status:</strong> ${book.status}</p>
                              <button onclick="editBook(${index})">Edit</button>
                              <button onclick="removeBook(${index})">Remove</button>`;
        bookList.appendChild(bookItem);
    });
}

// Function to filter books by title or author
function filterBooks(event) {
    event.preventDefault();
    const filterTitle = document.getElementById('filter-title').value.toLowerCase();
    const filterAuthor = document.getElementById('filter-author').value.toLowerCase();

    const filteredBooks = books.filter(book => {
        return (filterTitle === '' || book.title.toLowerCase().includes(filterTitle)) &&
               (filterAuthor === '' || book.author.toLowerCase().includes(filterAuthor));
    });
    displayBooks(filteredBooks); // Displaying filtered books
}

// Function to add a book to the library
function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;
    const status = document.getElementById('status').value;

    if (title && author && genre && year && status) {
        const newBook = { title, author, genre, year, status };
        if (editIndex >= 0) {
            books[editIndex] = newBook; // Updating existing book details
            editIndex = -1;
        } else {
            books.push(newBook); // Adding a new book to the library
        }
        localStorage.setItem('books', JSON.stringify(books)); // Update local storage
        displayBooks(); // Refreshing the displayed book list
        addBookForm.reset(); // Resetting the form fields
    } else {
        alert('Please fill in all fields.'); // Alert if any required field is empty
    }
}

// Function to remove a book
function removeBook(index) {
    books.splice(index, 1); // Removing the selected book from the library
    localStorage.setItem('books', JSON.stringify(books)); // Update local storage
    displayBooks(); // Refreshing the displayed book list
}

// Function to edit a book
function editBook(index) {
    const book = books[index];
    // Populating form fields with existing book details for editing
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('genre').value = book.genre;
    document.getElementById('year').value = book.year;
    document.getElementById('status').value = book.status;
    editIndex = index; // Storing the index of the book being edited
}

// Add event listeners
addBookForm.addEventListener('submit', addBook);
filterForm.addEventListener('submit', filterBooks);

// Display books when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    // JavaScript for modals
    var registrationModal = document.getElementById("registration-modal");
    var signInModal = document.getElementById("sign-in-modal");
    var signupButton = document.getElementById("signup-link");
    var signInButton = document.getElementById("signin-link");
    var closeButtons = document.getElementsByClassName("close");
    var switchToLogin = document.getElementById("switch-to-login");
    var switchToRegister = document.getElementById("switch-to-register");
    var registrationForm = document.getElementById("registration-form");
    var signInForm = document.getElementById("sign-in-form");
    var successMessage = document.getElementById("success-message");
    var signInSuccessMessage = document.getElementById("sign-in-success-message");

    if (signupButton) {
        signupButton.onclick = function() {
            registrationModal.style.display = "block";
        }
    }

    if (signInButton) {
        signInButton.onclick = function() {
            signInModal.style.display = "block";
        }
    }

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            registrationModal.style.display = "none";
            signInModal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == registrationModal || event.target == signInModal) {
            registrationModal.style.display = "none";
            signInModal.style.display = "none";
        }
    }

    if (switchToLogin) {
        switchToLogin.onclick = function() {
            registrationModal.style.display = "none";
            signInModal.style.display = "block";
        }
    }

    if (switchToRegister) {
        switchToRegister.onclick = function() {
            signInModal.style.display = "none";
            registrationModal.style.display = "block";
        }
    }

    if (registrationForm) {
        registrationForm.onsubmit = function(event) {
            event.preventDefault();
            var username = document.getElementById("reg-username").value;
            var email = document.getElementById("reg-email").value;
            var password = document.getElementById("reg-password").value;
            console.log("Username:", username);
            console.log("Email:", email);
            console.log("Password:", password);
            successMessage.style.display = "block";
            registrationForm.style.display = "none";
            setTimeout(function() {
                registrationModal.style.display = "none";
                successMessage.style.display = "none";
                registrationForm.style.display = "block";
            }, 3000);
        };
    }

    if (signInForm) {
        signInForm.onsubmit = function(event) {
            event.preventDefault();
            var email = document.getElementById("sign-in-email").value;
            var password = document.getElementById("sign-in-password").value;
            console.log("Email:", email);
            console.log("Password:", password);
            signInSuccessMessage.style.display = "block";
            signInForm.style.display = "none";
            setTimeout(function() {
                signInModal.style.display = "none";
                signInSuccessMessage.style.display = "none";
                signInForm.style.display = "block";
            }, 3000);
        };
    }
});

// Function to delete an author and their books
function deleteAuthor(event) {
    event.preventDefault();
    const authorToDelete = document.getElementById('delete-author').value.toLowerCase();

    if (authorToDelete) {
        books = books.filter(book => book.author.toLowerCase() !== authorToDelete); // Deleting books by the specified author
        localStorage.setItem('books', JSON.stringify(books)); // Update local storage
        displayBooks(); // Refreshing the displayed book list
        document.getElementById('delete-author-form').reset(); // Resetting the delete author form
    } else {
        alert('Please enter an author name.'); // Alert if no author name is entered
    }
}
document.getElementById('delete-author-form').addEventListener('submit', deleteAuthor);

// Function to convert books to CSV
function convertBooksToCSV(books) {
    const header = 'Title,Author,Genre,Year of Release,Reading Status';
    const rows = books.map(book => 
        `${book.title},${book.author},${book.genre},${book.year},${book.status}`
    );
    return [header, ...rows].join('\n');
}

// Function to download CSV file
function downloadCSV(csv, filename = 'books.csv') {
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    const url = URL.createObjectURL(csvFile);
    downloadLink.href = url;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Add event listener for exporting books
document.getElementById('export-books').addEventListener('click', () => {
    const csv = convertBooksToCSV(books); // Converting books data to CSV format
    downloadCSV(csv); // Initiating CSV download
});


/* NEW */

const reviewsSection = document.getElementById('reviews');
const addReviewForm = document.getElementById('add-review-form');
const reviewBookSelect = document.getElementById('review-book');

let reviews = JSON.parse(localStorage.getItem('reviews')) || []; // Завантаження відгуків із localStorage

// Оновлення списку книг у формі відгуків
function updateBookOptions() {
    reviewBookSelect.innerHTML = '';
    books.forEach((book, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = book.title;
        reviewBookSelect.appendChild(option);
    });
}

// Відображення відгуків з кнопкою для видалення
function displayReviews() {
    reviewsSection.innerHTML = '';
    reviews.forEach((review, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <p><strong>Book:</strong> ${books[review.bookIndex].title}</p>
            <p><strong>Review:</strong> ${review.text}</p>
            <button class="delete-review" data-index="${index}">Delete Review</button>
        `;
        reviewsSection.appendChild(reviewItem);
    });

    // Додаємо обробку кліку для кнопок видалення
    const deleteButtons = document.querySelectorAll('.delete-review');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteReview);
    });
}

// Додавання нового відгуку
function addReview(event) {
    event.preventDefault();
    const bookIndex = reviewBookSelect.value;
    const reviewText = document.getElementById('review-text').value;

    if (bookIndex && reviewText) {
        const newReview = { bookIndex: parseInt(bookIndex, 10), text: reviewText };
        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews)); // Збереження у localStorage
        displayReviews(); // Оновлення списку відгуків
        addReviewForm.reset(); // Очищення форми
    } else {
        alert('Please fill in all fields.');
    }
}

// Видалення відгуку
function deleteReview(event) {
    const indexToDelete = event.target.getAttribute('data-index');
    reviews.splice(indexToDelete, 1); // Видаляємо відгук з масиву
    localStorage.setItem('reviews', JSON.stringify(reviews)); // Оновлюємо localStorage
    displayReviews(); // Оновлюємо відображення відгуків
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    updateBookOptions(); // Оновлення списку книг
    displayReviews(); // Відображення відгуків
});

// Обробка подій
addReviewForm.addEventListener('submit', addReview);




/* very new */

