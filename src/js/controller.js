import urlShortenerView from "./Views/urlShortenerView.js";
import * as model from "./model.js";

const controlGetShortURL = async function (url) {
  try {
    if (model.isPresentInLocalStorage(url)) return;
    urlShortenerView.renderLoader();
    await model.getShortURL(url);
    urlShortenerView.renderShortURL(model.state.result.short_link, url);
    urlShortenerView.hideLoader();
  } catch (err) {
    urlShortenerView.renderError(err);
  }
};
const controlLocalStorages = function () {
  model.getLocalStorage();
  urlShortenerView.renderOnLoad(model.state.savedURLs);
};

const copyShortLinkToClipboard = function (clickEvent) {
  const copyBtn = clickEvent.target;
  const copyText = copyBtn.parentNode.querySelector(".short-url--link");

  copyText.select();
  document.execCommand("copy");
  urlShortenerView.renderCopiedBtn(copyBtn);
};

const controlHandlers = function () {
  controlLocalStorages();
  urlShortenerView.addHandlerForm(controlGetShortURL);
  urlShortenerView.addHandlerCopy(copyShortLinkToClipboard);
};

controlHandlers();
