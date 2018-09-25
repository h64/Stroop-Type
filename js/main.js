"use strict"
/* Constants */
const DEBUG = true;

/* App Variables */
var gameBody = {};
var gameWords = [];

var wordList = ["cat", "dog", "javascript"];



/* Functions */
function initGameVars() {
    gameBody = document.querySelector("main");
};
function registerEventListeners() {
    document.addEventListener("gameover", function(evt) {
        console.log("Your base is destroyed! Game over");
    });
    document.addEventListener("keypress", function(evt) {
        inputHandler.input(evt.key)
    });
};

function makeAGameWord() {
    let randIdx = Math.floor(Math.random() * wordList.length);
    let gameWord = gameWordFactory.makeWord(wordList[randIdx]);

    gameBody.prepend(gameWord.domElement);
    gameWords.push(gameWord);



    
}



/* Event Handlers */
document.addEventListener("DOMContentLoaded", function(evt) {
    if(DEBUG) console.log("DOM loaded");
    initGameVars();
    registerEventListeners();
});
