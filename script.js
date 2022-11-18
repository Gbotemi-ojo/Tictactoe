// tackle the problem using global variables
let menu = document.querySelector(".menu");
let humanVhumanBtn = document.querySelector(".humanVhuman");
let humanVcpuBtn = document.querySelector(".humanVcpu");
let gameBoardContainer = document.querySelector(".gameBoardContainer");
let markX = document.querySelector(".markX");
let markO = document.querySelector(".markO");
let turnDecider = document.querySelector(".turnDecider");
let XscoresDisplay = document.querySelector(".XscoresDisplay");
let OscoresDisplay = document.querySelector(".OscoresDisplay");
let TieScoresDisplay = document.querySelector(".TieScoresDisplay");
let nextRoundBtn = document.querySelectorAll(".nextRound")
let refree = document.querySelectorAll(".refree")
let restartBtn = document.querySelector(".restartBtn")
let quitBtn = document.querySelectorAll(".quit")
nextRoundBtn.forEach(btn => {
    btn.addEventListener("click",()=>{
        resetGameData()
        refree.forEach(element => {
            element.style.display = "none"
        });
    })
});
restartBtn.addEventListener("click",()=>{
    resetGameData()
    refree.forEach(element => {
        element.style.display = "none"
    });
})
quitBtn.forEach(btn => {
    btn.addEventListener("click",()=>{
        location.reload()
    })
});
humanVhumanBtn.addEventListener("click",()=>{
    userData.mode = 0
    menu.style.display = "none"
    gameBoardContainer.style.display = "flex"
})
humanVcpuBtn.addEventListener("click",()=>{
    userData.mode = 1
    menu.style.display = "none"
    gameBoardContainer.style.display = "flex"
})
let userData = {
    mode : 0,
    gameBoard: [0,1,2,3,4,5,6,7,8],
    markX : "assets2/x.svg",
    markO : "assets2/o.svg",
    turnDecider_O: "assets2/oturn.svg",
    turnDecider_X : "assets2/xturn.svg",
    winner: false,
    draw : false,
    gameover : false,
    drawCount : 0,
    player1Score : 0,
    player2Score : 0,
    tieScores : 0,
    winningConditions: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
}
let selectMarks = document.querySelectorAll(".selectMark")
selectMarks.forEach(selectedMark => {
    selectedMark.addEventListener("click",(e)=>{
        playGame(e.target)
        e.target.style.pointerEvents = "none";
    })
});
function playGame(markTarget){
    if(userData.winner === true){
        return
    }
    userData.drawCount++
    if(userData.mode === 0){
        changeTurn(markTarget)
        changeTurnSrc()
        console.log(userData.drawCount)
    }
    else if(userData.mode === 1){
        markTarget.firstChild.src = userData.markX
        changeGameBoardValue(markTarget)
        checkWinningCondition()
        if(userData.gameover === true){
            return
        }
        cpuEasyAi()
        console.log("easy mode")
    }
    changeGameBoardValue(markTarget)
    checkWinningCondition()
    checkForDraw()
}
function changeTurnSrc(){
    if(turnDecider.getAttribute('src') === userData.turnDecider_X){
        turnDecider.src = userData.turnDecider_O
    }
    else{
        turnDecider.src = userData.turnDecider_X
    }
}
function changeTurn(markTarget){
    if(turnDecider.getAttribute('src') === userData.turnDecider_X){
        markTarget.firstChild.src = userData.markX
    }
    else if(turnDecider.getAttribute('src') === userData.turnDecider_O){
        markTarget.firstChild.src = userData.markO
    }
}
function changeGameBoardValue(markTarget){
    if(markTarget.firstChild.getAttribute('src') === "assets2/x.svg"){
        userData.gameBoard[markTarget.getAttribute('value')] = "X"
    }
    else{
        userData.gameBoard[markTarget.getAttribute('value')] = "O"
    }
}
function checkWinningCondition(){
    userData.winningConditions.forEach(condition =>{
        if(userData.gameBoard[condition[0]] === "X" && userData.gameBoard[condition[1]] === "X" && userData.gameBoard[condition[2]] === "X"){
            userData.winner = true
            userData.gameover = true
            if(userData.winner === true){
                userData.player1Score++
            }
            XscoresDisplay.textContent = userData.player1Score
            let xWon = document.querySelector(".xWon")
            xWon.style.display = "flex"
        }
        else if(userData.gameBoard[condition[0]] === "O" && userData.gameBoard[condition[1]] === "O" && userData.gameBoard[condition[2]] === "O"){
            userData.winner = true
            userData.gameover = true
            if(userData.winner === true){
                userData.player2Score++
            }
            OscoresDisplay.textContent = userData.player2Score
            let oWon = document.querySelector(".oWon")
            oWon.style.display = "flex"
        }
    })
}
function checkForDraw(){
    if(userData.drawCount >= 9 && userData.winner === false){
        userData.gameover = true
        userData.tieScores++
        TieScoresDisplay.textContent = userData.tieScores
        let draw = document.querySelector(".draw")
        draw.style.display = "flex"
        console.log("draw")
    }
}
function resetGameData(){
    userData.gameBoard = [0,1,2,3,4,5,6,7,8]
    userData.winner = false
    userData.draw = false
    userData.gameover = false
    userData.drawCount = 0
    let selectMarkIcons = document.querySelectorAll(".selectMarkIcons")
    selectMarkIcons.forEach(icon => {
        icon.src = ""
    });
    let selectMarks = document.querySelectorAll(".selectMark")
    selectMarks.forEach(selectedMark => {
        selectedMark.style.pointerEvents = "all";
        turnDecider.src = userData.turnDecider_X
    })
};
function cpuEasyAi(){
    userData.drawCount++
    let availableSpaces = userData.gameBoard.filter(
        (space) => space !== "X" && space !== "O"
      );
      let move = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
      userData.gameBoard[move] = "O";
      setTimeout(() => {
        let box = document.getElementById(`${move}`);
        box.firstChild.src = userData.markO
      }, 200);
}