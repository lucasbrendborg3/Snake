
var game = document.getElementById("canvas");
var context = game.getContext("2d");
var direction;
var hastighed = 200;
context.fillstyle = "black";
var test = document.getElementById("test");
var test2 = document.getElementById("test2");
var cells = [{x: 0,y: 0}, {x: 0,y: 0}, {x: 0,y: 0}];
var maxcells = 4;
var appleLoc;
var snake = {
  x: 0,
  y: 0,
  width: 13,
  height: 13,
}
var interval = setInterval(snakeMove, hastighed);
apple();

function snakeMove() {
  if (direction === "left") {
    snake.x -= 15;
  }
  if (direction === "up") {
    snake.y -= 15;
  }
  if (direction === "right") {
    snake.x += 15;
  }
  if (direction === "down") {
    snake.y += 15;
  }

  context.fillRect(snake.x+1, snake.y+1, snake.width, snake.height);
    cells.push({
    x: snake.x,
    y: snake.y,
    width: snake.width,
    height: snake.height});
    if (cells.length > maxcells) {
      context.clearRect(cells[0].x, cells[0].y, cells[0].width+2, cells[0].height+2)
      cells.shift();
    }
    checkApple();
    checkTail();
    test2.innerHTML = "Score: " + cells.length;
}

function apple() {
  let x = (Math.floor(Math.random() * Math.floor(39))) * 15;
  let y = (Math.floor(Math.random() * Math.floor(39))) * 15;
  context.fillStyle = "red";
  context.fillRect(x+1, y+1, 13, 13);
  context.fillStyle = "green";
  appleLoc = {
    x: x,
    y: y
  }
}

function checkApple() {
  if (appleLoc.x === cells[maxcells-1].x && appleLoc.y === cells[maxcells-1].y) {
    maxcells++;
    apple();
  }
}

function checkTail() {
  for (let i; i < maxcells; i++) {
    for (let j; j < maxcells; j++) {
    if (cells[i].x === cells[j].x && cells[i].y === cells[j].y) {
      console.log("You dead!!");
       }
     }
   }
}


document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
        case 37: // left
        left();
        break;

        case 38: // up
        up();
        break;

        case 39: // right
        right();
        break;

        case 40: // down
        down();
        break;

        default: return;
    }
    e.preventDefault();
};

function left() {
  test.innerHTML = "Left";
  direction = "left";
}

function up() {
  test.innerHTML = "Up";
  direction = "up";
}

function right() {
  test.innerHTML = "Right";
  direction = "right";
}

function down() {
  test.innerHTML = "Down";
  direction = "down";
}



console.log("Hello");
