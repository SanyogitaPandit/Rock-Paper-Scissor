let rounds = 0;
let userWin = 0;
let compWin = 0;

function isValidChoise(choise) {
    let choiseStr = choise.trim().toLowerCase();

    if (choiseStr === "rock" || choiseStr === "paper" || choiseStr === "scissor") {
        return true;
    }
    else {
        return false;
    }
}

function computerPlay() {
    let choiseNum = Math.floor(Math.random() * 10) % 3; // Get a random integer from 0 to 2

    let compChoise;
    switch (choiseNum) {
        case 0:
            compChoise = "rock";
            break;
        case 1:
            compChoise = "paper";
            break;
        case 2:
            compChoise = "scissor";
        //    break;
        //default:
        //    compChoise = "rock";
    }

    return compChoise;
}

function playRound(userSel, compSel) {
    let userSelStr = userSel.trim().toLowerCase();
    //let compSelStr = compSel.trim().toLowerCase();  

    if (userSelStr === compSel) {
        return ("Game Draw. " + userSel + " Vs " + compSel);
    }

    let combinationStr = userSelStr + compSel;
    let winnerStr;

    if (combinationStr === "rockpaper" || combinationStr === "paperrock") {
        winnerStr = "paper";
    }
    else if (combinationStr === "paperscissor" || combinationStr === "scissorpaper") {
        winnerStr = "scissor";
    }
    else {
        winnerStr = "rock";
    }

    if (userSelStr === winnerStr) {
        return ("You win - " + userSel + " beats " + compSel);
    }
    else {
        return ("You lose - " + compSel + " beats " + userSel);
    }
}

function createAndAppend() {
    let para = document.createElement("p");
    para.textContent = "or";

    let btn = document.createElement("button");
    btn.type = "button";
    btn.id = "reload";
    btn.name = "reload";
    btn.textContent = "Start New Game";
    btn.addEventListener("click", () => {
        window.location.reload();
    });

    let img1 = document.createElement("img");
    let img2 = document.createElement("img");

    img1.id = "UserCh";
    img1.alt = "Your choise image";
    img1.classList.add("imagestyle");

    img2.id = "CompCh";
    img2.alt = "Computer's choise image";
    img2.classList.add("imagestyle");

    img1.style = img2.style = "border-style: solid";

    let userInputDiv = document.getElementById("userInputDiv");
    userInputDiv.appendChild(para);
    userInputDiv.appendChild(btn);

    let img1PlaceHolder = document.getElementById("usrChPlace");
    img1PlaceHolder.appendChild(img1);

    let img2PlaceHolder = document.getElementById("compChPlace");
    img2PlaceHolder.appendChild(img2);
}

function updateUI(userSel, compSel, winnerStr) {
    if (rounds == 1) {
        createAndAppend();
    }

    document.getElementById("UserCh").src = "images\\" + userSel + ".png";
    document.getElementById("CompCh").src = "images\\" + compSel + ".png";;
    document.getElementById("lrw").textContent = winnerStr;
    document.getElementById("tr").textContent = "Total Rounds: " + rounds;

    if (userWin > compWin) {
        document.getElementById("winner").textContent = "You win the game!";
    }
    else if (compWin > userWin) {
        document.getElementById("winner").textContent = "You lose the game!";
    }
    else {
        document.getElementById("winner").textContent = "DRAW!";
    }
}

function buttonClick(e) {
    if (rounds >= Number.MAX_SAFE_INTEGER) {
        alert("You reached the maximum rounds. Please restart the game.");
        document.getElementById("reload").focus();
        return;
    }

    rounds++;
    let userSel = null;
    userSel = e.currentTarget != null ? e.currentTarget.name : null;
    if (userSel != null) {
        let compSel = computerPlay();
        let winnerStr = playRound(userSel, compSel);
        if (winnerStr.search("win") != -1) {
            userWin++;
        }
        else if (winnerStr.search("lose") != -1) {
            compWin++;
        }

        updateUI(userSel, compSel, winnerStr);
    }
}

function onPageLoad() {
    let buttonList = document.getElementsByTagName("button");
    for (let index = 0; index < buttonList.length; index++) {
        let button = buttonList[index];
        button.addEventListener("click", buttonClick);
    }
}