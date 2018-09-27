"use strict"


var gameCoordinator = (function() {
    //redefining file vars for explicitness/readability
    wordManager = window.wordManager; //wordManager.js
    gameWordFactory = window.gameWordFactory; //gameWordFactory.js

    const STARTING_NUM_WORDS = 5;
    const SPAWN_INTERVAL = 700;
    const SHORT_DELAY = 700;
    const LONG_DELAY = 2000;
    const WORD_LIST = ["form","slave","cannon","fireman","carpenter","voyage","needle","card","act","wind","music","crack","transport","plough","mountain","band","peace","wire","animal","secretary","queen","clocks","liquid","flesh","rake","lumber","jellyfish","houses","snails","afternoon","jewel","stage","club","grip","vessel","sofa","attack","insurance","cloth","bean","lizards","dog","birth","quiver","box","kettle","wing","bean","bell","farm"];
    
    /* Local Variables */
    var spawnerID = null;
    var numWordsSpawned = 0;
    var wordsToSpawn = 0;
    // var wordsDeletedInRound = 0;
    var gameMode = null;
    var gameOver = false;

    var timeStart = null;
    var timeAccumulated = null;
    
    var stats = {
        currentRound: 0,
        accuracy: 0,
        keyPresses: 0,
        keyMatches: 0,
    };


    /* Dom Element References */
    var gameBodyEl = {}; 
    var navEl = {};
    var roundSummaryEl = {};
    var roundMsgEl = {};
    var gameOverMsgEl = {};

    function startGame(gameType) {
        gameMode = gameType;
        gameOver = false;
        switch(gameType) {
            case NORMAL_GAME:
                init();
                // wordsToSpawn = STARTING_NUM_WORDS;
                wordsToSpawn = 1;
                console.log(stats);
                roundHelper.startRound();
                break;
            case ENDLESS_GAME:
                init();
                wordsToSpawn = Number.MAX_SAFE_INTEGER-1;
                roundHelper.startRound();
                break;
            case STROOP_GAME:
                // init();
                // let wordsToSpawn = STARTING_WORDS;
                // startRound();
                break;
            case STATS_SCREEN:
                init();
                break;
            default:
                gameMode = null;
                break;
        }  
    }
    function init() {
        /* Setup Functions */
        inputHandler.unregisterListeners();
        inputHandler.registerListeners();
        initDomRefs();
        initVariables();
        screenHelper.clearScreen();
        wordManager.init();
        unregisterEventListeners();
        registerEventListeners();

        function initDomRefs() {
            gameBodyEl = document.querySelector("main");
            navEl = document.querySelector("nav");
            roundSummaryEl = document.querySelector("#roundSummary");
            roundMsgEl = document.querySelector("#roundMsg");
            gameOverMsgEl = document.querySelector("#gameOverMsg");
        }
        function initVariables() {
            spawnerID = null;
            numWordsSpawned = 0;
            wordsToSpawn = 0;
            // wordsDeletedInRound = 0;
            gameMode = null;
            gameOver = false;
            timeStart = null;
            timeAccumulated = null;
            stats = {
                currentRound: 0,
                accuracy: 0,
                keyPresses: 0,
                keyMatches: 0,
            };      
        }
        function wordlistemptyEvt() {
            console.log("wl empty");
            
            roundHelper.endRound();
        }
        function gameoverEvt() {
            if(!gameOver) { //prevents multiple gameover evts from being listened to
                console.log("evt gameover");
                wordManager.stopAnimations();
                gameOver = true;
                roundHelper.endRound();
            }
        }
        function keypressEvt(evt) {
            wordManager.handleInput(evt.key);
        }
        function registerEventListeners() {
            console.log("registering evt listeners");
            document.addEventListener("wordlistempty", wordlistemptyEvt);
            document.addEventListener("gameover", gameoverEvt);
            document.addEventListener("safeKeyPress", keypressEvt);
        }
        function unregisterEventListeners() {
            document.addEventListener("wordlistempty", wordlistemptyEvt);
            document.removeEventListener("gameover", gameoverEvt);
            document.removeEventListener("safeKeyPress", keypressEvt);
        }
    }


    /* GameWord Spawning Functions */
    var spawner = {
        startSpawner: function(numWordsToSpawn) {
            spawnerID = setInterval(() => {
                let randIdx = Math.floor(Math.random() * WORD_LIST.length);
                let gameWord = gameWordFactory.makeWord(WORD_LIST[randIdx]);
                wordManager.addWord(gameWord);
                gameBodyEl.prepend(gameWord.domElementRef); 
                if(++numWordsSpawned === numWordsToSpawn) this.stopSpawner();
            }, SPAWN_INTERVAL);
        },
        stopSpawner: function() {
            clearInterval(spawnerID);
            spawnerID = null;      
        }
    };
    
    /* Game/round State Management Functions */
    var roundHelper = {
        startRound: function() {
            numWordsSpawned = 0;
            // wordsDeletedInRound = 0;
            spawner.startSpawner(wordsToSpawn);
        },
        endRound: function() {
            stats.currentRound++;
            spawner.stopSpawner();
            wordManager.clearAll();
            wordsToSpawn++;
            updateStats();
            screenHelper.flashVisibility(roundSummaryEl, LONG_DELAY, () => {
                if(gameOver) {
                    screenHelper.flashVisibility(gameOverMsgEl, LONG_DELAY, () => {
                        roundHelper.endGame();
                    });
                } else if(gameMode !== ENDLESS_GAME) {
                    screenHelper.flashVisibility(roundMsgEl, SHORT_DELAY, () => {
                        roundHelper.startRound();
                    });
                }
            });
        },
        endGame: function() {
            // console.log("WE ARE IN THE ENDGAME FUNCTION...");
            gameOver = true;
            spawner.stopSpawner();
            // listeners.removeEventListeners();
            gameMode = null;
            // updateStats();
            screenHelper.toggleVisibility(navEl);
            // screenHelper.flashVisibility(navEl, LONG_DELAY, () => {
            game.mainMenu();
        }   
    };

    /* Display Functions */
    var screenHelper = {
        flashVisibility: function(element, persistLength, additionalCb) {
            setTimeout(() => {
                this.toggleVisibility(element);
                setTimeout(() => {
                    this.toggleVisibility(element);
                    if(additionalCb) {
                        // console.log("AFTER THE TIMEOUTS...");
                        additionalCb();
                    }
                }, persistLength);
            }, SHORT_DELAY);
        },
        toggleVisibility: function(element) {
            element.classList.toggle("hidden");
        },
        clearScreen: function() {
            this.toggleVisibility(navEl);
        }
    };

    function updateStats() {
        stats.keyPresses = Number(wordManager.getKeyPresses());
        stats.keyMatches = Number(wordManager.getKeyMatches());
        console.log(stats);
        updateRoundSummaryEl();
    }
 
    function updateRoundSummaryEl() {
        let spanList = [];
        for(let i = 0; i < roundSummaryEl.children.length; i++) {
            spanList.push(roundSummaryEl.children[i].children[0]);
        }
        spanList[0].textContent = stats.currentRound; //current round
        spanList[1].textContent = 0; //overall wpm
        spanList[2].textContent = 0; //round wpm
        spanList[3].textContent = Number(stats.keyPresses-stats.keyMatches); //missed keys this round
        spanList[4].textContent = parseFloat(stats.keyMatches/stats.keyPresses); //total error %

    }
    return {
        load: startGame,
        endRound: roundHelper.endRound
    };
})();