class Board {
  constructor() {
    this.board = {};
    this.player_pieces = [];
    this.ai_pieces = [];
    this.eleminated = [];
    this.movelog = [];
  }
  init_board_items() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board.set_board_item(i, j, null);
      }
    }
  }
  get_board_item(i, j) {
    return this.board[`${i}${j}`];
  }
  set_board_item(i, j, value) {
    this.board[`${i}${j}`] = value;
  }
  init_pieces() {
    for (let piece in this.board) {
      if (this.board[piece] === null) continue;
      else if (this.board[piece].color === "white") {
        if (this.board[piece].name === "king") {
          this.king_white = this.board[piece];
        }
        this.player_pieces.push(this.board[piece]);
      } else {
        if (this.board[piece].name === "king") {
          this.king_black = this.board[piece];
        }
        this.ai_pieces.push(this.board[piece]);
      }
    }
  }
  make_move(piece_, move, color) {
    let piece = this.get_board_item(move.dest.row, move.dest.col);
    if (color === "black" && piece !== null && piece.color === "white") {
      move.eleminated = piece;
      piece.is_eleminated = true;
      this.player_pieces = this.player_pieces.filter(
        (P) => P.row !== piece.row && P.row !== piece.col
      );
      this.eleminated.push(piece);
    }
    if (color === "white" && piece !== null && piece.color === "black") {
      move.eleminated = piece;
      piece.is_eleminated = true;
      this.ai_pieces = this.ai_pieces.filter(
        (P) => P.row !== piece.row && P.row !== piece.col
      );
      this.eleminated.push(piece);
    }

    this.set_board_item(piece_.row, piece_.col, null);
    piece_.row = move.dest.row;
    piece_.col = move.dest.col;
    this.set_board_item(piece_.row, piece_.col, piece_);
    this.movelog.push(move);
  }
  undo_move() {
    const move = this.movelog.pop();

    if (move.eleminated !== null) {
      move.eleminated.is_eleminated = false;
      this.set_board_item(move.dest.row, move.dest.col, move.eleminated);
      move.piece.row = move.start.row;
      move.piece.col = move.start.col;
      if (move.eleminated.color === "black") {
        this.ai_pieces.push(move.eleminated);
      }
      if (move.eleminated.color === "white") {
        this.player_pieces.push(move.eleminated);
      }
      this.eleminated = this.eleminated.filter(
        (ele_piece) =>
          ele_piece.row !== move.eleminated.row &&
          ele_piece.col !== move.eleminated.col
      );
      this.set_board_item(move.start.row, move.start.col, move.piece);
    } else {
      this.set_board_item(move.dest.row, move.dest.col, null);
      move.piece.row = move.start.row;
      move.piece.col = move.start.col;
      this.set_board_item(move.start.row, move.start.col, move.piece);
    }
  }
}

class Move {
  constructor(start, dest, piece) {
    this.start = start;
    this.dest = dest;
    this.piece = piece;
    this.eleminated = null;
  }
}
