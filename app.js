// Array of Words
let words = [
    'important',
    'to',
    'that',
    'does',
    'not',
    'have',
    'minimum',
    'or',
    'maximum',
    'number',
    'of',
    'sentences',
    'it',
    'must',
    'fit',
    'the',
    'definition',
    'paragraph'
];

const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2,
    "Pro": 1
}

// Default lvls
let defaultLevel = "Normal";
let defaultLevelTime = lvls[defaultLevel]

// Catch Selectors
let startButton = document.querySelector('.start');
let lvlNameSpan = document.querySelector('.message .lvl');
let secondSpan = document.querySelector('.message .seconds');
let theWord = document.querySelector('.the-word');
let upcomingWords = document.querySelector('.upcoming-words');
let input = document.querySelector('.input');
let timeLeftSpan = document.querySelector('.time span');
let scoreGot = document.querySelector('.score .got ');
let scoreTotals = document.querySelector('.score .total');
let finishMessage = document.querySelector('.finish');
var select = document.getElementById('lvl-select');

select.onchange = function() {
    var value = select.options[select.selectedIndex].value;
    defaultLevel = value;
    defaultLevelTime = lvls[defaultLevel];
    secondSpan.innerHTML = defaultLevelTime;
    timeLeftSpan.innerHTML = defaultLevelTime;
    scoreTotals.innerHTML = words.length;
}

// Setting Level Name + Seconds + score 
// lvlNameSpan.innerHTML = defaultLevel;


// disable paste Event 
input.onpaste = function() {
    return false;
}
startButton.onclick = function() {
    this.remove();
    input.focus();
    generateWord();
};

// Generate Word function
function generateWord() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //get Word Index ;
    let wordIndex = words.indexOf(randomWord);
    // remove word from array ;
    words.splice(wordIndex, 1);
    // show the random word
    theWord.innerHTML = randomWord;
    // Empty upcomingWords
    upcomingWords.innerHTML = '';
    // Generate word 
    for (let i = 0; i < words.length; i++) {
        //create div element
        let div = document.createElement('div');
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);

    }
    // call Start play function 
    startPlay();
}

function startPlay() {
    input.value = '';
    timeLeftSpan.innerHTML = defaultLevelTime;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;

        if (timeLeftSpan.innerHTML == 0) {
            //stop Timer
            clearInterval(start);
            //compare Word ;
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                //Empty input Feild 
                input.value = '';
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    generateWord();
                } else {
                    let span = document.createElement('span')
                    span.className = 'good';
                    let spanText = document.createTextNode('congregate')
                    span.appendChild(spanText);
                    finishMessage.appendChild(span)
                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement('span')
                span.className = 'bad';
                let spanText = document.createTextNode('Game Over')
                span.appendChild(spanText);
                finishMessage.appendChild(span)
            }
        }

    }, 1000)
}