const btnToggleMenu = document.querySelector(".btn_nav-menu");
const navMenu = document.querySelector(".links");
const cards = document.querySelectorAll(".card");
let margin = 25;
let marginBottom = 125;
const iterator = 50;
const addMargin = function () {
  if (window.innerWidth > 500) return;

  cards.forEach((card) => {
    card.style.marginTop = `${margin}px`;
    card.style.marginBottom = `${marginBottom}px`;
    marginBottom -= iterator;
    margin += iterator;
  });

  margin = 25;
};
const toggleHidden = function () {
  if (window.innerWidth <= 500) {
    navMenu.classList.add("hidden");
    btnToggleMenu.classList.remove("hidden");
  } else {
    navMenu.classList.remove("hidden");
    btnToggleMenu.classList.add("hidden");
  }
};
window.onresize = () => toggleHidden();

const toggleMenu = function () {
  navMenu.classList.toggle("hidden");
};

btnToggleMenu.addEventListener("click", toggleMenu);

addMargin();
