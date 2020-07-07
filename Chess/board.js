function Board() {
  let grid = document.getElementById("grid");
  this.blackPieces = [];
  this.whitePieces = [];
  let selPiece;
  let turn = "white";

  this.init = function() {
    this.blackPieces = this.createPieces({pawns: 1, officers: 0}, "piece-black");
    this.whitePieces = this.createPieces({pawns: 6, officers: 7}, "piece-white");
    this.createGrid();
    this.placePieces(this.blackPieces);
    this.placePieces(this.whitePieces);

  }

  this.render = function() {

  }

  this.createGrid = function() {
    let thiz = this;

    for (let i = 0; i < 8; i++) {
      row = grid.insertRow(i);
      for (let j = 0; j < 8; j++) {
        cell = row.insertCell(j);
        cell.className = "bg-white ";
        if ((i + j) %2 == 0) {
          cell.className = "bg-sort ";
        }
        cell.onclick = function(node) {
          // get id from createGrid

          let piece = thiz.findPiece(node);

          // xxx: if dark-mode node then move sel piece


          thiz.showPossibleMoves(piece);
          thiz.movePiece(node);
        }
      }
    }
  }

  this.createPieces = function(rows, color) {
    let result = [];

    for (let i = 0; i < 8; i++) {
      result.push(new Piece("pawn", color, i, rows.pawns));
    }

    result.push(new Piece("rook", color, 0 ,rows.officers))
    result.push(new Piece("rook", color, 7 ,rows.officers))

    result.push(new Piece("knight", color, 1 ,rows.officers))
    result.push(new Piece("knight", color, 6 ,rows.officers))

    result.push(new Piece("bishop", color, 2 ,rows.officers))
    result.push(new Piece("bishop", color, 5 ,rows.officers))

    result.push(new Piece("queen", color, 4 ,rows.officers))
    result.push(new Piece("king", color, 3 ,rows.officers))

    return result;
  }

  this.placePieces = function(pieces) {
    pieces.forEach(function(piece) {
      grid.rows[piece.y].cells[piece.x].innerHTML = piece.className;
      grid.rows[piece.y].cells[piece.x].className += piece.color + " " + piece.className;
      grid.rows[piece.y].cells[piece.x].id = piece.id;

    });
  }

  this.isMoveValid = function(move) {
    if (move.x < 0 || move.x > 7 || move.y < 0 || move.y > 7) return false;
    return grid.rows[move.y].cells[move.x].className.indexOf("piece") < 0;

  }



  // find piece
  this.findPiece = function(node) {
    let id = node.path[0].id;
    let piece;
    if (node.path[0].className.indexOf('piece-white') >= 0) {
      piece = this.whitePieces.find(function(el) {
        if (el.id == id)
          return true;
      });

    } else {
      piece = this.blackPieces.find(function(el) {
        if (el.id == id)
          return true;
      });
    }
    return piece;
  }

  // get possible moves
  this.showPossibleMoves = function(piece) {
    if (piece) {
      if (selPiece) {
        selPiece.getPossibleMoves(this).forEach(function(move) {
          grid.rows[move.y].cells[move.x].classList.toggle("dark-mode");
          grid.rows[move.y].cells[move.x].id = move.x + "," + move.y;
        });
      }
      piece.getPossibleMoves(this).forEach(function(move) {
        grid.rows[move.y].cells[move.x].classList.toggle("dark-mode");
        grid.rows[move.y].cells[move.x].id = move.x + "," + move.y;
      });
      selPiece = piece;
    }
  }

  this.movePiece = function(node) {
    console.log('selPiece= ', selPiece, 'node= ', node);

    if (node.path[0].className.indexOf('dark-mode') >= 0) {
      let id = node.path[0].id;
      let idChar = id.split('');
      if (turn == "white") {
        let indexArr = this.whitePieces.indexOf(selPiece);
        if (indexArr > -1) {
          this.whitePieces.splice(indexArr, 1);

          this.whitePieces.push(new Piece(selPiece.className, 'piece-white', Number(idChar[0]), Number(idChar[2]), String.fromCharCode(65+idChar[0]) + (8-idChar[2])))

        }

        turn = "black";

      } else if (turn == "black") {
        let indexArr = this.blackPieces.indexOf(selPiece);
        if (indexArr > -1) {
          this.blackPieces.splice(indexArr, 1);

          this.blackPieces.push(new Piece(selPiece.className, 'piece-black', Number(idChar[0]), Number(idChar[2]), String.fromCharCode(65+idChar[0]) + (8-idChar[2])))

        }

        turn = "white";
      }
      grid.rows[idChar[2]].cells[idChar[0]].innerHTML = selPiece.className;
      grid.rows[idChar[2]].cells[idChar[0]].className += selPiece.color + " " + selPiece.className;
      grid.rows[idChar[2]].cells[idChar[0]].id = selPiece.id;

      grid.rows[selPiece.y].cells[selPiece.x].className -= selPiece.innerHTML;
      grid.rows[selPiece.y].cells[selPiece.x].innerHTML = "";
      grid.rows[selPiece.y].cells[selPiece.x].id = "";

      console.log('black-pieces ', this.blackPieces, ', ', 'white-pieces ', this.whitePieces);


    }

  }
}
