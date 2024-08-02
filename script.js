const bookList = document.getElementById('book-list');
const addBookForm = document.getElementById('add-book-form');
const filterForm = document.getElementById('filter-form');

let books = [
    { title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Adventures', year: '2001', status: "Read" },
    { title: 'The Sisters’', author: 'Claire Douglas', genre: 'Fantasy', year: '2014', status: "Almost read" },
];
let editIndex = -1; // Змінна для збереження індексу книги, яку редагують

// Функція для відображення книг
function displayBooks(filteredBooks) {
    bookList.innerHTML = '';
    const booksToDisplay = filteredBooks || books;
    booksToDisplay.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
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

// Функція для фільтрації книг
function filterBooks(event) {
    event.preventDefault();
    const filterTitle = document.getElementById('filter-title').value.toLowerCase();
    const filterAuthor = document.getElementById('filter-author').value.toLowerCase();

    const filteredBooks = books.filter(book => {
        return (filterTitle === '' || book.title.toLowerCase().includes(filterTitle)) &&
               (filterAuthor === '' || book.author.toLowerCase().includes(filterAuthor));
    });
    displayBooks(filteredBooks);
}

// Функція для додавання або оновлення книги
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
            books[editIndex] = newBook;
            editIndex = -1;
        } else {
            books.push(newBook);
        }
        displayBooks();
        addBookForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
}

// Функція для видалення книги
function removeBook(index) {
    books.splice(index, 1);
    displayBooks();
}

// Функція для редагування книги
function editBook(index) {
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('genre').value = book.genre;
    document.getElementById('year').value = book.year;
    document.getElementById('status').value = book.status;
    editIndex = index;
}

// Додати події
addBookForm.addEventListener('submit', addBook);
filterForm.addEventListener('submit', filterBooks);

// Показати всі книги при завантаженні сторінки
displayBooks();

function deleteAuthor(event) {
    event.preventDefault();
    const authorToDelete = document.getElementById('delete-author').value.toLowerCase();

    if (authorToDelete) {
        books = books.filter(book => book.author.toLowerCase() !== authorToDelete);
        displayBooks();
        document.getElementById('delete-author-form').reset();
    } else {
        alert('Please enter an author name.');
    }
}
document.getElementById('delete-author-form').addEventListener('submit', deleteAuthor);

// Функція для конвертації книг у формат CSV
function convertBooksToCSV(books) {
    const header = 'Title,Author,Genre,Year of Release,Reading Status';
    const rows = books.map(book => 
        `${book.title},${book.author},${book.genre},${book.year},${book.status}`
    );
    return [header, ...rows].join('\n');
}

// Функція для завантаження CSV файлу
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

// Додати подію для експорту книги
document.getElementById('export-books').addEventListener('click', () => {
    const csv = convertBooksToCSV(books);
    downloadCSV(csv);
});
