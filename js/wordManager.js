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
        if(this.currentWord.nextCharIdx === this.currentWord.word.length) {
            this.explodeWord(this.currentWord);  
            let evt = new Event("wordcomplete");
            document.dispatchEvent(evt);
        }
        return true;
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

