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
    userData.setMode(0)
    menu.style.display = "none"
    gameBoardContainer.style.display = "flex"
})
humanVcpuBtn.addEventListener("click",()=>{
    userData.setMode(1)
    menu.style.display = "none"
    gameBoardContainer.style.display = "flex"
})
let userData = (function(){
    let _mode = 0
    let _gameBoard = [0,1,2,3,4,5,6,7,8]
    let markX = "assets2/x.svg"
    let markO = "assets2/o.svg"
    let turnDecider_O = "assets2/oturn.svg"
    let turnDecider_X = "assets2/xturn.svg"
    let _winner = false
    let _draw = false
    let _gameover = false
    let _drawCount = 0
    let _player1Score = 0
    let _player2Score = 0
    let _tieScores = 0
    let _winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    function getMode(){ return _mode}
    function setMode(value){ _mode = value}
    function getGameBoard(){return _gameBoard }
    function getWinner(){ return _winner}
    function setWinner(value){ _winner = value}
    function getDraw(){ return _draw}
    function setDraw(value){  _draw = value}
    function setGameOver(value){  _gameover = value }
    function getGameOver(){return _gameover }
    function getDrawCount(){ return _drawCount}
    function setDrawCount(value){  _drawCount = value }
    function getPlayer1Score(){   return _player1Score}
    function setPlayer1Score(value){  _player1Score = value }
    function getPlayer2Score(){ return _player2Score }
    function setplayer2Score(value){  _player2Score = value}
    function getTiescores(){ return _tieScores }
    function setTieScores(value){  _tieScores = value }
    function getWinningConditions(){return _winningConditions}
    function incrementDrawCount(){return _drawCount = _drawCount + 1}
    function incrementPlayer1Score(){return _player1Score = _player1Score + 1}
    function incrementPlayer2Score(){return _player2Score = _player2Score + 1}
    function incrementTieScore(){return _tieScores = _tieScores + 1}
    function resetGameData(){
        _gameBoard = [0,1,2,3,4,5,6,7,8]
        _winner = false
        _draw = false
        _gameover = false
        _drawCount = 0
    }
    return{
        getMode : getMode,
        setMode : setMode,
        getGameBoard : getGameBoard,
        getWinner: getWinner,
        setWinner : setWinner,
        getDraw: getDraw,
        setDraw : setDraw,
        setGameOver: setGameOver,
        getGameOver : getGameOver,
        getDrawCount : getDrawCount,
        setDrawCount : setDrawCount,
        getPlayer1Score : getPlayer1Score,
        setPlayer1Score : setPlayer1Score,
        getPlayer2Score : getPlayer2Score,
        setplayer2Score : setplayer2Score,
        getTiescores : getTiescores,
        setTieScores : setTieScores,
        getWinningConditions : getWinningConditions,
        incrementDrawCount : incrementDrawCount,
        incrementPlayer1Score : incrementPlayer1Score,
        incrementPlayer2Score : incrementPlayer2Score,
        incrementTieScore : incrementTieScore,
        resetGameData : resetGameData,
        markX,
        markO,
        turnDecider_O,
        turnDecider_X,
    }
})()
let selectMarks = document.querySelectorAll(".selectMark")
selectMarks.forEach(selectedMark => {
    selectedMark.addEventListener("click",(e)=>{
        playGame(e.target)
        e.target.style.pointerEvents = "none";
    })
});
function playGame(markTarget){
    if(userData.getWinner() === true){
        return
    }
    userData.incrementDrawCount()
    if(userData.getMode() === 0){
        changeTurn(markTarget)
        changeTurnSrc()
        console.log(userData.getGameBoard())
        console.log(userData.getDrawCount())
    }
    else if(userData.getMode() === 1){
        markTarget.firstChild.src = userData.markX
        changeGameBoardValue(markTarget)
        checkWinningCondition()
        if(userData.getGameOver() === true){
            return
        }
         console.log(userData.getGameBoard())
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
        userData.getGameBoard()[markTarget.getAttribute('value')] = "X"
    }
    else{
        userData.getGameBoard()[markTarget.getAttribute('value')] = "O"
    }
}
function checkWinningCondition(){
    userData.getWinningConditions().forEach(condition =>{
        if(userData.getGameBoard()[condition[0]] === "X" && userData.getGameBoard()[condition[1]] === "X" && userData.getGameBoard()[condition[2]] === "X"){
            userData.setWinner(true)
            userData.setGameOver(true)
            if(userData.getWinner() === true){
                userData.incrementPlayer1Score()
            }
            XscoresDisplay.textContent = userData.getPlayer1Score()
            let xWon = document.querySelector(".xWon")
            xWon.style.display = "flex"
        }
        else if(userData.getGameBoard()[condition[0]] === "O" && userData.getGameBoard()[condition[1]] === "O" && userData.getGameBoard()[condition[2]] === "O"){
            userData.setWinner(true)
            userData.setGameOver(true)
            if(userData.getWinner() === true){
                userData.incrementPlayer2Score()
            }
            OscoresDisplay.textContent = userData.getPlayer2Score()
            let oWon = document.querySelector(".oWon")
            oWon.style.display = "flex"
        }
    })
}
function checkForDraw(){
    if(userData.getDrawCount() >= 9 && userData.getWinner() === false){
        userData.setGameOver(true)
        userData.incrementTieScore()
        TieScoresDisplay.textContent = userData.getTiescores()
        let draw = document.querySelector(".draw")
        draw.style.display = "flex"
        console.log("draw")
    }
}
function resetGameData(){
    userData.resetGameData()
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
    userData.incrementDrawCount()
    let availableSpaces = userData.getGameBoard().filter(
        (space) => space !== "X" && space !== "O"
      );
      let move = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
      userData.getGameBoard()[move] = "O";
      setTimeout(() => {
        let box = document.getElementById(`${move}`);
        box.firstChild.src = userData.markO
        box.style.pointerEvents = "none";
      }, 200);
      console.log(userData.getGameBoard())
}