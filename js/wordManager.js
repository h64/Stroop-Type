"use strict"
class WordManager {
    constructor() {
        this.gameWords = [];
        this.currentWord = null;
    }
    /* Returns true if key press matches a char, false if not */
    keyPressProcessed(key) {
        if(!this.currentWord) {
            //if matchingWordFound() -> null, return false
            let wordCandidate = this.matchingWordFound(key);
            if(wordCandidate) {
                this.currentWord = wordCandidate;
            } 
            else return false;
        }
        return this.typeNextLetter(key);
    }
    /* If word candidate found, return it. Otherwise return null */
    matchingWordFound(key) {
        let wordCandidate = this.gameWords.find(function(gameWord) {
            if(key === gameWord.word[0]) return true;
        });
        return (wordCandidate === undefined) ? null : wordCandidate;
    }
    /* Returns true if key press matches the next letter. Otherwise returns false */
    typeNextLetter(keyPress) {
        let nextChar = this.currentWord.word[this.currentWord.nextCharIdx];      
        if(keyPress !== nextChar) return false;
        //If keypress valid, color 
        this.currentWord.colorNextLetter();

        //then progress the gameWord to the next letter
        this.currentWord.nextCharIdx++;

        //explode the gameWord if the word is finished
        if(this.currentWord.nextCharIdx === this.currentWord.word.length) 
            this.explodeWord(this.currentWord);  
    }
    /* Remove the word, and play a fun animation */
    explodeWord(word) {
        //remove word from internal array
        let idx = this.gameWords.indexOf(word);
        this.gameWords.splice(idx, 1);

        word.explodeSelf();
        this.currentWord = null;
    }
    explodeAll() {
        this.gameWords.forEach((word) => {
            word.explodeSelf();
        });
    }
    addWord(gameWord) {
        this.gameWords.push(gameWord);
    }
    isEmpty() {
        return (this.gameWords.length === 0) ? true : false;
    }
}



//         //add keypress to statistics
// keyStats.totalKeyPresses++;
// if(key == nextChar) {
//     keyStats.totalKeyMatches++;
    // console.log(keyStats);
    //add to miss count and statistics
// }
//
//
//

// var wordManager = (function() {
//     var gameWords = []; //holds the gameWord objects    
//     var currentWord = null;

//     function handleKeyInput(key) {
//         if(!currentWord) currentWord = findFirstMatchingWord(key);
//         typeNextLetter(key); 
//     }

//     /*
//     * 1. reject keypresses when there are no words out
//     * 2. reject keypress if it doesn't match gameWord's next letter
//     * 3. progress the gameWord to the next letter
//     * 4. explode the gameWord if the word is finished
//     */
//     function typeNextLetter(key) {
//         //reject keypresses when there are no words out

//         //add keypress to statistics
//         keyStats.totalKeyPresses++;
//         if(!currentWord) return;

//         //reject keypress if it doesn't match gameWord's next letter
//         let nextChar = currentWord.word[currentWord.nextCharIdx];
//         // console.log(key !== nextChar);
//         if(key == nextChar) {
//             keyStats.totalKeyMatches++;
//             // console.log(keyStats);
//             //add to miss count and statistics
//         }
//         if(key !== nextChar) {
//             return;
//         }

//         //Otherwise, color letter
//         let letters = currentWord.domElementRef.children;
//         let span = letters[currentWord.nextCharIdx];
//         setStyle(span);

//         //then progress the gameWord to the next letter
//         currentWord.nextCharIdx++;

//         //explode the gameWord if the word is finished
//         if(currentWord.nextCharIdx === currentWord.word.length) 
//             explodeWord(currentWord);  
            
//     }

//     function explodeWord(word) {
//         //remove word from internal array
//         let idx = gameWords.indexOf(word);
//         gameWords.splice(idx, 1);
//         //remove word from dom
//         //give the exploded word some style
//         let domRef = word.domElementRef;
//         domRef.textContent = "BOOM";
//         domRef.style.color = "yellow";

//         //delete element on a delay
//         setTimeout(function() {
//             deleteWord(word);
//         }, 500);

//         currentWord = null;
//     }

//     function findFirstMatchingWord(key) {
//         let firstWord = gameWords.find(function(gameWord) {
//             if(key === gameWord.word[0]) return true;
//         });
//         return firstWord === undefined ? null : firstWord;
//     }

//     function addWord(gameWord) {
//         gameWords.push(gameWord);
//     }

//     function stopAnimations() {
//         gameWords.forEach(function(gameWord) {
//             gameWord.stopAnimation();
//         });
//     }

//     function setStyle(span) {
//         span.style.color = "red";
//     }

//     function deleteWord(word) {
//         word.removeSelfFromDom();
//         if(gameWords.length === 0) gameCoordinator.endRound();
//     }

//     function clearAll() {
//         stopAnimations();
//         let main = document.querySelector("main");
//         gameWords.forEach(function(gameWord) {
//             gameWord.removeSelfFromDom();
//         });
//         // throwWordListEmpty();
//         gameWords.length = 0;
//         currentWord = null;
//         // initKeyCounter();
//     }
//     function throwWordListEmpty() {
//         let evt = new CustomEvent("wordlistempty");
//         document.dispatchEvent(evt);
//     }

//     return {
//         addWord: addWord, 
//         handleInput: handleKeyInput,
//         stopAnimations: stopAnimations,
//         clearAll: clearAll
//     };
// })();