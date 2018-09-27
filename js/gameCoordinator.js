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
    var domReferences = {
        navEl: {},
        roundSummaryEl: {},
        roundMsgEl: {},
        gameOverMsgEl: {}
    };

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
    return {
        start: startGame
    }
})();
    
    // function init() {
    //     /* Setup Functions */
    //     inputSanitizer.unregisterListeners();
    //     inputSanitizer.registerListeners();
    //     initDomRefs();
    //     initVariables();
    //     screenHelper.clearScreen();
    //     wordManager.init();
    //     unregisterEventListeners();
    //     registerEventListeners();

    //     function initDomRefs() {
    //         gameBodyEl = document.querySelector("main");
    //         navEl = document.querySelector("nav");
    //         roundSummaryEl = document.querySelector("#roundSummary");
    //         roundMsgEl = document.querySelector("#roundMsg");
    //         gameOverMsgEl = document.querySelector("#gameOverMsg");
    //     }
    //     function initVariables() {
    //         spawnerID = null;
    //         numWordsSpawned = 0;
    //         wordsToSpawn = 0;
    //         // wordsDeletedInRound = 0;
    //         gameMode = null;
    //         gameOver = false;
    //         timeStart = null;
    //         timeAccumulated = null;
    //         stats = {
    //             currentRound: 0,
    //             accuracy: 0,
    //             keyPresses: 0,
    //             keyMatches: 0,
    //         };      
    //     }
    //     function wordlistemptyEvt() {
    //         console.log("wl empty");
            
    //         roundHelper.endRound();
    //     }
    //     function gameoverEvt() {
    //         if(!gameOver) { //prevents multiple gameover evts from being listened to
    //             console.log("evt gameover");
    //             wordManager.stopAnimations();
    //             gameOver = true;
    //             roundHelper.endRound();
    //         }
    //     }
    //     function keypressEvt(evt) {
    //         wordManager.handleInput(evt.key);
    //     }
    //     function registerEventListeners() {
    //         console.log("registering evt listeners");
    //         document.addEventListener("wordlistempty", wordlistemptyEvt);
    //         document.addEventListener("gameover", gameoverEvt);
    //         document.addEventListener("safeKeyPress", keypressEvt);
    //     }
    //     function unregisterEventListeners() {
    //         document.addEventListener("wordlistempty", wordlistemptyEvt);
    //         document.removeEventListener("gameover", gameoverEvt);
    //         document.removeEventListener("safeKeyPress", keypressEvt);
    //     }
    // }


    // /* GameWord Spawning Functions */
    
    
    // /* Game/round State Management Functions */
    // var roundHelper = {
    //     startRound: function() {
    //         numWordsSpawned = 0;
    //         // wordsDeletedInRound = 0;
    //         spawner.startSpawner(wordsToSpawn);
    //     },
    //     endRound: function() {
    //         stats.currentRound++;
    //         spawner.stopSpawner();
    //         wordManager.clearAll();
    //         wordsToSpawn++;
    //         updateStats();
    //         screenHelper.flashVisibility(roundSummaryEl, LONG_DELAY, () => {
    //             if(gameOver) {
    //                 screenHelper.flashVisibility(gameOverMsgEl, LONG_DELAY, () => {
    //                     roundHelper.endGame();
    //                 });
    //             } else if(gameMode !== ENDLESS_GAME) {
    //                 screenHelper.flashVisibility(roundMsgEl, SHORT_DELAY, () => {
    //                     roundHelper.startRound();
    //                 });
    //             }
    //         });
    //     },
    //     endGame: function() {
    //         // console.log("WE ARE IN THE ENDGAME FUNCTION...");
    //         gameOver = true;
    //         spawner.stopSpawner();
    //         // listeners.removeEventListeners();
    //         gameMode = null;
    //         // updateStats();
    //         screenHelper.toggleVisibility(navEl);
    //         // screenHelper.flashVisibility(navEl, LONG_DELAY, () => {
    //         game.mainMenu();
    //     }   
    // };

    // /* Display Functions */
    // var screenHelper = {
    //     flashVisibility: function(element, persistLength, additionalCb) {
    //         setTimeout(() => {
    //             this.toggleVisibility(element);
    //             setTimeout(() => {
    //                 this.toggleVisibility(element);
    //                 if(additionalCb) {
    //                     // console.log("AFTER THE TIMEOUTS...");
    //                     additionalCb();
    //                 }
    //             }, persistLength);
    //         }, SHORT_DELAY);
    //     },
    //     toggleVisibility: function(element) {
    //         element.classList.toggle("hidden");
    //     },
    //     clearScreen: function() {
    //         this.toggleVisibility(navEl);
    //     }
    // };

    // function updateStats() {
    //     stats.keyPresses = Number(wordManager.getKeyPresses());
    //     stats.keyMatches = Number(wordManager.getKeyMatches());
    //     console.log(stats);
    //     updateRoundSummaryEl();
    // }
 
    // function updateRoundSummaryEl() {
    //     let spanList = [];
    //     for(let i = 0; i < roundSummaryEl.children.length; i++) {
    //         spanList.push(roundSummaryEl.children[i].children[0]);
    //     }
    //     spanList[0].textContent = stats.currentRound; //current round
    //     spanList[1].textContent = 0; //overall wpm
    //     spanList[2].textContent = 0; //round wpm
    //     spanList[3].textContent = Number(stats.keyPresses-stats.keyMatches); //missed keys this round
    //     spanList[4].textContent = parseFloat(stats.keyMatches/stats.keyPresses); //total error %

    // }
    // return {
    //     start: startGame,
    //     endRound: roundHelper.endRound
    // };
