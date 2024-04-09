import { Book } from "./Book.js";

export class BookList {
  _books = [];

  constructor(container) {
    // container.innerHTML = "";// обновление чекущего эллемента, но он будет один
    this.libraryCont = document.querySelector("#libraryInner");
    this.container = container;
  }

  getNewId() {
    let max = 0;
    for (const book of this._books) {
      if (book.id > max) {
        max = book.id;
      }
    }
    return max + 1;
  }

  remove(value) {
    let id = value;

    if (value instanceof Book) {
      id = value.id;
    }
    for (let i = 0; i < this._books.length; i++) {
      if (this._books[i].id == id) {
        this._books.splice(i, 1);
      }
    }
  }

  add(title, author, pages, isread) {
    let newBook = new Book(this, title, author, pages, isread);
    newBook.id = this.getNewId();
    this._books.push(newBook);
  }
}
