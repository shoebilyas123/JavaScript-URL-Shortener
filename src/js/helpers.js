import { WAIT_TIME } from "./config.js";
export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Invalid URL : ${res.status}`);
    const data = await res.json();
    return data.result;
  } catch (err) {
    throw err;
  }
};

export const timeout = async function () {
  return new Promise(function (resolve) {
    setTimeout(resolve, WAIT_TIME * 1000);
  });
};
