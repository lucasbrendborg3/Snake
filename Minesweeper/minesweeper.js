var grid = document.getElementById("grid");
var testMode = false;
var bomber = 20;
var gridSizeX = 10;
var gridSizeY = 10;
var interval = 0;
let tidArray = [];

generateGrid();

function generateGrid() {
  //Laver banen
  window.addEventListener(
    "contextmenu",
    function(e) {
      e.preventDefault();
    },
    false
  );
  reset();
  for (let i = 0; i < gridSizeY; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < gridSizeX; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() {
        tryk(this);
        tjekOmVundet();
      };
      cell.oncontextmenu = function() {
        toggleFlag(this);
        tjekOmVundet();
        antalFlag();
      };
    }
  }
  addMines(bomber);
}

function timerCall() {
  let timer = document.getElementById("timer");
  timerPlus++;
  if (timerPlus < 10) {
    timer.innerHTML = "00" + timerPlus;
  } else if (timerPlus < 100) {
    timer.innerHTML = "0" + timerPlus;
  } else {
    timer.innerHTML = timerPlus;
  }
}

function reset() {
  document.getElementById("resetGame").className = "fas fa-meh";
  document.getElementById("resetGame").style.backgroundColor = "yellow";
  for (var i = grid.rows.length; i > 0; i--) {
    grid.deleteRow(i - 1);
  }
  document.getElementById("antalFlag").innerHTML = "Flag = " + bomber;

  clearInterval(interval);
  interval = undefined;
  timer.innerHTML = "000";
  timerPlus = 0;
}

function addMines(miner) {
  //Tilfældige miner
  for (let i = 0; i < miner; i++) {
    setMine();
  }
}

function setMine() {
  var row = Math.floor(Math.random() * gridSizeY);
  var col = Math.floor(Math.random() * gridSizeX);
  var cell = grid.rows[row].cells[col];
  if (cell.getAttribute("enMine")) {
    setMine();
  } else {
    cell.setAttribute("enMine", "true");
    if (testMode) {
      cell.className = "fas fa-bomb";
    }
  }
}

function tryk(celle) {
  if (!interval) {
    interval = setInterval(timerCall, 1000);
  }
  celle.className = "";
  let mineCount = 0;
  let cellIn = celle.cellIndex;
  let rowIn = celle.parentNode.rowIndex;
  if (celle.getAttribute("enMine") == "true") {
    celle.innerHTML = "";
    tjekOmTabt(celle);
  } else {
    for (let i = Math.max(rowIn - 1, 0); i <= Math.min(rowIn + 1, gridSizeY - 1); i++) {
      for (let j = Math.max(cellIn - 1, 0); j <= Math.min(cellIn + 1, gridSizeX - 1); j++) {
        if (grid.rows[i].cells[j].getAttribute("enMine")) {
          mineCount++;
        }
      }
    }
    celle.innerHTML = mineCount;
    mineNul(celle, mineCount);
  }
}

function mineNul(celle, mineCount) {
  let cellIn = celle.cellIndex;
  let rowIn = celle.parentNode.rowIndex;
  if (mineCount == 0) {
    for (let i = Math.max(rowIn - 1, 0); i <= Math.min(rowIn + 1, gridSizeY - 1); i++) {
      for (let j = Math.max(cellIn - 1, 0); j <= Math.min(cellIn + 1, gridSizeX - 1); j++) {
        if (grid.rows[i].cells[j].innerHTML == "") {
          tryk(grid.rows[i].cells[j]);
        }
        celle.innerHTML = mineCount;
      }
    }
  }
}

function visBomber() {
  for (let i = 0; i < gridSizeY; i++) {
    for (let j = 0; j < gridSizeX; j++) {
      let bum = grid.rows[i].cells[j];
      if (bum.getAttribute("enMine")) {
        if (bum.hasChildNodes()) {
          bum.removeChild(bum.firstChild);
          let bombe = document.createElement("i");
          bombe.className = "fas fa-bomb";
          bum.appendChild(bombe);
        } else {
          let bombe = document.createElement("i");
          bombe.className = "fas fa-bomb";
          bum.appendChild(bombe);
        }
      }
    }
  }
}

function toggleFlag(celle) {
  if (!interval) {
    interval = setInterval(timerCall, 1000);
  }
  if (celle.hasChildNodes()) {
    celle.removeChild(celle.firstChild);
  } else {
    let flag = document.createElement("i");
    flag.className = "fas fa-flag";
    celle.appendChild(flag);
  }
}

function tjekOmTabt(celle) {
  if (celle.getAttribute("enMine") == "true") {
    visBomber();
    let resets = document.getElementById("resetGame");
    resets.className = "fas fa-dizzy";
    resets.style.backgroundColor = "red";
    clearInterval(interval);
    interval = undefined;
    return;
  }
}

function tjekOmVundet() {
  let vundet = true;
  for (let i = 0; i < gridSizeY; i++) {
    for (let j = 0; j < gridSizeX; j++) {
      let cell = grid.rows[i].cells[j];
      if (cell.getAttribute("enMine") == "true") {
        if (!cell.hasChildNodes()) {
          vundet = false;
        }
      }

      if (cell.innerHTML == "") {
        vundet = false;
      }
      if (document.getElementsByClassName("fas fa-flag").length !== bomber) {
        vundet = false;
      }
    }
  }
  if (vundet) {
    visBomber();
    let resets = document.getElementById("resetGame");
    resets.className = "fas fa-laugh";
    resets.style.backgroundColor = "lightgreen";
    clearInterval(interval);
    interval = undefined;
    highScore();
    return;
  }
}

function antalFlag() {
  var antalFlag = document.getElementsByClassName("fas fa-flag").length;
  document.getElementById("antalFlag").innerHTML =
    "Flag = " + (bomber - antalFlag);
}

function highScore() {
  tidArray.push(timerPlus);
  tidArray.sort();
  let e = "<hr>";

  if (tidArray.length < 11) {
    for (let i = 0; i < tidArray.length; i++) {
      e += "Top " + (i + 1) + " = " + tidArray[i] + " Sekunder"+ "<br/>";

    }
  } else {
    tidArray.pop();
    for (let i = 0; i < tidArray.length; i++) {
      e += "Top " + (i + 1) + " = " + tidArray[i] + " Sekunder" + "<br/>";
    }
  }
  document.getElementById("tider").innerHTML = e;
}

function skiftBane() {
  console.log("Hello");
  if(gridSizeX == 10) {
    gridSizeX = 15;
    gridSizeY = 10;
    bomber = 30;
  } else if (gridSizeX == 15) {
    gridSizeX = 20;
    gridSizeY = 15;
    bomber = 50;
  } else if (gridSizeX == 20) {
    gridSizeX = 10;
    gridSizeY = 10;
    bomber = 20;
 }
}
