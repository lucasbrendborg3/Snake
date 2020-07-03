document.getElementById("grid");

generateGrid();


function generateGrid() {
  for (let i = 0; i < 10; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < 10; j++) {
      cell = row.insertCell(j);
    }
  }
}
