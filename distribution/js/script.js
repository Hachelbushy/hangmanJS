const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letter-container');
const playBtnEl = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const hangmanPartsEl = document.querySelectorAll('.figure-part');
const finalMessage = document.getElementById('final-message');
const notificationEl = document.getElementById('notification-container');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');


let words = ["belgia", "czechy", "francja", "dania", "holandia", "polska", "hiszpania", "niemcy", "rosja", "portugalia"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

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
        popup.style.display = 'flex';
    }
}

displayWord();

function updateWrongLettersEl() {
    wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>YOU MISSED:</p>' : ''}
    ${wrongLetters.map(letter => `<span style="font-size: 40px; color:#5481eb">${letter}</span>`)}
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
        finalMessageRevealWord.innerText = `The word was: ${selectedWord}`;
        popup.style.display = 'flex';
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
        // for (let i = 0; i < correctLetters.length; i++){
        //     if (correctLetters[i] === this.value.toLowerCase()){
        //
        //     }
        // }
    }
})

playBtnEl.addEventListener('click', () => {

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();

    popup.style.display = 'none';
})
displayWord();