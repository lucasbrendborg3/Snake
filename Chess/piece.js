function Piece(className, color, x, y) {
  this.className = className;
  this.color = color;
  this.x = x;
  this.y = y;
  this.id = String.fromCharCode(65+x) + (8-y);

  this.getPossibleMoves = function(board) {

    switch (this.className) {
      case 'pawn':
        return pawnMovements(this, board);

      case 'rook':
        return rookMovement(this, board);

      case 'bishop':
        return bishopMovement(this, board);

      case 'queen':
        return queenMovement(this, board);

      case 'king':
        return kingMovement(this, board);

      case 'knight':
        return knightMovement(this, board);


      default:
        return [];

    }
  }
}

function pawnMovements(piece, board) {
  let result = [];
  let yDir = (piece.color == 'piece-white' ? -1 : 1);

  let move = {x: piece.x, y: piece.y+yDir};

  if (board.isMoveValid(move)) {
    result.push(move);

    // Not moved
    if (piece.color == 'piece-white' && piece.y == 6) {
      move = {x: piece.x, y: piece.y-2};
      if (board.isMoveValid(move)) result.push(move);
    }
    if (piece.color == 'piece-black' && piece.y == 1) {
      move = {x: piece.x, y: piece.y+2};
      if (board.isMoveValid(move)) result.push(move);
    }
  }

  // xxx: skråt, står der en den kan slå?

  return result;
}

function rookMovement(piece, board) {
  let result = [];

  // right
  for (let x = piece.x+1; x < 8; x++) {
    let move = {x: x, y: piece.y};
    if (board.isMoveValid(move)) {
      result.push(move);
    } else {
      break;
    }
  }
  // left
  for (let x = piece.x-1; x >= 0; x--) {
    let move = {x: x, y: piece.y};
    if (board.isMoveValid(move)) {
      result.push(move);
    } else {
      break;
    }
  }
  // down
  for (let y = piece.y+1; y < 8; y++) {
    let move = {x: piece.x, y: y};
    if (board.isMoveValid(move)) {
      result.push(move);
    } else {
      break;
    }
  }
    // up
    for (let y = piece.y-1; y >= 0; y--) {
      let move = {x: piece.x, y: y};
      if (board.isMoveValid(move)) {
        result.push(move);
      } else {
        break;
      }
    }

  return result;
}

function bishopMovement(piece, board) {
  let result = [];

  // up and right
  for (let i = 1; piece.x + i < 8 && piece.y - i >= 0; i++) {
    let move = {x: piece.x + i, y: piece.y - i};
    if (board.isMoveValid(move)) {
      result.push(move);
    } else {
      break;
    }
  }
  // up and left
  for (let i = 1; piece.x - i >= 0 && piece.y - i >= 0; i++) {
    let move = {x: piece.x - i, y: piece.y - i};
    if (board.isMoveValid(move)) {
      result.push(move);
    } else {
      break;
    }
  }
  // down and right
  for (let i = 1; piece.x + i < 8 && piece.y + i < 8; i++) {
    let move = {x: piece.x + i, y: piece.y + i};
    if (board.isMoveValid(move)) {
      result.push(move);
    } else {
      break;
    }
  }
  // down and left
  for (let i = 1; piece.x - i >= 0 && piece.y + i < 8; i++) {
    let move = {x: piece.x - i, y: piece.y + i};
    if (board.isMoveValid(move)) {
      result.push(move);
    } else {
      break;
    }
  }

  return result;
}

function queenMovement(piece, board) {
 let result = [];
  result = result.concat(rookMovement(piece, board));
  result = result.concat(bishopMovement(piece, board));
  return result;
}

function kingMovement(piece, board) {
  let result = [];

  // højre
  let move = {x: piece.x + 1, y: piece.y};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // ned og højre
  move = {x: piece.x + 1, y: piece.y + 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // ned
  move = {x: piece.x , y: piece.y + 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  //ned og venstre
  move = {x: piece.x - 1, y: piece.y + 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // venstre
  move = {x: piece.x - 1, y: piece.y};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // op og venstre
  move = {x: piece.x - 1, y: piece.y - 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // op
  move = {x: piece.x, y: piece.y - 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // op og højre
  move = {x: piece.x + 1, y: piece.y - 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  return result;
}

function knightMovement(piece, board) {
  let result = [];

  // op og højre
  move = {x: piece.x + 1, y: piece.y - 2};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // op og venstre
  move = {x: piece.x - 1, y: piece.y - 2};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // højre og op
  move = {x: piece.x + 2, y: piece.y - 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // højre og ned
  move = {x: piece.x + 2, y: piece.y + 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // ned og højre
  move = {x: piece.x + 1, y: piece.y + 2};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // ned og venstre
  move = {x: piece.x - 1, y: piece.y + 2};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // venstre og ned
  move = {x: piece.x - 2, y: piece.y + 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  // venstre og op
  move = {x: piece.x - 2, y: piece.y - 1};
  if (board.isMoveValid(move)) {
    result.push(move);
  }

  return result;
}
