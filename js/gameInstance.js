"use strict"
const STARTING_NUM_WORDS = 5;


class Game {
    constructor() {
        console.log("A game has been spawned");
        this.wordsToSpawn = STARTING_NUM_WORDS;
    }
}

class EndlessGame extends Game {
    constructor() {
        super();
        this.wordsToSpawn = Number.MAX_SAFE_INTEGER - 1;
    }
}

class StroopGame extends Game {
    constructor() {
        super();
    }
}

// switch(gameType) {
//     case NORMAL_GAME:
//         init();
//         // wordsToSpawn = STARTING_NUM_WORDS;
//         wordsToSpawn = 1;
//         console.log(stats);
//         roundHelper.startRound();
//         break;
//     case ENDLESS_GAME:
//         init();
//         wordsToSpawn = Number.MAX_SAFE_INTEGER-1;
//         roundHelper.startRound();
//         break;
//     case STROOP_GAME:
//         // init();
//         // let wordsToSpawn = STARTING_WORDS;
//         // startRound();
//         break;
//     case STATS_SCREEN:
//         init();
//         break;
//     default:
//         gameMode = null;
//         break;
// }  
// var spawnerID = null;
// var numWordsSpawned = 0;
// var wordsToSpawn = 0;
// // var wordsDeletedInRound = 0;
// var gameMode = null;
// var gameOver = false;

// var timeStart = null;
// var timeAccumulated = null;
// stats = {
//     currentRound: 0,
//     accuracy: 0,
//     keyPresses: 0,
//     keyMatches: 0,
// }
// }