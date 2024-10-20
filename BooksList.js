import { Book } from "./Book.js";

export class BookList {
  _books = [];
  _key = null;
  _def = [];

  constructor(container, key, def = []) {
    // container.innerHTML = "";// обновление чекущего эллемента, но он будет один
    this.libraryCont = document.querySelector("#library");
    this.library = document.querySelector("#libraryInner");
    this.container = container;

    this._key = key;
    this._def = def;

    this.update();
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

  add(title, author, pages, isread) {
    let newBook = new Book(this, title, author, pages, isread);
    newBook.id = this.getNewId();
    this._books.push(newBook);

    this.warning();
    this.save();

    console.log(this._books);
  }

  remove(value) {
    let id = value;

    if (value instanceof Book) {
      id = value.id;
    }
    for (let i = 0; i <= this._books.length; i++) {
      if (this._books[i].id == id) {
        this._books.splice(i, 1);
      }
    }

    this.warning();
    this.save();
  }

  warning() {
    if (this._books.length == 0) {
      this.warn = document.createElement("div");
      this.warn.className = "warnBox";
      this.warn.textContent = "There are no books in the library";

      this.libraryCont.prepend(this.warn);
    } else {
      if (this.warn) {
        this.warn.remove();
      }
    }
  }

  save() {
    if (this._key) {
      let saveList = [];

      for (const book of this._books) {
        saveList.push({
          id: book.id,
          title: book._title,
          author: book._author,
          pages: book._pages,
          isread: book._isread,
        });
      }
      localStorage.setItem(this._key, JSON.stringify(saveList));
    }
  }

  update() {
    // let startList = []; -- по умолчанию пустой массив
    let startList = this._def;
    this._books = [];
    this.library.innerHTML = "";

    if (this._key) {
      let detaLS = localStorage.getItem(this._key);
      if (detaLS != "" && detaLS != null) {
        startList = JSON.parse(detaLS);
      }
    }

    if (startList.length > 0) {
      for (const obj of startList) {
        let newBook = new Book(this, obj.author, obj.title, obj.pages, obj.isread);

        if (obj.id) {
          newBook.id = obj.id;
        } else {
          newBook.id = this.getNewId();
        }

        this._books.push(newBook);
      }
    }

    this.save();
    this.warning();
  }
}
//
