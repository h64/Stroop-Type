"use strict"
/* Constants */
var NORMAL_GAME = "normal";
var ENDLESS_GAME = "endless";
var STROOP_GAME = "stroop";
var STATS_SCREEN = "stats";

var game = (function() {
    /* Explicit file redefinitions */
    gameCoordinator = window.gameCoordinator; //gameCoordinator.js
    inputHandler = window.inputHandler; //inputHandler.js

    

    /* Local Variables */
    var isListening = false;

    /* DOM and File references */
    var normalGameStartBtn = {};
    var stroopGameStartBtn = {};
    var endlessGameStartBtn = {};
    var myStatsBtn = {};

    /* Functions */
    function initDomRefs() {
        // nav = document.querySelector("nav");
        normalGameStartBtn = document.querySelector("#normalGameBtn");
        stroopGameStartBtn = document.querySelector("#stroopGameBtn")
        endlessGameStartBtn = document.querySelector("#endlessGameBtn");
        myStatsBtn = document.querySelector("#myStatsBtn");
    }

    /* Event Handlers */
    document.addEventListener("DOMContentLoaded", function(evt) {
        initDomRefs();
        registerEventListeners();
    });

    function enableListening() {
        isListening = true;
    }

    function registerEventListeners() {
        inputHandler.registerListener(); 
        listenForShortcutKey();
        listenForClick();
    }

    function listenForShortcutKey() {
        document.addEventListener("safeKeyPress", startGameByShortcut);
        isListening = true;
        function startGameByShortcut(evt) {
            if(!isListening) return;
            switch(evt.key) {
                case "n": 
                    isListening = false;
                    gameCoordinator.load(NORMAL_GAME);
                    break;
                case "e": 
                    isListening = false;
                    gameCoordinator.load(ENDLESS_GAME);
                    break;
                case "s": 
                    isListening = false;
                    gameCoordinator.load(STROOP_GAME);
                    break;
                case "m": 
                    isListening = false;
                    gameCoordinator.load(STATS_SCREEN);
                    break;
                default:
                    break;
            }
        } 
    }

    function listenForClick() {
        normalGameStartBtn.addEventListener("click", function() {
            isListening = false;
            gameCoordinator.load(NORMAL_GAME);
        });
        endlessGameStartBtn.addEventListener("click", function() {
            isListening = false;
            gameCoordinator.load(ENDLESS_GAME);
        });
        stroopGameStartBtn.addEventListener("click", function() {
            isListening = false;
            gameCoordinator.load(STROOP_GAME);
        });
        myStatsBtn.addEventListener("click", function() {
            isListening = false;
            gameCoordinator.load(STATS_SCREEN);
        });
    }
    return {
        mainMenu: enableListening
    }

})();
