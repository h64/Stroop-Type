"use strict"

/* DOM and File references */
var nav = {};
var normalGameStartBtn = {};
var stroopGameStartBtn = {};
var myStatsBtn = {};

var gameCoordinator = gameCoordinator; //gameCoordinator.js

/* Functions */
function initDomRefs() {
    nav = document.querySelector("nav");
    normalGameStartBtn = document.querySelector("#normalGameBtn");
    stroopGameStartBtn = document.querySelector("#stroopGameBtn");
    myStatsBtn = document.querySelector("#myStatsBtn");
}

function clearScreen() {
    nav.style.display = "none";
}

/* Event Handlers */
document.addEventListener("DOMContentLoaded", function(evt) {
    initDomRefs();
    registerEventListeners();
});

function registerEventListeners() {
    normalGameStartBtn.addEventListener("click", function() {
        clearScreen();
        gameCoordinator.startGame();
    });
    stroopGameStartBtn.addEventListener("click", function() {
        //load stroop game
        clearScreen();
    });
    myStatsBtn.addEventListener("click", function() {
        //load my stats page
    });
}
