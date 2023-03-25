console.log('Оценка за работу 100 баллов.\nСтраница Main (60):\n1. Проверка верстки +6;\n2. Вёрстка соответствует макету +35;\n3. Требования к css +7;\n4. Интерактивность элементов +12.\nСтраница Pets(40):\n1. Проверка верстки +6;\n2. Вёрстка соответствует макету +15;\n3. Требования к css +5;\n4. Интерактивность элементов +14.');

const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const menu = document.querySelector("#menu").cloneNode(1);
const blackout = document.querySelector('.blackout');
const body = document.body;

//  Бургер
hamb.addEventListener("click", hambHandler);

function hambHandler(e) {
    e.preventDefault();
    // Переключаем стили элементов при клике
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll");
    blackout.classList.toggle('active');
    renderPopup();
  }

function renderPopup() {
    popup.appendChild(menu);
}


const links = Array.from(menu.children);

// Для каждого элемента меню при клике вызываем ф-ию
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

// Закрытие попапа при клике на меню
function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
  blackout.classList.remove('active');
};

popup.addEventListener("click", outsideMenuCloseClick);

// Закрытие попапа при клике вне меню
function outsideMenuCloseClick(e) {
  if(e.target.className !== "nav-list") {
    closeOnClick();
  };
};

// Закрытие попапа при клике по затемненной области

blackout.addEventListener("click", closeBalckOut);

function closeBalckOut() {
  blackout.classList.remove('active');
  closeOnClick();
};