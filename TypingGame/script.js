const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-conatiner');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//list of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

//init word
let randomWord;
//init score
let score = 0;
//init time
let time = 10;
//set difficulty to value in storage or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
difficultySelect.value = difficulty;

//focus on text on start
text.focus();

const updateTime = () => {
    time--;
    timeEl.innerHTML = `${time}s`;
    if (time === 0) {
        clearInterval(timeInterval);
        //end game
        gameOver();
    }
}

//start counting down
const timeInterval = setInterval(updateTime, 1000);

//generate random word from arrray
const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
}

//add word to dom
const addWordToDOM = () => {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//update score
const updateScore = () => {
    score++;
    scoreEl.innerHTML = score;
}

//game over, show end screen
const gameOver = () => {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

//event listners
//typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        //clear text
        text.value = '';
        switch (difficulty) {
            case 'easy': time += 5;
                break;
            case 'meduim': time += 3;
                break;
            case 'hard': time += 2;
                break;
            default: time;
        }
        updateTime();
    }
});

//settings btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

//settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});