var game = document.getElementById("canvas");
var context = game.getContext("2d");
var test = document.getElementById("test");
var test2 = document.getElementById("test2");
var direction;
var hastighed = 200;
var intervalPlane;
var intervalSnake;
var plane = {
  x: 350,
  y: 490,
  width: 10,
  height: 10
}
var snake = {
  x: 10,
  y: 10,
  width: 15,
  height: 15
}
var snakeCells = [];
movePlane();
snakeMove();

document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
        case 37: // left
        test.innerHTML = "Left";
        direction = "left";
        movePlane();
        break;

        case 38: // up
        test.innerHTML = "Up";
        direction = "up";
        movePlane();
        break;

        case 39: // right
        test.innerHTML = "Right";
        direction = "right";
        movePlane();
        break;

        case 40: // down
        test.innerHTML = "Down";
        direction = "down";
        movePlane();
        break;

        case 32: // space
        skyd();
        break;

        default: return;
    }
    e.preventDefault();
};

function movePlane() {
  context.fillStyle = "yellow";
  context.fillRect(plane.x, plane.y, plane.width, plane.height);
  if (direction === "left") {
    context.clearRect(plane.x, plane.y, plane.width, plane.height);
    plane.x -= 5;
    context.fillRect(plane.x, plane.y, plane.width, plane.height);
  }
  if (direction === "up") {
    context.clearRect(plane.x, plane.y, plane.width, plane.height);
    plane.y -= 5;
    context.fillRect(plane.x, plane.y, plane.width, plane.height);
  }
  if (direction === "right") {
    context.clearRect(plane.x, plane.y, plane.width, plane.height);
    plane.x += 5;
    context.fillRect(plane.x, plane.y, plane.width, plane.height);
  }
  if (direction === "down") {
    context.clearRect(plane.x, plane.y, plane.width, plane.height);
    plane.y += 5;
    context.fillRect(plane.x, plane.y, plane.width, plane.height);
  }
}

function skyd() {
  let x = plane.x+4;
  let y = plane.y-11;
  intervalPlane = setInterval(function() {
    context.fillStyle = "red";
    context.clearRect(x, y--, 2, 10.5);
    context.fillRect(x, y--, 2, 10);
  }, 3);
}

function snakeMove() {
  intervalSnake = setInterval(function() {
    snake.x += 15;
    context.fillStyle = "green";
    context.fillRect(snake.x+1, snake.y+1, snake.width, snake.height);
      snakeCells.push({
      x: snake.x,
      y: snake.y,
      width: snake.width,
      height: snake.height});
      if (snakeCells.length > 8) {
        context.clearRect(snakeCells[0].x, snakeCells[0].y, snakeCells[0].width+2, snakeCells[0].height+2)
        snakeCells.shift();
    }
  }, 100)
}
