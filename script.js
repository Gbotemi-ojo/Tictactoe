let humanVhuman = document.querySelector(".humanVhuman")
let menu = document.querySelector(".menu")
let gameBoardContainer = document.querySelector(".gameBoardContainer")
let selectMark = document.querySelectorAll(".selectMark")
let turnDecider = document.querySelector(".turnDecider")
let playerName1 = document.querySelector(".playerName1")
let playerName2 = document.querySelector(".playerName2")
let xScoresDisplay = document.querySelector(".XscoresDisplay")
let tieScoresDisplay = document.querySelector(".TieScoresDisplay")
let oScoresDisplay = document.querySelector(".OscoresDisplay")
let iconXimage = document.querySelector(".iconXimage")
let iconOimage = document.querySelector(".iconOimage")
let markX = document.querySelector(".markX")
let markO = document.querySelector(".markO")
let refree1 = document.querySelector(".refree1")
let refree2 = document.querySelector(".refree2")
let refree3 = document.querySelector(".refree3")
let refree4 = document.querySelector(".refree4")
let refree5 = document.querySelector(".refree5")
let nextRound = document.querySelectorAll(".nextRound")
let restartBtn = document.querySelector(".restartBtn")
let selectMarkIcons = document.querySelectorAll(".selectMarkIcons")
let humanVcpuBtn = document.querySelector(".humanVcpu")
let difficultyLevel = document.querySelector(".difficultyLevel")
let easyMode = document.querySelector(".easyMode")
let hardMode = document.querySelector(".hardMode")
humanVcpuBtn.addEventListener("click",(data)=>{
    gameVariables(data)
    difficultyLevel.style.display = "flex"
    menu.style.display = "none"
})
easyMode.addEventListener("click",()=>{
    userData.mode = 1
    difficultyLevel.style = "none"
    gameBoardContainer.style.display = "flex"
})
hardMode.addEventListener("click",()=>{
    userData.mode = 2
    difficultyLevel.style = "none"
    gameBoardContainer.style.display = "flex"
})
let GameCountClick = 0
let userData = {
    chosenMark : "X",
    mode: 0,
    //where 0 is human v human
    //1 is human v easy AI
    //2 is human v minimax
    Xscores: 0,
    Oscores: 0,
    tieScores: 0
}
nextRound.forEach(btn => {
    btn.addEventListener("click",(data)=>{
        clearRefree()
        selectMarkIcons.forEach(icons => {
            icons.src = ""
        });
        resetGameData(data)
        selectMark.forEach(btn => {
            btn.disabled = false
        });
    })
});
restartBtn.addEventListener("click",(data)=>{
    clearRefree()
    selectMarkIcons.forEach(icons => {
        icons.src = ""
    });
    selectMark.forEach(btn => {
        btn.disabled = false
    });
    resetGameData(data)
})
markX.addEventListener("click",markXChosen)
markO.addEventListener("click",mark0Chosen)
function eventListenerToBoxes(data){
    selectMark.forEach(mark => {
        mark.addEventListener("click",(e)=>{
            playGame(e.target,data)
            e.target.disabled = true
            console.log(GameCountClick)
            console.log(data.gameBoard)
        })
    });
}
humanVhuman.addEventListener("click",(data)=>{
    gameVariables(data)
    menu.style.display = "none"
    gameBoardContainer.style.display = "flex"
    userData.mode = 0
})
function playGame(markTarget,data){
    if(markTarget.firstChild.src === "assets/icon-x.svg" || 
    markTarget.firstChild.src === "assets/icon-o.svg"|| data.gameClickCount > 8||
    data.gameOver === true){
     return
    }
    GameCountClick++
    if(userData.mode === 0){
        if(turnDecider.src === data.turnIcon1){
            markTarget.firstChild.src = data.player1Mark
        }
        else{
            markTarget.firstChild.src = data.player2Mark
        }
        changeTurn(data)
        changeGameBoardValue(markTarget,data)
        checkWinningCondition(data)
        if(data.winner === true && turnDecider.src === data.turnIcon2){
            statusUpdateX()
            userData.Xscores+= 1
            updateScores()
            selectMark.forEach(mark => {
                mark.disabled = true
            });
        }
        else if(data.winner === true && turnDecider.src === data.turnIcon1){
            statusUpdateO()
            userData.Oscores+= 1
            updateScores()
            selectMark.forEach(mark => {
                mark.disabled = true
            });
        }
        if(GameCountClick === 9 && data.winner === false){
            refree5.style.display = "flex"
            userData.tieScores += 1
            updateScores()
            data.gameBoard = [0,1,2,3,4,5,6,7,8]
            selectMark.forEach(mark => {
                mark.disabled = true
            });
        }
    }
    else if(userData.mode === 1){
        markTarget.firstChild.src = data.player1Mark
        changeTurn(data)
        changeGameBoardValue(markTarget,data)
        easymodeLogic(data)
        checkWinningCondition(data)
        if(data.winner === true && turnDecider.src === data.turnIcon2){
            statusUpdateX()
            userData.Xscores+= 1
            updateScores()
        }
        else if(data.winner === true && turnDecider.src === data.turnIcon1){
            statusUpdateO()
            userData.Oscores+= 1
            updateScores()
        }
        if(GameCountClick === 10 && data.winner === false){
            refree5.style.display = "flex"
            userData.tieScores += 1
            updateScores()
            data.gameBoard = [0,1,2,3,4,5,6,7,8]
        }
    }
    else if(data.mode === 2){
        minimaxdata()
    }
}
function changeTurn(data){
    if(turnDecider.src === data.turnIcon1){
        turnDecider.src = data.turnIcon2
    }
    else{
        turnDecider.src = data.turnIcon1
    }
}
function gameVariables(data){
    data = {
        player1Mark :"assets/icon-x.svg",
        player2Mark : "assets/icon-o.svg",
        gameClickCount: 0,
        gameOver : false,
        turnIcon1 : "assets/icon-x-edited2.svg",
        turnIcon2 : "assets/icon-o-edited.svg",
        gameBoard : [0,1,2,3,4,5,6,7,8],
        winner : false,
        winningConditions : [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ],
    }
    eventListenerToBoxes(data)
}
function changeGameBoardValue(markTarget,data){
    if(markTarget.firstChild.src === "assets/icon-x.svg"){
        data.gameBoard[markTarget.getAttribute('value')] = "X"
    }
    else{
        data.gameBoard[markTarget.getAttribute('value')] = "O"
    }
}
function checkWinningCondition(data){
    data.winningConditions.forEach(condition => {
        if(data.gameBoard[condition[0]] === data.gameBoard[condition[1]] && data.gameBoard[condition[0]] === data.gameBoard[condition[2]]){
          data.winner = true
          data.gameOver = true
        }
    });
}
function resetGameData(data){
    gameVariables(data)
    data.winner = false
    data.gameOver = false
    // data.gameClickCount = 0
    data.gameBoard = [0,1,2,3,4,5,6,7,8]
    turnDecider.src = "assets/icon-x-edited2.svg"
    GameCountClick = 0
}
function markXChosen(){
   userData.chosenMark = "X"
   playerName1.textContent = "(P1)"
   playerName2.textContent = "(P2)"
   markX.style.background = "#A8BFC9"
   iconXimage.src = "assets/icon-x-edited.svg"
   markO.style.background = "rgb(24, 42, 51)"
   iconOimage.src = "assets/icon-o-edited.svg"
}
function mark0Chosen(){
    userData.chosenMark = "O"
    playerName1.textContent = "(P2)"
    playerName2.textContent = "(P1)"
    markX.style.background = "rgb(24, 42, 51)"
    iconXimage.src = "assets/icon-x-edited2.svg"
    markO.style.background = "#A8BFC9"
    iconOimage.src = "assets/icon-o-edited2.svg"
}
function statusUpdateX(){
    if(userData.chosenMark === "X"){
        refree3.style.display = "flex"
    }
    else if(userData.chosenMark === "O"){
        refree4.style.display = "flex"
    }
}
function statusUpdateO(){
    if(userData.chosenMark === "O"){
        refree1.style.display = "flex"
    }
    else if(userData.chosenMark === "X"){
        refree2.style.display = "flex"
    }
}
function clearRefree(){
    refree1.style.display = "none"
    refree2.style.display = "none"
    refree3.style.display = "none"
    refree4.style.display = "none"
    refree5.style.display = "none"
}
function updateScores(){
xScoresDisplay.textContent = userData.Xscores
oScoresDisplay.textContent = userData.Oscores
tieScoresDisplay.textContent = userData.tieScores
}
function easymodeLogic(data){
    changeTurn(data)
    GameCountClick++
    let availableSpaces = data.gameBoard.filter(
        (space) => space !== "X" && space !== "O"
      );
      let move =
      availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    data.gameBoard[move] = "O";
    setTimeout(() => {
        let box = document.getElementById(`${move}`);
        box.firstChild.src  = data.player2Mark;
      }, 200);
        changeTurn(data)
}
