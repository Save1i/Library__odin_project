const addBookBtn = document.querySelector("#btn-add");

const library = document.querySelector("#libraryInner");
const addBookWind = document.querySelector("#modal-wind__add");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const isRead = document.querySelector("#is-read");

class Book {
  constructor(container, title, author, pages, isread) {
    this.bookCard = document.createElement("div");
    this.title = document.createElement("p");
    this.author = document.createElement("p");
    this.pages = document.createElement("p");
    this.isReadBtn = document.createElement("button");
    this.removeBtn = document.createElement("button");

    this.bookCard.className = "book__card";
    this.isReadBtn.className = "btn btn-red";
    this.isReadBtn.textContent = "Is read";
    this.removeBtn.className = "btn btn-remove";
    this.removeBtn.textContent = "Remove";

    container.append(this.bookCard);
    this.bookCard.append(this.title);
    this.bookCard.append(this.author);
    this.bookCard.append(this.pages);
    this.bookCard.append(this.isReadBtn);
  }
}

let newBook = new Book(library);
newBook.hi();

function createBook(form) {
  const bookCard = document.createElement("div");
  bookCard.className = "book__card";
  library.append(bookCard);

  for (let i = 0; i < 3; i++) {
    const text = document.createElement("p");
    text.textContent = form[i].value;
    bookCard.append(text);
  }

  const isReadBtn = document.createElement("button");
  isReadBtn.className = "btn btn-red";
  isReadBtn.textContent = "Is read";
  bookCard.append(isReadBtn);

  const removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-remove";
  removeBtn.textContent = "Remove";
  bookCard.append(removeBtn);

  // Добавляем данные книги в функцию addToArray при вызове
  removeBtn.addEventListener("click", () => {
    const parentCard = removeBtn.closest(".book__card");
    console.log(parentCard);
    if (parentCard) {
      const indexToRemove = Array.from(library.children).indexOf(parentCard);
      console.log(indexToRemove);
      const bookData = myLibrary[indexToRemove];

      parentCard.remove();

      // Удаляем соответствующий элемент из массива myLibrary
      myLibrary.splice(indexToRemove, 1);

      // Передаем данные книги в функцию addToArray для удаления из массива
      removeToArray(bookData);
      console.log(myLibrary);
    }
  });

  addBookBtn.addEventListener("click", () => {
    addBookWind.classList.add("open");
  });

  window.addEventListener("keydown", (btn) => {
    if (btn.key === "Escape") {
      addBookWind.classList.remove("open");
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target == addBookWind) {
      addBookWind.classList.remove("open");
    }
  });

  let myLibrary = [];

  addBookWind.addEventListener("submit", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    serializeForm(addBookWind);
  }

  function serializeForm(addBookObject) {
    const { elements } = addBookObject;
    const data = Array.from(elements).map((element) => {
      const { name, value } = element;

      return { name, value };
    });
    myLibrary.push(data);
    // console.log(myLibrary);
    createBook(data);
  }

  isReadBtn.addEventListener("click", () => {
    isReadBtn.classList.toggle("btn-light-green");
  });
}

// Обновленная функция addToArray, которая удаляет данные книги из массива
function removeToArray(bookData) {
  // Находим индекс данной книги в массиве myLibrary
  const index = myLibrary.findIndex((item) => item === bookData);
  // Если найден, удаляем данные книги из массива
  if (index !== -1) {
    myLibrary.splice(index, 1);
    console.log(myLibrary);
  }
}

// console.log(myLibrary);

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// function Book(title, author, pages) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
// }

// function serializeForm(formNode) {
//   console.log(formNode.elements);
// }

// function addBookToLibrary() {
//   let title = titleInput.value;
//   let author = authorInput.value;
//   let pages = pagesInput.value;
//   let book = new Book(title, author, pages);
//   myLibrary.push(book);
//   console.log(myLibrary);
// }

// addBookToLibrary(1, 2, 52);
// // let add2 = new Book(2, 2, 33);
// // myLibrary.push(add2);
// // add2 = new Book(2, 222, 33);

// // myLibrary.push(add2);
// // console.log(myLibrary);

// // console.log(myLibrary[1]);

// Book.prototype.info = function () {
//   return this.title + " " + this.author;
// };

// const Hobbit = new Book("Hobbit", "by J.R.R.", "295 pages", "not read yet");
