const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letter-container');
const buttonEl = document.getElementById('play-button');
const popupEl = document.getElementById('popup-container');
const hangmanPartsEl = document.querySelectorAll('.figure-part');
const finalMessage = document.getElementById('final-message');
const notificationEl = document.getElementById('notification-container');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');


let countries = ["belgia", "czechy", "francja", "dania", "holandia", "polska", "hiszpania", "niemcy", "rosja", "portugalia"];

let selectedWord = countries[Math.floor(Math.random() * countries.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(
            letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
        )
        .join('')}
  `;

    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

    if (innerWord === selectedWord.toUpperCase()) {
        finalMessage.innerText = 'THANK YOU FOR PLAYING';
        popupEl.style.display = 'flex';
    }
}

displayWord();

function updateWrongLettersEl() {
    wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>YOU MISSED:</p>' : ''}
    ${wrongLetters.map(letter => `<span class="font-mobile" style="color:#5481eb">${letter}</span>`)}
     `;

    hangmanPartsEl.forEach((part, index) => {
        const error = wrongLetters.length;

        if (index < error) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length === hangmanPartsEl.length) {
        finalMessage.innerText = 'GAME OVER';
        // finalMessageRevealWord.innerText = `The word was: ${selectedWord}`;
        popupEl.style.display = 'flex';
    }
}

function showNotification() {
    notificationEl.classList.add('show');

    setTimeout(() => {
        notificationEl.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                ;

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
})

buttonEl.addEventListener('click', () => {

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = countries[Math.floor(Math.random() * countries.length)];

    displayWord();
    updateWrongLettersEl();

    popupEl.style.display = 'none';
})
displayWord();