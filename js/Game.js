"use strict"
const STARTING_NUM_WORDS = 5;

class Game {
    constructor(startingNumWordsOverride) {
        this.wordsToSpawn = STARTING_NUM_WORDS;
        if(startingNumWordsOverride) this.wordsToSpawn = startingNumWordsOverride;
        this.stats = {
            currentRound: 0,
            totalKeyPresses: 0,
            totalKeyMatches: 0,
            roundKeyPresses: 0,
            roundKeyMatches: 0,
            roundWpm: 0,
            overallWpm: 0,
            wordsCompleted: 0,
            totalWordsCompleted: 0,
            roundStartTime: 0,
            roundTimeElapsed: 0,
            overallTimeElapsed: 0
        }
        this.wordSpawner = null;
        this.wordManager = new WordManager();

        this.gameOver = false;
        this.roundStarted = false;

        this.startRound();
    }
    startRound() {
        this.stats.currentRound++;
        this.stats.roundKeyPresses = 0;
        this.stats.roundKeyMatches = 0;
        this.stats.wordsCompleted = 0;
        this.stats.roundStartTime = new Date();
        this.roundStarted = true;
        this.wordSpawner = new WordSpawner(this.wordManager, this.wordsToSpawn);
    }
    processKeyPress(key) {
        if(!this.roundStarted) return; //reject keypresses between rounds
        if(this.wordManager.keyPressProcessed(key)) {
            this.stats.totalKeyMatches++;
            this.stats.totalKeyPresses++;
            this.stats.roundKeyMatches++;
            this.stats.roundKeyPresses++;
        } else {
            this.stats.totalKeyPresses++;
            this.stats.roundKeyPresses++;
        }
        if(this.wordSpawner.isDoneSpawning() && this.wordManager.isEmpty()) {
            this.endRound();
        }
    }
    endRound() {
        this.calculateStats();
        screenHelper.updateStats(this.stats);
        this.roundStarted = false;
        screenHelper.flashRoundSummary(() => {
            screenHelper.flashRoundStartMsg(() => {
                if(!this.gameOver) {
                    this.wordsToSpawn++;
                    this.startRound();
                }
            });
        });
    }
    calculateStats() {
        let endTime = new Date();
        this.stats.roundTimeElapsed = endTime - this.stats.roundStartTime;
        this.stats.overallTimeElapsed += this.stats.roundTimeElapsed;
        this.stats.roundWpm = parseFloat(this.stats.wordsCompleted / this.stats.roundTimeElapsed * 1000 * 60).toFixed(2);
        this.stats.overallWpm = parseFloat(this.stats.totalWordsCompleted / this.stats.overallTimeElapsed * 1000 * 60).toFixed(2);
        this.stats.wordsCompleted = 0;
    }
    endGame() {
        this.gameOver = true;
        this.wordSpawner.stopSpawner();
        this.wordManager.explodeAll();
        this.calculateStats();
        screenHelper.updateStats(this.stats);
        screenHelper.flashRoundSummary(() => {
            screenHelper.flashGameOver(() => {
                setTimeout(() => {
                    main.showMenu();
                }, 1000)
            });
        });         
    }
    incrementWordCompletedCounter() {
        this.stats.wordsCompleted++;
        this.stats.totalWordsCompleted++;
    }

}

class EndlessGame extends Game {
    constructor() {
        let numWords = Number.MAX_SAFE_INTEGER - 1;
        super(numWords);
    }
    endRound() {
        this.calculateStats();
        screenHelper.updateStats(this.stats);
        this.roundStarted = false;
        screenHelper.flashRoundSummary(() => {
            screenHelper.flashRoundStartMsg(() => {
            });
        });
        
    }
}

class StroopGame extends Game {
    constructor() {
        super();
    }
}
