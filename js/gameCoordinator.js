"use strict"

/* Constants */
const NORMAL_GAME = "n";
const ENDLESS_GAME = "e";
const STROOP_GAME = "s";
const STATS_SCREEN = "m";

var gameCoordinator = (function() {
    /* Explicit file redefinitions */
    // wordManager = window.wordManager; //wordManager.js
    // gameWordFactory = window.gameWordFactory; //gameWordFactory.js
    
    /* Local Variables */
    var game = null;

    /* Dom Element References */


    /* Functions */
    function startGame(gameType) {
        switch(gameType) {
            case NORMAL_GAME:
                game = new Game();
                break;
            case ENDLESS_GAME:
                game = new EndlessGame();
                break;
            case STROOP_GAME:
                game = new StroopGame();
                break;
            case STATS_SCREEN:
                //load stats screen
                break;
        }
    }
    function endGame() {
        //game.die() remove self from existence
        game = null;
        main.showMenu();
    }
    
    function pipeKeyPressToGame(key) {
        game.processKeyPress(key);
    }

    //presistent stats tracking

    return {
        startGame: startGame,
        endGame: endGame,
        handleKeyPress: pipeKeyPressToGame
    }
})();
  