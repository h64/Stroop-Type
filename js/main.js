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
    gameBody.addEventListener("keypress", function() {

    });
};


/* Event Handlers */
document.addEventListener("DOMContentLoaded", function(evt) {
    if(DEBUG) console.log("DOM loaded");
    initGameVars();
    registerEventListeners();
});
