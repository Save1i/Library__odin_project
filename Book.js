// import { BookList } from "./BooksList.js";

export class Book {
  _title = "";
  _author = "";
  _pages = "";
  _isread = "";

  constructor(container, title = "", author = "", pages = "", isread) {
    this.library = document.createElement("div");
    this.bookCard = document.createElement("div");
    this.titleText = document.createElement("p");
    this.authorText = document.createElement("p");
    this.pagesText = document.createElement("p");
    this.isReadBtn = document.createElement("button");
    this.removeBtn = document.createElement("button");

    this.library.className = "library__inner";
    this.bookCard.className = "book__card";
    this.isReadBtn.className = "btn btn-red";
    this.isReadBtn.textContent = "Is read";
    this.removeBtn.className = "btn btn-remove";
    this.removeBtn.textContent = "Remove";

    this.isReadBtn.addEventListener("click", () => {
      this.isread = !this.isread;
    });

    this.removeBtn.addEventListener("click", () => {
      if (confirm("Вы уверенны?")) {
        this.removeBook();
      }
    });

    this.bookCard.append(this.titleText);
    this.bookCard.append(this.authorText);
    this.bookCard.append(this.pagesText);
    this.bookCard.append(this.isReadBtn);
    this.bookCard.append(this.removeBtn);

    this.container = container;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;

    container.append(this.bookCard);
  }

  removeBook() {
    this.bookCard.remove();
  }

  set title(value) {
    this._title = value;
    this.titleText.textContent = value;
  }

  get title() {
    // return this._title;
  }

  set author(value) {
    this._author = value;
    this.authorText.textContent = value;
  }

  get author() {
    // return this._author;
  }

  set pages(value) {
    this._pages = value;
    this.pagesText.textContent = value;
  }

  get pages() {}

  set isread(value) {
    this._isread = value;
    if (value === true) {
      this.isReadBtn.className = "btn btn-light-green";
    } else {
      this.isReadBtn.className = "btn btn-red";
    }
  }

  get isread() {
    return this._isread;
  }
}
