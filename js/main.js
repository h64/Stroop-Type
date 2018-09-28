"use strict"
var main = (function() {
    /* Local Variables */
    var menuIsListening = true;

    /* DOM and File references */
    var header = null;
    var nav = null;
    
    /* Functions */
    function toggleMenuVisibility() {
        nav.style.display = nav.style.display === "none" ? "block" : "none";
        header.style.display = header.style.display === "none" ? "block" : "none";
        toggleListening();
    }
    function toggleListening() {
        menuIsListening = !menuIsListening;
    }
    function pipeKeyPressToCoordinator(key) {
        gameCoordinator.handleKeyPress(key);
    }
    
    /* Event Handlers */
    document.addEventListener("DOMContentLoaded", function(evt) {
        header = document.querySelector("header");
        nav = document.querySelector("nav");
        screenHelper.init();
        registerEventListeners();
    });

    function registerEventListeners() {
        nav.addEventListener("click", (evt) => {
            if(!menuIsListening || evt.target === nav) return;
            toggleMenuVisibility();
            let gameType = evt.target.id;
            gameCoordinator.startGame(gameType);
        });
        document.addEventListener("keypress", (evt) => {
            let key = inputSanitizer.strictToLowerCase(evt.key);
            if(key === null) return;
            if(menuIsListening) {
                if(key == "n" || key == "e" || key == "s" || key == "m") {
                    toggleMenuVisibility();
                    let gameType = key;
                    gameCoordinator.startGame(gameType);
                }
            } else {
                pipeKeyPressToCoordinator(key);
            }
        });
        document.addEventListener("gameover", () => {
            gameCoordinator.endGame();
        });
        document.addEventListener("wordcomplete", () => {
            gameCoordinator.addToCompletionStat();
        });
    }
    return {
        showMenu: toggleMenuVisibility
    }

})();
