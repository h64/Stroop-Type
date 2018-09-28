var screenHelper = (function() {
    function flashVisibility(element, persistLength, additionalCb) {
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
    }
    function toggleVisibility(element) {
        element.classList.toggle("hidden");
    }
    function clearScreen() {
        this.toggleVisibility(navEl);
    }

})();

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
