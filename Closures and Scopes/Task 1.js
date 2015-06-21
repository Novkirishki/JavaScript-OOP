// Create a module for working with books
// The module must provide the following functionalities:
// Add a new book to category
// Each book has unique title, author and ISBN
// It must return the newly created book with assigned ID
// If the category is missing, it must be automatically created
// List all books
// Return an array of books
// Books are sorted by ID
// This can be done by author, by category or all
// They are provided by an options object {category: ...} or {author: ...}
// List all categories
// Return an array of categories
// Categories are sorted by ID
// Each book/catagory has a unique identifier (ID) that is a number greater than 1
// When adding a book/category, the ID is generated automatically
// Add validation everywhere, where possible
// Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
// Author is any non-empty string
// Unique params are Book title and Book ISBN
// Book ISBN is an unique code that contains either 10 or 13 digits
// If something is not valid - throw Error

var library = (function() {
	var currentBookID = 2,
		books = [],
		categories = [];
	function addBook(bookToAdd) {
		var curCat;
		//checks for validity
		if (bookToAdd.title === undefined || bookToAdd.title.length < 2 || bookToAdd.title.length > 100) {
			throw new Error("Book name is not valid");
		} else if (bookToAdd.author === undefined || bookToAdd.author === '') {
			throw new Error("Book author is not valid");
		} else if (bookToAdd.isbn === undefined || (bookToAdd.isbn.length != 10 && bookToAdd.isbn.length != 13) || isNaN(bookToAdd.isbn)) {
			throw new Error("Book isbn is not valid");
		} else if (bookToAdd.category === undefined) {
			throw new Error("Book category is not valid");
		}
		//check if book is added
		books.forEach(function(book) {
			if ((book.title === bookToAdd.title) || (book.isbn === bookToAdd.isbn)) {
				throw new Error("Book already exists");
			}
		});
		//adding ID
		bookToAdd.ID = currentBookID;
		++currentBookID;
		//Checking if category exists	
		curCat = bookToAdd.category;
		if (categories.indexOf(curCat) <= -1) {
			categories.push(curCat);
		}
		//adds book to library
		books.push(bookToAdd);
		
		return bookToAdd;
	}
	
	function listBooks(obj) {
		var result = [],
			index;
		if (obj != undefined) {
			if (obj.category != undefined) {
				for (index = 0; index < books.length; index += 1) {
					if (books[index].category === obj.category) {
						result.push(books[index]);
					}					
				}
			} else if (obj.author != undefined) {
				for (index = 0; index < books.length; index += 1) {
					if (books[index].author === obj.author) {
						result.push(books[index]);
					}					
				}
			}
		} else {
			result = books;
		}
		
		return result.sort(function(a,b){return a.ID-b.ID});
	}
	
	function listCategories() {
		return categories;
	}
	
	return {
		books: {
			list: listBooks,
			add: addBook
		},
		categories: {
			list: listCategories
		}
	};
}());