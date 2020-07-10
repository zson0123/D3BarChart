
var p1Btn = document.querySelector("#p1");
var p2Btn = document.querySelector("#p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var resetBtn = document.querySelector("#reset");
var numInput = document.querySelector("input");
var h1 = document.querySelector("h1");
var numGames = document.querySelector("#numGames");

var p1Score = 0;
var p2Score = 0;

var gameOver = false;
var winningScore = 5;

p1Btn.addEventListener("click", function() {
    if(!gameOver) {
        p1Score++;
        if(p1Score === winningScore) {
            console.log("Game Over!");
            gameOver = true;
            p1Display.classList.add("winner");
        }
        p1Display.textContent = p1Score;
    }
});

p2Btn.addEventListener("click", function() {
    if(!gameOver) {
        p2Score++;
        if(p2Score === winningScore) {
            console.log("Game Over!");
            gameOver = true;
            p2Display.classList.add("winner");
        }
        p2Display.textContent = p2Score;
    }
});

function reset() {
    p1Score = 0;
    p2Score = 0;
    gameOver = false;
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");

    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
}

resetBtn.addEventListener("click", function() {
    reset();
});

numInput.addEventListener("change", function() {
    numGames.textContent = this.value;
    winningScore = Number(this.value);
    reset();
})