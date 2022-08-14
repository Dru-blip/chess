let boardEle = document.getElementById("board");
// let spin=document.getElementById("spin");

let board = new Board();

board.init_board_items();

function generate_moves(i, j) {
  let piece = board.get_board_item(i, j);
  return piece.generate_moves(board);
}

function display_moves(e) {
  const moves = generate_moves(e.target.id[0], e.target.id[1]);
  for (let i = 0; i < moves.length; i++) {
    const ele = document.getElementById(
      `${moves[i].dest.row}${moves[i].dest.col}`
    );
    ele.classList.toggle("piece-drag-hover");
  }
  return moves;
}

function add_pieces(color, i, j) {
  let piece;
  let code = "b";
  let rows = [7, 6];
  if (color !== "black") {
    code = "w";
    rows = [0, 1];
  }
  let img = document.createElement("img");
  if (i === rows[1]) {
    img.src = `./resources/pawn-${code}.svg`;
    piece = "pawn";
  }
  if (i === rows[0]) {
    if (j === 0 || j === 7) {
      img.src = `./resources/rook-${code}.svg`;
      piece = "rook";
    }
    if (j === 1 || j === 6) {
      img.src = `./resources/knight-${code}.svg`;
      piece = "knight";
    }
    if (j === 2 || j === 5) {
      img.src = `./resources/bishop-${code}.svg`;
      piece = "bishop";
    }
    if (j === 3) {
      img.src = `./resources/queen-${code}.svg`;
      piece = "queen";
    }
    if (j === 4) {
      img.src = `./resources/king-${code}.svg`;
      piece = "king";
    }
  }
  img.classList.add("piece");
  // img.addEventListener("rotate",(e)=>{
  //    console.log(e);
  // });
  img.setAttribute("id", `${i}${j}piece`);

  if (color === "white") {
    img.setAttribute("draggable", true);
    img.addEventListener("dragstart", (e) =>
      dragStart(e, generate_moves, board)
    );
    img.addEventListener("dragend", (e) => dragEnd(e, generate_moves, i, j));
  }

  return [img, piece];
}

function create_board() {
  for (let i = 0; i < 8; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 8; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      if ((i + j) % 2 === 0) {
        cell.classList.add("cell-white");
      } else {
        cell.classList.add("cell-black");
      }

      cell.setAttribute("id", `${i}${j}`);

      if (i === 0 || i === 1) {
        let [img, piece] = add_pieces("white", i, j);
        cell.appendChild(img);
        board.set_board_item(i, j, create_piece_object(piece, "white", i, j));
      }

      if (i === 6 || i === 7) {
        let [img, piece] = add_pieces("black", i, j);
        cell.appendChild(img);
        board.set_board_item(i, j, create_piece_object(piece, "black", i, j));
      }
      cell.addEventListener("dragover", dragOver);
      cell.addEventListener("dragenter", dragEnter);
      cell.addEventListener("dragleave", dragLeave);
      cell.addEventListener("drop", (e) => dragDrop(e, generate_moves, board));
      row.appendChild(cell);
    }
    boardEle.appendChild(row);
  }
}

function create_piece_object(piece, color, x, y) {
  let piece_;
  switch (piece) {
    case "king": {
      piece_ = new King(x, y, color, 5000);
      break;
    }
    case "queen": {
      piece_ = new Queen(x, y, color, 1000);
      break;
    }
    case "rook": {
      piece_ = new Rook(x, y, color, 500);
      break;
    }
    case "knight": {
      piece_ = new Knight(x, y, color, 250);
      break;
    }
    case "bishop": {
      piece_ = new Bishop(x, y, color, 150);
      break;
    }
    case "pawn": {
      piece_ = new Pawn(x, y, color, 50);
      break;
    }
  }
  return piece_;
}

create_board();
board.init_pieces();

// spin.addEventListener("click",(e)=>{
//   boardEle.classList.toggle("board-rotate");
//   // document.dispatchEvent(new CustomEvent("rotate",{
//     // bubbles:true
//   // }));
//   console.log(e);
// });



// let turn = true;
// while (check_winner(board) === null) {
//   if (turn) {
//     const [r_piece, r_move, moves] = board.make_move("white");
//     turn = false;
//     console.log(r_move);
//     if (check_winner(board) !== null) break;
//   } else {
//     const [r_piece, r_move, moves] = board.make_move("black");
//     turn = true;
//     console.log(r_move);
//     if (check_winner(board) !== null) break;
//   }
// }

// const [r_piece, r_move, moves] = board.make_move("white");
