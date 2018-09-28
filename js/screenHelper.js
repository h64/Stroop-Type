const SHORT_DELAY = 800;
const LONG_DELAY = 2000;

var screenHelper = (function() {
    var domReferences = {
        roundSummaryEl: {},
        roundStartMsgEl: {},
        gameOverMsgEl: {}
    };
    function initDomReferences() {
        domReferences.roundSummaryEl = document.querySelector("#roundSummary");
        domReferences.roundStartMsgEl = document.querySelector("#roundStartMsg");
        domReferences.gameOverMsgEl = document.querySelector("#gameOverMsg");
    }
    function flashVisibility(element, delayLength, additionalCb) {
        setTimeout(() => {
            toggleVisibility(element);
            setTimeout(() => {
                toggleVisibility(element);
                if(additionalCb) {
                    additionalCb();
                }
            }, delayLength);
        }, SHORT_DELAY);
    }
    function toggleVisibility(element) {
        element.classList.toggle("hidden");
    }

    function flashRoundSummary(cb) {
        flashVisibility(domReferences.roundSummaryEl, LONG_DELAY, cb);
    }
    function flashRoundStartMsg(cb) {
        flashVisibility(domReferences.roundStartMsgEl, SHORT_DELAY, cb);
    }
    function flashGameOver(cb) {
        flashVisibility(domReferences.gameOverMsgEl, LONG_DELAY, cb);
    }

    function updateStats(stats) {
        updateRoundSummaryEl(stats);
    }

    function updateRoundSummaryEl(stats) {
        let spanList = [];
        for(let i = 0; i < domReferences.roundSummaryEl.children.length; i++) {
            spanList.push(domReferences.roundSummaryEl.children[i].children[0]);
        }
        spanList[0].textContent = stats.currentRound; //current round
        spanList[1].textContent = stats.overallWpm; //overall wpm
        spanList[2].textContent = stats.roundWpm; //round wpm
        spanList[3].textContent = stats.roundKeyPresses-stats.roundKeyMatches; //missed keys this round
        let accuracy;
        if(stats.totalKeyPresses == 0) {
            accuracy = 0;
        } else {
            accuracy = parseFloat(stats.totalKeyMatches/stats.totalKeyPresses*100).toFixed(2);
        }
        spanList[4].textContent = accuracy; //total accuracy %
    }


    return {
        init: initDomReferences,
        updateStats: updateStats,
        flashRoundSummary: flashRoundSummary,
        flashRoundStartMsg: flashRoundStartMsg,
        flashGameOver: flashGameOver
    }
})();
