var grid = document.getElementById("grid");
var turn = "white";
generateGrid();

//Checking pressed tile
function onPress(cell) {
  if (turn === cell.className) {
    console.log("Hello!");
  }
}
