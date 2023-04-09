console.log('Оценка за работу 110 баллов.\nРеализация burger menu на обеих страницах: +26;\nРеализация слайдера-карусели на странице Main: +36;\nРеализация пагинации на странице Pets: +36;\nРеализация попап на обеих страницах: +12.');

window.onload = function () {
  getSixTimesArrayNumbers();
  generateLongArray(generateArrayNumbers());
  generatePaginationPage();
  clickHandlerOnSliderItem();
  console.log(bigArrayFortyEigth)
}

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



//Модальное окно

const petsCards = [
  {
    id: 0,
    "name": "Jennifer",
    "img": "../../assets/images/img/pets-jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    id: 1,
    "name": "Sophia",
    "img": "../../assets/images/img/pets-sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    id: 2,
    "name": "Woody",
    "img": "../../assets/images/img/pets-woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    id: 3,
    "name": "Scarlett",
    "img": "../../assets/images/img/pets-scarlet.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    id: 4,
    "name": "Katrine",
    "img": "../../assets/images/img/pets-katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    id: 5,
    "name": "Timmy",
    "img": "../../assets/images/img/pets-timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    id: 6,
    "name": "Freddie",
    "img": "../../assets/images/img/pets-freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    id: 7,
    "name": "Charly",
    "img": "../../assets/images/img/pets-charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
]

function clickHandlerOnSliderItem () {
  document.querySelectorAll('.our-friends_item').forEach(item => {
    item.addEventListener('click', () => {
      getModalWindow(petsCards[item.id]);
    });
  });
}

function getModalWindow (date) {
  let modal;
  let template = '';
  modal = document.createElement('div');
  modal.className = 'overlay';
  template += `<div class="modal">`;
    template += `<div class="closeModalBtn">`;
    template += `</div>`;
    template += `<div class="modalContent">`;
      template += `<div class="modalContent_pet">`;
        template += `<img src="${date.img}" alt="${date.name}">`;
      template += `</div>`;
      template += `<div class="modalContent_text">`;
        template += `<h3 class="modalContent_text-title">${date.name}`;
        template += `</h3>`;
        template += `<h4 class="modalContent_text-type-breed">${date.type} - ${date.breed}`;
        template += `</h4>`;
        template += `<p class="modalContent_text-description">${date.description}`;
        template += `</p>`;
        template += `<ul class="modalContent_text_options">`;
          template += `<li class="modalContent_text_option"><span>Age: </span><span>${date.age}</span>`;
          template += `</li>`;
          template += `<li class="modalContent_text_option"><span>Inoculations: </span><span>${date.inoculations}</span>`;
          template += `</li>`;
          template += `<li class="modalContent_text_option"><span>Diseases: </span><span>${date.diseases}</span>`;
          template += `</li>`;
          template += `<li class="modalContent_text_option"><span>Parasites: </span><span>${date.parasites}</span>`;
          template += `</li>`;
        template += `</ul>`;
      template += `</div>`;
    template += `</div>`;
  template += `</div>`;
  modal.innerHTML = template;
  document.querySelector('.our-friends').append(modal);
  body.classList.add("noscroll");

  const closeBtnModalWindow = document.querySelector('.overlay');

  closeBtnModalWindow.addEventListener('click', (e) => {
    if (!e.target.closest('.modalContent')) {
      document.querySelector('.our-friends').removeChild(modal);
      modal = undefined;
      body.classList.remove("noscroll");
    }
  })
}


//Генерируем карточки питомцев

function generatePaginationPage () {
  if (innerWidth > 768) {
    let pageNumber = document.querySelector('.circle.full').innerText;
    let itemNumber = 0;
    document.querySelectorAll('.our-friends_item').forEach(item => {
      let template = '';
      item.id = petsCards[sixTimesArr[pageNumber - 1][itemNumber]].id;
      template += `<img src="${petsCards[sixTimesArr[pageNumber - 1][itemNumber]].img}" alt="pets-${petsCards[sixTimesArr[pageNumber - 1][itemNumber]].name}">`;
      template += `<p>${petsCards[sixTimesArr[pageNumber - 1][itemNumber]].name}</p>`;
      template += `<button>Learn more</button>`;
      itemNumber++;
      item.innerHTML = template;
    });
  } else if (innerWidth < 768 && innerWidth > 320) {
    let pageNumber = document.querySelector('.circle.full').innerText;
    let itemNumber = 0;
    document.querySelectorAll('.our-friends_item').forEach(item => {
      if (!item.classList.contains('invisible-on-tablet')) {
        let template = '';
        item.id = petsCards[bigArrayFortyEigth[((pageNumber * 6) - 6) + itemNumber]].id;
        template += `<img src="${petsCards[bigArrayFortyEigth[((pageNumber * 6) - 6) + itemNumber]].img}" alt="pets-${petsCards[bigArrayFortyEigth[((pageNumber * 6) - 6) + itemNumber]].name}">`;
        template += `<p>${petsCards[bigArrayFortyEigth[((pageNumber * 6) - 6) + itemNumber]].name}</p>`;
        template += `<button>Learn more</button>`;
        itemNumber++;
        item.innerHTML = template;
      }
    })
  } else if (innerWidth <= 320) {
    let pageNumber = document.querySelector('.circle.full').innerText;
    let itemNumber = 0;
    document.querySelectorAll('.our-friends_item').forEach(item => {
      if (!item.classList.contains('invisible-on-tablet') && !item.classList.contains('invisible-on-mobile')) {
        let template = '';
        item.id = petsCards[bigArrayFortyEigth[((pageNumber * 3) - 3) + itemNumber]].id;
        template += `<img src="${petsCards[bigArrayFortyEigth[((pageNumber * 3) - 3) + itemNumber]].img}" alt="pets-${petsCards[bigArrayFortyEigth[((pageNumber * 3) - 3) + itemNumber]].name}">`;
        template += `<p>${petsCards[bigArrayFortyEigth[((pageNumber * 3) - 3) + itemNumber]].name}</p>`;
        template += `<button>Learn more</button>`;
        itemNumber++;
        item.innerHTML = template;
      }
    })
  }
}

//Генерируем случайный массив

let randomNumber;

const generateRandomNumber = () => {
  randomNumber = Math.round(Math.random() * (petsCards.length - 1));
};

const generateArrayNumbers = () => {
  let randomNumbersArray = [];
  for (let i = 0; i < petsCards.length; i++) {
    generateRandomNumber();
    if(randomNumbersArray.length === 0) {
      randomNumbersArray.push(randomNumber);
    } else {
      if((randomNumbersArray.find((i) => i === randomNumber)) === undefined) {
        randomNumbersArray.push(randomNumber);
      } else {
        i--;
      }
    }
  }
  return randomNumbersArray;
}

let bigArrayFortyEigth = [];

function generateLongArray (arr) {
  bigArrayFortyEigth = bigArrayFortyEigth.concat(arr);
  for(let i = 0; i < 5; i++){
    let firstPart = arr.slice(0, 3);
    let secondPart = arr.slice(3, 6);
    let thirdPart = arr.slice(6, 8);
    let randomOneTwo = Math.floor(Math.random() * 2 + 1);
    arr = [];
    arr.push(firstPart[randomOneTwo]);
    firstPart.splice(randomOneTwo, 1);
    arr = arr.concat(firstPart);
    arr.push(secondPart[2]);
    secondPart.splice(2, 1);
    arr = arr.concat(secondPart);
    arr = arr.concat(thirdPart);
    bigArrayFortyEigth = bigArrayFortyEigth.concat(arr);
  }
}


//Создаем шесть случайных последовательностей и объединяем их в один массив

let sixTimesArr = [];

const getSixTimesArrayNumbers = () => {  
  for (let i = 0; i < 6; i++) {
    sixTimesArr.push(generateArrayNumbers());
  }
}

//Активирую кнопки и индикатор страницы

const BTN_NEXT = document.querySelector('.next-page');
const BTN_LAST = document.querySelector('.last-page');
const BTN_PREV = document.querySelector('.prev-page');
const BTN_FIRST = document.querySelector('.first-page');

BTN_NEXT.addEventListener('click', pushNextBtn);

function pushNextBtn () {
  let pageNumber = +document.querySelector('.circle.full').innerText;
  document.querySelector('.circle.full').innerText = pageNumber + 1;
  BTN_FIRST.addEventListener('click', pushFirstBtn);
  BTN_PREV.classList.add('active');
  BTN_FIRST.classList.add('active');
  BTN_PREV.classList.remove('disabled');
  BTN_FIRST.classList.remove('disabled');
  BTN_PREV.addEventListener('click', pushPrevBtn);
  if (innerWidth > 768) {
    if (pageNumber === sixTimesArr.length - 1) {
      BTN_NEXT.removeEventListener('click', pushNextBtn);
      BTN_LAST.removeEventListener('click', pushLastBtn);
      BTN_NEXT.classList.add('disabled');
      BTN_LAST.classList.add('disabled');
      BTN_NEXT.classList.remove('active');
      BTN_LAST.classList.remove('active');
    }
  } else if (innerWidth < 768 && innerWidth > 320) {
    if (pageNumber === (bigArrayFortyEigth.length / 6) - 1) {
      BTN_NEXT.removeEventListener('click', pushNextBtn);
      BTN_LAST.removeEventListener('click', pushLastBtn);
      BTN_NEXT.classList.add('disabled');
      BTN_LAST.classList.add('disabled');
      BTN_NEXT.classList.remove('active');
      BTN_LAST.classList.remove('active');
    }
  } else if (innerWidth <= 320) {
    if (pageNumber === (bigArrayFortyEigth.length / 3) - 1) {
      BTN_NEXT.removeEventListener('click', pushNextBtn);
      BTN_LAST.removeEventListener('click', pushLastBtn);
      BTN_NEXT.classList.add('disabled');
      BTN_LAST.classList.add('disabled');
      BTN_NEXT.classList.remove('active');
      BTN_LAST.classList.remove('active');
    }
  }
  generatePaginationPage(); 
}

BTN_LAST.addEventListener('click', pushLastBtn);

function pushLastBtn () {
  if(innerWidth > 768){
    document.querySelector('.circle.full').innerText = `${sixTimesArr.length}`;
  } else if (innerWidth < 768 && innerWidth > 320) {
    document.querySelector('.circle.full').innerText = `${bigArrayFortyEigth.length / 6}`;
  } else if (innerWidth <= 320) {
    document.querySelector('.circle.full').innerText = `${bigArrayFortyEigth.length / 3}`;
  }
  BTN_FIRST.addEventListener('click', pushFirstBtn);
  BTN_PREV.addEventListener('click', pushPrevBtn);
  BTN_LAST.removeEventListener('click', pushLastBtn);
  BTN_NEXT.removeEventListener('click', pushNextBtn);
  BTN_NEXT.classList.add('disabled');
  BTN_LAST.classList.add('disabled');
  BTN_NEXT.classList.remove('active');
  BTN_LAST.classList.remove('active');
  BTN_PREV.classList.add('active');
  BTN_FIRST.classList.add('active');
  BTN_PREV.classList.remove('disabled');
  BTN_FIRST.classList.remove('disabled');
  BTN_PREV.addEventListener('click', pushPrevBtn);
  generatePaginationPage();
}

function pushPrevBtn () {
  let pageNumber = +document.querySelector('.circle.full').innerText;
  document.querySelector('.circle.full').innerText = pageNumber - 1;
  BTN_NEXT.addEventListener('click', pushNextBtn);
  BTN_LAST.addEventListener('click', pushLastBtn);
  BTN_NEXT.classList.remove('disabled');
  BTN_LAST.classList.remove('disabled');
  BTN_NEXT.classList.add('active');
  BTN_LAST.classList.add('active');
  if (pageNumber === 2) {
    BTN_PREV.removeEventListener('click', pushPrevBtn);
    BTN_FIRST.removeEventListener('click', pushFirstBtn);
    BTN_PREV.classList.remove('active');
    BTN_FIRST.classList.remove('active');
    BTN_PREV.classList.add('disabled');
    BTN_FIRST.classList.add('disabled');
  }
  generatePaginationPage(); 
}

function pushFirstBtn () {
  document.querySelector('.circle.full').innerText = 1;
  BTN_FIRST.removeEventListener('click', pushFirstBtn);
  BTN_PREV.classList.remove('active');
  BTN_FIRST.classList.remove('active');
  BTN_PREV.classList.add('disabled');
  BTN_FIRST.classList.add('disabled');
  BTN_NEXT.classList.remove('disabled');
  BTN_LAST.classList.remove('disabled');
  BTN_NEXT.classList.add('active');
  BTN_LAST.classList.add('active');
  BTN_NEXT.addEventListener('click', pushNextBtn);
  BTN_LAST.addEventListener('click', pushLastBtn);
  BTN_PREV.removeEventListener('click', pushPrevBtn);
  generatePaginationPage(); 
}
