/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

/* CALL NEW GAME FUNCTION */
init();

/************************** NEW GAME **************************/

document.querySelector(".btn-new").addEventListener("click", init);

/************************** DICE ROLL **************************/

document.querySelector(".btn-roll").addEventListener("click", function () {

    if (gamePlaying) {
        /* CREATE A NEW RANDOM NUMBER 1-6 */
        var dice = Math.floor(Math.random() * 6) + 1;

        /* DISPLAY THE RESULT */
        var diceDOM = document.querySelector(".dice");
        var currentScore = document.querySelector("#current-" + activePlayer);
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        /* UPDATE ROUND SCORE */
        if (dice !== 1) {
            /* ADD SCORE*/
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            /* CALL NEXT PLAYER */
            nextPlayer();
        }
    }
});

/************************** HOLD BUTTON **************************/

document.querySelector(".btn-hold").addEventListener("click", function () {

    if (gamePlaying) {
        /* ADD CURRENT SCORE TO GLOBAL SCORE */
        scores[activePlayer] += roundScore;

        /* UPDATE THE USER INTERFACE */
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        /* CHECK IF CURRENT PLAYER WON THE GAME */
        if (scores[activePlayer] >= document.querySelector(".set-score_text").value) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;

        } else {
            /* CALL NEXT PLAYER */
            nextPlayer();
        }
    }
});


/* NEXT PLAYER FUNCTION */
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
};

/* NEW GAME FUNCTION */
function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;


    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
};