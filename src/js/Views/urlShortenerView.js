import { timeout } from "../helpers.js";
class URLShortenerView {
  _parentElement = document.querySelector(".short-url--container");
  _form = document.querySelector(".submit-url");
  _data;
  _defaultCopyBtnText = "Copy";

  addHandlerForm(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputURL = document.querySelector(".input-url");
      handler(inputURL.value);
      inputURL.value = "";
    });
  }
  _selectChildElement(className) {
    return this._parentElement.querySelector(`.${className}`);
  }
  addHandlerCopy(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (!e.target.classList.contains("short-url--copy")) return;
      handler(e);
    });
  }

  async renderCopiedBtn(btn, btnText = "Copied!") {
    btn.innerText = btnText;
    btn.classList.add("btn-url--copied");
    await timeout();
    btn.classList.remove("btn-url--copied");
    btn.innerText = this._defaultCopyBtnText;
  }
  async renderError(errMessage = "Invalid URL!") {
    const errMsg = document.querySelector(".error_message");
    const inputFieldErrorDispay = this._form.querySelector(".input-url");
    errMsg.classList.remove("hidden");
    inputFieldErrorDispay.classList.add("submit-error");
    await timeout();
    errMsg.classList.add("hidden");
    inputFieldErrorDispay.classList.remove("submit-error");
  }
  renderOnLoad(savedData) {
    savedData.forEach((data) => {
      this.renderShortURL(data.short_url, data.default_url);
    });
  }
  renderShortURL(data, defaultURL) {
    this._data = data;
    const markup = this._generateMarkup(defaultURL);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.classList.remove("hidden");
  }

  _generateMarkup(url) {
    return `
    <div class="short-url-list-item">
        <p class="short-url">https://${url}</p>
        <input readonly class="short-url--link" value = "${this._data}">
        <button class="short-url--copy">Copy</button>
    </div>`;
  }
  _findLoader() {
    return document.querySelector(".loader");
  }
  renderLoader() {
    const loader = this._findLoader();
    loader.classList.remove("hidden");
  }
  hideLoader() {
    const loader = this._findLoader();
    loader.classList.add("hidden");
  }
}

export default new URLShortenerView();
