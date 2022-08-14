class Piece {
  constructor(name, row, col, color, points) {
    this.name = name;
    this.row = row;
    this.col = col;
    this.color = color;
    this.points = points;
    this.is_eleminated = false;
  }
  create_new_move() {}
  generate_horizontal_moves(board) {
    let moves = [];

    let row = this.row;
    let col = this.col;

    //south
    while (row + 1 < 8) {
      row = row + 1;
      let piece = board.get_board_item(row, col);

      if (piece !== null && piece.color === this.color) {
        break;
      }
      if (piece !== null && piece.color !== this.color) {
        let move = new Move(
          { row: this.row, col: this.col },
          { row, col },
          this
        );
        moves.push(move);
        break;
      }
      moves.push(
        new Move({ row: this.row, col: this.col }, { row, col }, this)
      );
    }

    //north
    row = this.row;
    col = this.col;
    while (row - 1 >= 0) {
      row = row - 1;
      let piece = board.get_board_item(row, col);
      if (piece !== null && piece.color === this.color) {
        break;
      }
      if (piece !== null && piece.color !== this.color) {
        moves.push(
          new Move({ row: this.row, col: this.col }, { row, col }, this)
        );
        break;
      }
      moves.push(
        new Move({ row: this.row, col: this.col }, { row, col }, this)
      );
    }

    //east
    row = this.row;
    col = this.col;
    while (col + 1 < 8) {
      col = col + 1;
      let piece = board.get_board_item(row, col);
      if (piece !== null && piece.color === this.color) {
        break;
      }
      if (piece !== null && piece.color !== this.color) {
        moves.push(
          new Move({ row: this.row, col: this.col }, { row, col }, this)
        );
        break;
      }
      moves.push(
        new Move({ row: this.row, col: this.col }, { row, col }, this)
      );
    }

    //west
    row = this.row;
    col = this.col;
    while (col - 1 >= 0) {
      col = col - 1;
      let piece = board.get_board_item(row, col);
      if (piece !== null && piece.color === this.color) {
        break;
      }
      if (piece !== null && piece.color !== this.color) {
        moves.push(
          new Move({ row: this.row, col: this.col }, { row, col }, this)
        );
        break;
      }
      moves.push(
        new Move({ row: this.row, col: this.col }, { row, col }, this)
      );
    }

    return moves;
  }

  generate_diagonal_moves(board) {
    let moves = [];

    //north-east
    let row = this.row;
    let col = this.col;
    while (row - 1 >= 0 && col + 1 < 8) {
      row = row - 1;
      col = col + 1;
      let piece = board.get_board_item(row, col);
      if (piece !== null && piece.color === this.color) {
        break;
      }
      if (piece !== null && piece.color !== this.color) {
        moves.push(
          new Move({ row: this.row, col: this.col }, { row, col }, this)
        );
        break;
      }
      moves.push(
        new Move({ row: this.row, col: this.col }, { row, col }, this)
      );
    }

    //north-west
    row = this.row;
    col = this.col;
    while (row - 1 >= 0 && col - 1 >= 0) {
      row = row - 1;
      col = col - 1;
      let piece = board.get_board_item(row, col);
      if (piece !== null && piece.color === this.color) {
        break;
      }
      if (piece !== null && piece.color !== this.color) {
        moves.push(
          new Move({ row: this.row, col: this.col }, { row, col }, this)
        );
        break;
      }
      moves.push(
        new Move({ row: this.row, col: this.col }, { row, col }, this)
      );
    }

    row = this.row;
    col = this.col;
    while (row + 1 < 8 && col + 1 < 8) {
      row = row + 1;
      col = col + 1;
      let piece = board.get_board_item(row, col);
      if (piece !== null && piece.color === this.color) {
        break;
      }
      if (piece !== null && piece.color !== this.color) {
        moves.push(
          new Move({ row: this.row, col: this.col }, { row, col }, this)
        );
        break;
      }
      moves.push(
        new Move({ row: this.row, col: this.col }, { row, col }, this)
      );
    }

    row = this.row;
    col = this.col;
    while (row + 1 < 8 && col - 1 >= 0) {
      row = row + 1;
      col = col - 1;
      let piece = board.get_board_item(row, col);
      if (piece !== null && piece.color === this.color) {
        break;
      }
      if (piece !== null && piece.color !== this.color) {
        moves.push(
          new Move({ row: this.row, col: this.col }, { row, col }, this)
        );
        break;
      }
      moves.push(
        new Move({ row: this.row, col: this.col }, { row, col }, this)
      );
    }

    return moves;
  }
}

class Pawn extends Piece {
  constructor(row, col, color, points) {
    super("pawn", row, col, color, points);
    this.max_steps = 2;
    this.min_steps = 1;
  }
  generate_moves(board) {
    let moves = [];
    let piece, row, col;
    row = this.row;
    col = this.col;
    if (this.color === "white") {
      if (row + this.min_steps < 8) {
        piece = board.get_board_item(row + this.min_steps, col);

        if (piece !== null) {
        } else {
          moves.push(
            new Move(
              { row: this.row, col: this.col },
              { row: row + this.min_steps, col: col },
              this
            )
          );
        }
      }
      row = this.row;
      col = this.col;
      if (row + 1 < 8 && col + 1 < 8) {
        row = row + 1;
        col = col + 1;
        piece = board.get_board_item(row, col);

        if (piece !== null && piece.color === "black") {
          moves.push(
            new Move({ row: this.row, col: this.col }, { row, col }, this)
          );
        }
      }
      row = this.row;
      col = this.col;
      if (row + 1 < 8 && col - 1 >= 0) {
        row = row + 1;
        col = col - 1;
        piece = board.get_board_item(row, col);
        if (piece !== null && piece.color === "black") {
          moves.push(
            new Move({ row: this.row, col: this.col }, { row, col }, this)
          );
        }
      }
    } else {
      row = this.row;
      col = this.col;
      if (row - 1 >= 0 && col - 1 >= 0) {
        row = row - 1;
        col = col - 1;
        piece = board.get_board_item(row, col);
        if (piece !== null && piece.color === "white") {
          moves.push(
            new Move({ row: this.row, col: this.col }, { row, col }, this)
          );
        }
      }
      row = this.row;
      col = this.col;
      if (row - 1 >= 0 && col + 1 < 8) {
        row = row - 1;
        col = col + 1;
        piece = board.get_board_item(row, col);
        if (piece !== null && piece.color === "black") {
          moves.push(
            new Move({ row: this.row, col: this.col }, { row, col }, this)
          );
        }
      }
      row = this.row;
      col = this.col;
      if (row - this.min_steps >= 0) {
        row = row - this.min_steps;
        piece = board.get_board_item(row, col);
        if (piece !== null) {
        } else {
          moves.push(
            new Move({ row: this.row, col: this.col }, { row, col }, this)
          );
        }
      }
    }

    return moves;
  }
}

class Rook extends Piece {
  constructor(row, col, color, points) {
    super("rook", row, col, color, points);
  }
  generate_moves(board) {
    return this.generate_horizontal_moves(board);
  }
}

class Bishop extends Piece {
  constructor(row, col, color, points) {
    super("bishop", row, col, color, points);
  }
  generate_moves(board) {
    return this.generate_diagonal_moves(board);
  }
}

class Knight extends Piece {
  constructor(row, col, color, points) {
    super("knight", row, col, color, points);
  }
  generate_moves() {
    let moves = [];
    let lmoves = [];

    //south-east
    let se = [this.row + 1, this.col + 1];

    //south-west
    let sw = [this.row + 1, this.col - 1];

    //north-east
    let ne = [this.row - 1, this.col + 1];

    //north-west
    let nw = [this.row - 1, this.col - 1];

    if (ne[1] + 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: ne[0], col: ne[1] + 1 },
          this
        )
      );
    }

    if (ne[0] - 1 >= 0) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: ne[0] - 1, col: ne[1] },
          this
        )
      );
    }

    if (nw[1] - 1 >= 0) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: nw[0], col: nw[1] - 1 },
          this
        )
      );
    }

    if (nw[0] - 1 >= 0) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: nw[0] - 1, col: nw[1] },
          this
        )
      );
    }

    if (se[0] + 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: se[0] + 1, col: se[1] },
          this
        )
      );
    }

    if (se[1] + 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: se[0], col: se[1] + 1 },
          this
        )
      );
    }

    if (sw[0] + 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: sw[0] + 1, col: sw[1] },
          this
        )
      );
    }

    if (sw[1] - 1 >= 0) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: sw[0], col: sw[1] - 1 },
          this
        )
      );
    }

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      if (
        move.dest.row >= 0 &&
        move.dest.row < 8 &&
        move.dest.col < 8 &&
        move.dest.col >= 0
      ) {
        let curr_piece = board.get_board_item(move.dest.row, move.dest.col);
        if (curr_piece !== null && curr_piece.color === this.color) {
          continue;
        } else {
          lmoves.push(move);
        }
      }
    }

    return lmoves;
  }
}

class Queen extends Piece {
  constructor(row, col, color, points) {
    super("queen", row, col, color, points);
  }
  generate_moves(board) {
    let moves = [];

    let hmoves = this.generate_horizontal_moves(board);
    let dmoves = this.generate_diagonal_moves(board);
    moves = [...hmoves, ...dmoves];

    return moves;
  }
}

class King extends Piece {
  constructor(row, col, color, points) {
    super("king", row, col, color, points);
  }
  generate_moves(board) {
    let moves = [];
    let lmoves = [];
    //south
    if (this.row + 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: this.row + 1, col: this.col },
          this
        )
      );
    }
    //north
    if (this.row - 1 >= 0 && this.row - 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: this.row - 1, col: this.col },
          this
        )
      );
    }
    //east
    if (this.col + 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: this.row, col: this.col + 1 },
          this
        )
      );
    }
    //west
    if (this.col - 1 >= 0 && this.col - 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: this.row, col: this.col - 1 },
          this
        )
      );
    }

    //south-east
    if (this.col + 1 < 8 && this.row + 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: this.row + 1, col: this.col + 1 },
          this
        )
      );
    }

    //south-west
    if (this.col - 1 >= 0 && this.row + 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: this.row + 1, col: this.col - 1 },
          this
        )
      );
    }

    //north-east
    if (this.row - 1 >= 0 && this.col + 1 < 8) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: this.row - 1, col: this.col + 1 },
          this
        )
      );
    }
    //north-west
    if (this.row - 1 >= 0 && this.col - 1 >= 0) {
      moves.push(
        new Move(
          { row: this.row, col: this.col },
          { row: this.row - 1, col: this.col - 1 },
          this
        )
      );
    }

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];

      let curr_piece = board.get_board_item(move.dest.row, move.dest.col);
      if (curr_piece !== null && curr_piece.color === this.color) {
        continue;
      } else {
        lmoves.push(move);
      }
    }
    return lmoves;
  }
}
