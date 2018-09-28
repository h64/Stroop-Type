"use strict"

/* Constants */
const NORMAL_GAME = "n";
const ENDLESS_GAME = "e";
const STROOP_GAME = "s";
const STATS_SCREEN = "m";

var gameCoordinator = (function() {
    var game = null;

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
                break;
        }
    }
    function endGame() {
        game.endGame();
        game = null;
    }
    
    function pipeKeyPressToGame(key) {
        if(game) game.processKeyPress(key);
    }
    function addToCompletionStat() {
        if(game) game.incrementWordCompletedCounter();
    }

    //presistent stats tracking

    return {
        startGame: startGame,
        endGame: endGame,
        handleKeyPress: pipeKeyPressToGame,
        addToCompletionStat: addToCompletionStat
    }
})();
  