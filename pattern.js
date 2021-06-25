var newGameButton = document.getElementById("restart_button");
var tryAgainButton = document.getElementById("try_again_button");
var cell = document.getElementsByTagName("td");
var difficulty = document.getElementById("difficulty");
var grid = document.getElementsByTagName("table")[0];
var gameOverDiv = document.getElementById("game_over");

var addSubtractChange = function() {if (gameStarted) {start();}};

// adds events
(function ()
{
  tryAgainButton.onclick = function() {newGame();};
  newGameButton.onclick = function() {newGame();};

  for (i in cell)
  {
    cell[i].onclick = function() {kogMaw(this);};
  }
})();

var pattern = new Array();
var clicked = 0;
var gameStarted = false;

var lives = new counter(3, "life_container");
var score = new counter(0, "score_container", 100, addLives);

function addLives(change)
{
  lives.current += change;
  lives.display();
}

var stopwatchA = new stopwatch("stopwatch");

var patternAnimation = new Object();
patternAnimation.active = false;

function newGame()
{
  grid.style.opacity = "1";
  gameOverDiv.style.display = "none";
  start();
  score.reset();
  lives.reset();
  score.display();
  lives.display();
  gameStarted = true;
  stopwatchA.reset();
  stopwatchA.check(gameStarted);
}

function start()
{
  patternAnimation.active = false;

  clearInterval(patternAnimation.time);
  resetTable();
  randomPattern();
  showPattern();
  score.temporary = 0;
}

function showPattern()
{
  clicked = 0;
  patternAnimation.current = 0;
  patternAnimation.active = true;
  patternAnimation.time = setInterval(function() {displayPattern();}, 400);
}

function resetTable()
{
  for (i in cell)
  {
    cell[i].innerHTML = "";
    cell[i].className = "unselected";
    cell[i].aatrox = false;
  }
}

function displayPattern()
{
  var poppy = cell[pattern[patternAnimation.current]];
  patternAnimation.current++;
  if (poppy)
  {
    poppy.className = "selected";
    poppy.innerHTML = patternAnimation.current;
  }
  if (patternAnimation.current >= pattern.length)
  {
    clearInterval(patternAnimation.time);
    patternAnimation.active = false;
  }
}

function randomPattern()
{
  pattern = [];
  for (var x = [], i = 0; i < 25; i++)
  {
    x[i] = i;
  }
  for (var b = 0; b < parseInt(difficulty.value); b++)
  {
    var q = x.length - 1;
    var p = Math.random();
    p = p * q;
    p = Math.round(p);
    pattern[b] = x.splice(p,1);
  }
}

function kogMaw(x)
{
  var v = x.parentNode.rowIndex * 5;
  v += x.cellIndex;
  if (clicked == 0 && gameStarted && !patternAnimation.active) {resetTable();}
  if (!x.aatrox && v == pattern[clicked] && gameStarted && !patternAnimation.active)
  {
    x.aatrox = true;
    clicked++;
    x.className = "selected";
    x.innerHTML = clicked;
    score.temporary += 1 + clicked;
    if (clicked == pattern.length) {score.current += score.temporary; start();}
  }
  else if (!x.aatrox && v != pattern[clicked] && gameStarted && !patternAnimation.active)
  {
    lives.current--;
    if (lives.current <= 0)
    {
      gameOver();
    }
    else
    {
      resetTable();
      showPattern();
    }
  }
  else {;}
  score.display();
  lives.display();
}

function gameOver()
{
  gameStarted = false;
  stopwatchA.check(gameStarted);
  grid.style.opacity = "0.5";
  gameOverDiv.style.display = "block";
}