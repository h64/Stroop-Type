"use strict"


var gameCoordinator = (function() {
    //redefining file vars for explicitness/readability
    wordManager = window.wordManager; //wordManager.js
    gameWordFactory = window.gameWordFactory; //gameWordFactory.js

    const STARTING_NUM_WORDS = 10;
    const SPAWN_INTERVAL = 500;
    const SHORT_DELAY = 700;
    const LONG_DELAY = 2000;
    const WORD_LIST = ["form","slave","cannon","fireman","carpenter","voyage","needle","card","act","wind","music","crack","transport","plough","mountain","band","peace","wire","animal","secretary","queen","clocks","liquid","flesh","rake","lumber","jellyfish","houses","snails","afternoon","jewel","stage","club","grip","vessel","sofa","attack","insurance","cloth","bean","lizards","dog","birth","quiver","box","kettle","wing","bean","bell","farm"];
    
    /* Local Variables */
    var spawnerID = null;
    var numWordsSpawned = 0;
    var wordsToSpawn = 0;
    var wordsDeletedInRound = 0;
    var currentRound = 0;
    var gameMode = null;

    // var isListening = false;

    /* Dom Element References */
    var gameBodyEl = {}; 
    var navEl = {};
    var roundSummaryEl = {};
    var roundMsgEl = {};
    var gameOverMsgEl = {};

    function startGame(gameType) {
        gameMode = gameType;
        switch(gameType) {
            case NORMAL_GAME:
                init();
                // wordsToSpawn = STARTING_NUM_WORDS;
                wordsToSpawn = 1;
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
        registerEventListeners();
        initDomRefs();
        screenHelper.clearScreen();
        function initDomRefs() {
            gameBodyEl = document.querySelector("main");
            navEl = document.querySelector("nav");
            roundSummaryEl = document.querySelector("#roundSummary");
            roundMsgEl = document.querySelector("#roundMsg");
            gameOverMsgEl = document.querySelector("#gameOverMsg");
        }
        /* Event Listeners */
        function registerEventListeners() {
            document.addEventListener("worddeleted", function(evt) {
                wordsDeletedInRound++;
                if(wordsDeletedInRound === wordsToSpawn) {
                    roundHelper.endRound();
                }
            });
            document.addEventListener("gameover", function(evt) {
                wordManager.stopAnimations();
                roundHelper.endGame();
                console.log("Your base is destroyed! Game over");
            });
            document.addEventListener("safeKeyPress", function(evt) {
                wordManager.handleInput(evt.key);
            });
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
    /* Display Functions */
    var screenHelper = {
        flashVisibility: function(element, persistLength, additionalCb) {
            setTimeout(() => {
                this.toggleVisibility(element);
                setTimeout(() => {
                    this.toggleVisibility(element);
                    if(additionalCb) additionalCb();
                }, persistLength);
            }, SHORT_DELAY);
        },
        displayRoundTitle: function() {
            wordManager.clearAll();
            this.flashVisibility(roundSummaryEl, LONG_DELAY, () => {
                this.flashVisibility(roundMsgEl, SHORT_DELAY, () => {
                    if(gameMode !== ENDLESS_GAME) roundHelper.startRound();
                });
            });
        },
        toggleVisibility: function(element) {
            element.classList.toggle("hidden");
        },
        clearScreen: function() {
            this.toggleVisibility(navEl);
        }
    };
    
    /* Game/round State Management Functions */
    var roundHelper = {
        startRound: function() {
            numWordsSpawned = 0;
            wordsDeletedInRound = 0;
            currentRound++;
            // displayRoundTitle();
            spawner.startSpawner(wordsToSpawn);
        },
        endRound: function() {
            wordManager.clearAll();
            wordsToSpawn++;
            screenHelper.displayRoundTitle();
        },
        endGame: function() {
            numWordsSpawned = 0;
            wordsToSpawn = 0;
            // wordsDeletedInRound = 0;
            currentRound = 0;
            wordManager.clearAll();
            spawner.stopSpawner();
            screenHelper.flashVisibility(gameOverMsgEl, LONG_DELAY, () => {
                screenHelper.flashVisibility(roundSummaryEl, LONG_DELAY);
            });
        }   
    };
 
    return {
        load: startGame
    };
})();