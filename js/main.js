"use strict"

var game = (function() {
    /* Explicit file redefinitions */
    gameCoordinator = window.gameCoordinator; //gameCoordinator.js
    inputSanitizer = window.inputSanitizer; //inputHandler.js

    /* Local Variables */
    var isListening = true;

    /* DOM and File references */
    var header = null;
    var nav = null;
    

    /* Functions */
    function toggleListening() {
        isListening = !isListening;
    }
    function toggleMenuVisibility() {
        nav.style.display = nav.style.display === "none" ? "block" : "none";
        header.style.display = header.style.display === "none" ? "block" : "none";
    }
    
    /* Event Handlers */
    document.addEventListener("DOMContentLoaded", function(evt) {
        header = document.querySelector("header");
        nav = document.querySelector("nav");
        registerEventListeners();
    });

    function registerEventListeners() {
        nav.addEventListener("click", (evt) => {
            if(!isListening || evt.target === nav) return;
            toggleListening();
            toggleMenuVisibility();
            let gameType = evt.target.id;
            gameCoordinator.start(gameType);
        });
        document.addEventListener("keypress", (evt) => {
            if(!isListening) return;
            let key = inputSanitizer.strictToLowerCase(evt.key);
            if(key !== null) {
                if(key == "n" || key == "e" || key == "s" || key == "m") {
                    toggleListening(); 
                    toggleMenuVisibility();
                    let gameType = key;
                    gameCoordinator.start(gameType);
                }
            }
        });
    }
})();
