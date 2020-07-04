
//Generating grid
function generateGrid() {
  for (let i = 0; i < 8; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < 8; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() {
        onPress(this);
      };
    }
  }
  setTiles();
}

//Set tiles
function setTiles() {
  //Setting Pawn
  for (let i = 0; i <= 7; i++) {
    grid.rows[6].cells[i].innerHTML = "P";
    grid.rows[1].cells[i].innerHTML = "P";
    grid.rows[6].cells[i].id = "pawn" + i;
    grid.rows[1].cells[i].id = "pawn" + i;
    grid.rows[6].cells[i].className = "white";
    grid.rows[1].cells[i].className = "black";
  }
  //Setting Rook
  grid.rows[0].cells[0].innerHTML = "R";
  grid.rows[0].cells[7].innerHTML = "R";
  grid.rows[7].cells[0].innerHTML = "R";
  grid.rows[7].cells[7].innerHTML = "R";
  grid.rows[0].cells[0].id = "rook" + 1;
  grid.rows[0].cells[7].id = "rook" + 2;
  grid.rows[0].cells[0].className = "black";
  grid.rows[0].cells[7].className = "black";
  grid.rows[7].cells[0].id = "rook" + 1;
  grid.rows[7].cells[7].id = "rook" + 2;
  grid.rows[7].cells[0].className = "white";
  grid.rows[7].cells[7].className = "white";

  //Setting Knight
  grid.rows[0].cells[1].innerHTML = "K";
  grid.rows[0].cells[6].innerHTML = "K";
  grid.rows[7].cells[1].innerHTML = "K";
  grid.rows[7].cells[6].innerHTML = "K";
  grid.rows[0].cells[1].id = "knight" + 1;
  grid.rows[0].cells[6].id = "knight" + 2;
  grid.rows[0].cells[1].className = "black";
  grid.rows[0].cells[6].className = "black";
  grid.rows[7].cells[1].id = "knight" + 1;
  grid.rows[7].cells[6].id = "knight" + 2;
  grid.rows[7].cells[1].className = "white";
  grid.rows[7].cells[6].className = "white";

  //Setting Bishop
  grid.rows[0].cells[2].innerHTML = "B";
  grid.rows[0].cells[5].innerHTML = "B";
  grid.rows[7].cells[2].innerHTML = "B";
  grid.rows[7].cells[5].innerHTML = "B";
  grid.rows[0].cells[2].id = "bishop" + 1;
  grid.rows[0].cells[5].id = "rook" + 2;
  grid.rows[0].cells[2].className = "black";
  grid.rows[0].cells[5].className = "black";
  grid.rows[7].cells[2].id = "bishop" + 1;
  grid.rows[7].cells[5].id = "bishop" + 2;
  grid.rows[7].cells[2].className = "white";
  grid.rows[7].cells[5].className = "white";

  //Setting Kings and Queens
  grid.rows[0].cells[3].innerHTML = "Ki";
  grid.rows[0].cells[4].innerHTML = "Q";
  grid.rows[7].cells[3].innerHTML = "Ki";
  grid.rows[7].cells[4].innerHTML = "Q";
  grid.rows[0].cells[3].id = "king";
  grid.rows[0].cells[4].id = "queen";
  grid.rows[0].cells[3].className = "black";
  grid.rows[0].cells[4].className = "black";
  grid.rows[7].cells[3].id = "king";
  grid.rows[7].cells[4].id = "queen";
  grid.rows[7].cells[3].className = "white";
  grid.rows[7].cells[4].className = "white";
}
