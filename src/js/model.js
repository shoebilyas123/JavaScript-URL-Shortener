import { API_URL, TIMEOUT_SEC } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  result: {
    short_link: "",
  },
  savedURLs: [],
};

export const isPresentInLocalStorage = function (url) {
  return state.savedURLs.some((savedURL) => savedURL.default_url === url);
};

const createShortURL = function (data, url) {
  state.result.short_link = `${data.full_short_link}`;
  const dataToStore = { default_url: url, short_url: data.full_short_link };
  state.savedURLs.push(dataToStore);
  setLocalStorage();
};

export const setLocalStorage = function () {
  localStorage.setItem("shortURLS", JSON.stringify(state.savedURLs));
};

export const getLocalStorage = function () {
  const storage = JSON.parse(localStorage.getItem("shortURLS"));
  console.log(storage);
  if (!storage) return;
  state.savedURLs = [...storage];
};

export const clearLocalStorage = function () {
  localStorage.clear();
};

export const getShortURL = async function (url) {
  try {
    const data = await getJSON(`${API_URL}=${url}`);
    createShortURL(data, url);
  } catch (err) {
    throw err;
  }
};
