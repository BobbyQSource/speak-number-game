const msgEl = document.getElementById('msg');

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log('Number:', randomNum);

// Set up speech recognition
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture what the user says
function onSpeak(event) {
  const msg = event.results[0][0].transcript;
  console.log(msg);
  writeMessage(msg);

  if (msg.toLowerCase().includes('dad joke')) {
  const joke = "What's brown and sticky? A stick.";

  const question = new SpeechSynthesisUtterance("What's brown and sticky?");
  const answer = new SpeechSynthesisUtterance("A stick!");

  question.onend = function() {
    setTimeout(function() {
      window.speechSynthesis.speak(answer);
    }, 1000);
  };

  window.speechSynthesis.speak(question);

  const div = document.createElement('div');
  div.textContent = joke;
  msgEl.append(div);

} else {

  checkNumber(msg);
}
}

// Listen for speech
recognition.addEventListener('result', onSpeak);

// Displays what user say
function writeMessage(msg) {
  msgEl.innerHTML = '';

  const div = document.createElement('div');
  div.textContent = 'You said: ';

  const span = document.createElement('span');
  span.classList.add('box');
  span.textContent = msg;

  msgEl.append(div, span);
}

function checkNumber(msg) {
  const wordToNumber = {
    one: 1,
    won: 1,
    two: 2,
    to: 2,
    too: 2,
    three: 3,
    four: 4,
    for: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    ate: 8,
    nine: 9,
    ten: 10
  };

  msg = msg.toLowerCase().trim();

  if (wordToNumber[msg]) {
    msg = wordToNumber[msg];
  }

  const num = Number(msg);
  const div = document.createElement('div');

  if (Number.isNaN(num) || msg === '') {
    div.textContent = 'That is not a valid number';
  } else if (num < 1 || num > 100) {
    div.textContent = 'Number must be between 1 and 100';
  } else if (num === randomNum) {
    div.textContent = `Congrats! You guessed the number! It was ${num}`;
    msgEl.append(div);

    const button = document.createElement('button');
    button.textContent = 'Play Again';
    button.classList.add('play-again');
    button.addEventListener('click', () => location.reload());
    msgEl.append(button);
    return;
  } else if (num > randomNum) {
    div.textContent = 'GO LOWER';
  } else {
    div.textContent = 'GO HIGHER';
  }

  msgEl.append(div);
}

// Restart mic after guesses
recognition.addEventListener('end', () => {
  recognition.start();
});