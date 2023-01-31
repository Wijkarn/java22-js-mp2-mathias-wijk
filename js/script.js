"use strict";

const playerArea = document.querySelector("#playerArea");
const formButton = document.querySelector("button");
const gameScore = document.querySelector("#gameScore");
let playerName;
const theChosenOne = "red solid 2px";
const notTheChosenOne = "black solid 2px";
let playerWins = 0;
let playerWinsTotal = 0;
let pcWins = 0;
let pcWinsTotal = 0;

playerArea.addEventListener("click", event => {
    let pcChoice = pcChoiceFunc();

    const rock = document.querySelector("#playerRock");
    const paper = document.querySelector("#playerPaper");
    const scissors = document.querySelector("#playerScissors");
    let playerChoice;

    //checks what the player chose
    if (event.target.id == "playerRock") {
        playerChoice = "Rock";
        rock.style.border = theChosenOne;
        paper.style.border = notTheChosenOne;
        scissors.style.border = notTheChosenOne;
    }
    else if (event.target.id == "playerPaper") {
        playerChoice = "Paper";
        rock.style.border = notTheChosenOne;
        paper.style.border = theChosenOne;
        scissors.style.border = notTheChosenOne;
    }
    else {
        playerChoice = "Scissors";
        rock.style.border = notTheChosenOne;
        paper.style.border = notTheChosenOne;
        scissors.style.border = theChosenOne;
    }

    // Playing a round
    if (pcWins < 3 && playerWins < 3) {
        // Round Tie
        if (playerChoice == pcChoice) {
            scoreList("Tie");
        }
        // Round Player Win
        else if ((playerChoice == "Rock" && pcChoice == "Scissors") || (playerChoice == "Scissors" && pcChoice == "Paper") || (playerChoice == "Paper" && pcChoice == "Rock")) {
            scoreList(playerName);
            playerWins++;
        }
        // Round Player Lose
        else {
            scoreList("Computer");
            pcWins++;
        }
    }
    else{
        gameScore.innerText = "";
    }

    gameScore.innerText = `${playerName}: ${playerWins}. Computer: ${pcWins}.`;

    // pc wins the game
    if (pcWins == 3) {
        const h1 = document.querySelectorAll("h1");

        afterGame();
        pcWinsTotal++;
        h1[3].innerText = `Computer wins: ${pcWinsTotal}`;
    }
    // player wins the game
    else if (playerWins == 3) {
        const h1 = document.querySelectorAll("h1");

        afterGame();
        playerWinsTotal++;
        h1[1].innerText = `${playerName} wins: ${playerWinsTotal}`;
    }
})

// when you press the "Play!" button after entering your name
formButton.addEventListener("click", event => {
    event.preventDefault();

    const gameArea = document.querySelector("#gameArea");
    const info = document.querySelector("#info");
    const playerNameAll = document.querySelectorAll(".playerName");

    gameArea.style.display = "inherit";
    info.style.display = "inherit";

    const score = document.querySelector("#score");
    const ol = document.createElement("ol");
    score.append(ol);

    const formInput = document.querySelector("input");
    playerName = formInput.value;

    for (let i = 0; i < playerNameAll.length; i++) {
        playerNameAll[i].innerText = playerName;
    }

    const form = document.querySelector("form");
    form.style.display = "none";
})

// pc choose option
function pcChoiceFunc() {
    const pcChoiceClass = document.querySelectorAll(".pcChoice")
    let rps;

    let math = Math.floor(Math.random() * 3);

    //changes from numbers to a word and changes the border of computer area so show what the computer chose
    if (math == 0) {
        rps = "Rock";
        pcChoiceClass[0].style.border = theChosenOne;
        pcChoiceClass[1].style.border = notTheChosenOne;
        pcChoiceClass[2].style.border = notTheChosenOne;
    }
    else if (math == 1) {
        rps = "Paper";
        pcChoiceClass[0].style.border = notTheChosenOne;
        pcChoiceClass[1].style.border = theChosenOne;
        pcChoiceClass[2].style.border = notTheChosenOne;
    }
    else {
        rps = "Scissors";
        pcChoiceClass[0].style.border = notTheChosenOne;
        pcChoiceClass[1].style.border = notTheChosenOne;
        pcChoiceClass[2].style.border = theChosenOne;
    }
    return rps;
}

// adds round score in the center 
function scoreList(winner) {
    const ol = document.querySelector("ol")
    const li = document.createElement("li");
    li.innerText = winner;
    ol.append(li);
}

// after someone won the game
function afterGame() {
    playerWins = 0;
    pcWins = 0;

    // removes the score list
    const olRemove = document.querySelector("ol");
    olRemove.remove();

    // adds a new scorelist back
    const score = document.querySelector("#score");
    const olAdd = document.createElement("ol");
    score.append(olAdd);
}