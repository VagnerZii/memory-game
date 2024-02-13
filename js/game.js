const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const characters = [
    'dogao',
    'flowey',
    'frisk',
    'mettaton',
    'muffet',
    'napstablook',
    'papyrus',
    'sans',
    'toriel',
    'undyne',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === 20) {
        clearInterval(this.loop);
        alert(`Muito bem, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.querySelector('.disable-front').classList.add('disable-card');   
        secondCard.querySelector('.disable-front').classList.add('disable-card'); 

        checkEndGame();

        firstCard = '';
        secondCard = '';

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }
}


const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } 
    else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front disable-front'); 
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${character}.png')`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}


const loadGame = () => {
    const duplicateCharacters = [  ...characters,  ...characters];

    const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffleArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime +1
    }, 1000)
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
}