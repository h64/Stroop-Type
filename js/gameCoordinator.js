"use strict"
const STARTING_WORDS = 10;
const SPAWN_INTERVAL = 500;
const SPAWNER_NAME = "spawn";

var wordManager = wordManager; //wordManager.js
var wordFactory = gameWordFactory; //gameWordFactory.js
var wordList = ["form","slave","cannon","fireman","carpenter","voyage","needle","card","act","wind","music","crack","transport","plough","mountain","band","peace","wire","animal","secretary","queen","clocks","liquid","flesh","rake","lumber","jellyfish","houses","snails","afternoon","jewel","stage","club","grip","vessel","sofa","attack","insurance","cloth","bean","lizards","dog","birth","quiver","box","kettle","wing","bean","bell","farm"];
var gameBody = {}; //holds the dom elements


var gameCoordinator = (function() {
    var numWordsSpawned = 0;
    var spawnerID = null;

    function loadNormalGame() {
        initializeGame();
        console.log("load normal game");
        let wordsToSpawn = STARTING_WORDS;
        // startRound(wordsToSpawn);
    }
    function loadEndlessGame() {
        initializeGame();
        console.log("load endless game");
        let wordsToSpawn = Number.MAX_SAFE_INTEGER;
        console.log(wordsToSpawn);
        // startRound(wordsToSpawn);

    }
    function loadStroopGame() {
        console.log("load stroop game");
        initializeGame();

    }
    function loadStatsScreen() {
        console.log("load stats game");
        initializeGame();

    }

    //make any children of gamebody invisible
    function clearScreen() {
        console.dir(gameBody);
    }
    

    function startRound(numWordsToSpawn) {
        numWordsSpawned = 0;
        startSpawner(numWordsToSpawn);

    }

    function endRound() {
        stopSpawner();
        numWordsSpawned = 0;
    }

    

    function endGame() {

    }

    /* gameWord spawner */
    function startSpawner(numWordsToSpawn) {
        spawnerID = setInterval(() => {
            let randIdx = Math.floor(Math.random() * wordList.length);
            let gameWord = wordFactory.makeWord(wordList[randIdx]);
            wordManager.addWord(gameWord);
            gameBody.prepend(gameWord.domElementRef); 
            if(++numWordsSpawned === numWordsToSpawn) stopSpawner();
        }, SPAWN_INTERVAL);
    }

    function stopSpawner() {
        clearInterval(spawnerID);
        spawnerID = null;
    }

    /* Setup functions */
    function initializeGame() {
        registerEventListeners();
        initDomRefs();
        clearScreen();
    }

    function registerEventListeners() {
        document.addEventListener("gameover", function(evt) {
            wordManager.stopAnimations();
            endRound();
            console.log("Your base is destroyed! Game over");
        });

        document.addEventListener("safeKeyPress", function(evt) {
            wordManager.handleInput(evt.key)
        });
    }
    
    function initDomRefs() {
        gameBody = document.querySelector("main");
    }
     
    return {
        loadNormalGame, loadNormalGame,
        loadEndlessGame, loadEndlessGame,
        loadStroopGame, loadStroopGame,
        loadStatsScreen, loadStatsScreen
    };
})();