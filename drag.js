const audio = new Audio(
  "./resources/EU73VUY-object-table-game-chess-piece-place-01.mp3"
);

function dragStart(e, generate_moves, board) {
  let piece = board.get_board_item(e.target.id[0], e.target.id[1]);
  if (piece.color === "white") {
    let moves = generate_moves(e.target.id[0], e.target.id[1]);
    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      const ele = document.getElementById(`${move.dest.row}${move.dest.col}`);
      let piece = board.get_board_item(move.dest.row, move.dest.col);
      if (piece !== null) {
        ele.classList.add("piece-enemy");
      } else {
        ele.classList.add("piece-drag-hover");
      }
    }
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.setData("color", piece.color);
    e.dataTransfer.effectAllowed = "all";
  }
}

function dragEnd(e) {
  // let move = make_best_move(board);
  // let ele = document.getElementById(`${move.start.row}${move.start.col}`);
  // let img = ele.lastChild;
  // img.removeAttribute("id");
  // img.setAttribute("id", `${move.dest.row}${move.dest.col}piece`);
  // let target_ele = document.getElementById(`${move.dest.row}${move.dest.col}`);
  // if (move.eleminated !== null) {
  //   move.eleminated.is_eleminated = true;
  //   board.player_pieces = board.player_pieces.filter(
  //     (p) => move.eleminated.row !== p.row && move.eleminated.col !== p.col
  //   );
  //   target_ele.innerHTML = "";
  // }
  // ele.innerHTML = "";
  // board.set_board_item(move.start.row, move.start.col, null);
  // move.piece.row = move.dest.row;
  // move.piece.col = move.dest.col;
  // board.set_board_item(move.dest.row, move.dest.col, move.piece);
  // target_ele.appendChild(img);
  // board.movelog.push(move);
  // evaluate(board);
  // const [r_piece, move, randomkey, moves] = random_move(board, "black");
  // const [r_piece, move, randomkey, moves] = random_move(board);
  // if (moves.length === 0) {
  // } else {
  //   for (let i = 0; i < moves.length; i++) {
  //     let move = moves[i];
  //     const ele = document.getElementById(`${move.dest.row}${move.dest.col}`);
  //     let piece = board.get_board_item(move.dest.row, move.dest.col);
  //     if (piece !== null && piece.color !== r_piece.color) {
  //       ele.classList.add("ai-attack-piece");
  //     } else {
  //       // ele.classList.add("ai-move-hover");
  //     }
  //   }
  //   let ele = document.getElementById(`${r_piece.row}${r_piece.col}`);
  //   let img = ele.lastChild;
  //   img.removeAttribute("id");
  //   img.setAttribute("id", `${move.dest.row}${move.dest.col}piece`);
  //   let target_ele = document.getElementById(
  //     `${move.dest.row}${move.dest.col}`
  //   );
  //   if (target_ele.className.includes("ai-attack-piece")) {
  //     board.set_board_item(r_piece.row, r_piece.col, null);
  //     target_ele.innerHTML = "";
  //     target_ele.appendChild(img);
  //     r_piece.row = move.dest.row;
  //     r_piece.col = move.dest.col;
  //     board.set_board_item(move.dest.row, move.dest.col, r_piece);
  //     target_ele.classList.remove("ai-attack-piece");
  //   } else {
  //     if (target_ele.childNodes.length === 0) {
  //       target_ele.appendChild(img);
  //       board.set_board_item(r_piece.row, r_piece.col, null);
  //       r_piece.row = move.dest.row;
  //       r_piece.col = move.dest.col;
  //       board.set_board_item(move.dest.row, move.dest.col, r_piece);
  //       ele.innerHTML = "";
  //     }
  //   }
  //   // }
  //   // for (let i = 0; i < moves.length; i++) {
  //   //   let move = moves[i];
  //   //   const ele = document.getElementById(`${move.row}${move.col}`);
  //   //   // let piece = get_board_item(move.row, move.col);
  //   //   ele.classList.remove("ai-attack-piece");
  //   // }
  // }
}

function dragOver(e) {
  e.preventDefault();
  if (e.target.className.includes("piece-drag-hover")) {
  }
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave(e) {
  e.preventDefault();
}

function check_piece(row, col, moves) {
  flag = false;
  let expected_move = null;
  for (let i = 0; i < moves.length; i++) {
    let move = moves[i];
    if (
      move.dest.row === Number.parseInt(row) &&
      move.dest.col === Number.parseInt(col)
    ) {
      flag = true;
      expected_move = move;
    }
  }
  return [flag, expected_move];
}

function dragDrop(e, generate_moves, board) {
  e.preventDefault();
  console.log(e.target);
  if (e.dataTransfer.getData("color") === "white") {
    const id = e.dataTransfer.getData("text/plain");
    let moves = generate_moves(id[0], id[1]);
    const [flag, move] = check_piece(e.target.id[0], e.target.id[1], moves);
    if (flag) {
      const draggedElement = document.getElementById(id);
      draggedElement.removeAttribute("id");
      draggedElement.setAttribute("id", `${e.target.id}piece`);
      if (e.target.parentNode.className.includes("piece-enemy")) {
        let parent = e.target.parentNode;
        let ele_piece = board.get_board_item(e.target.id[0], e.target.id[1]);
        ele_piece.is_eleminated = true;
        move.eleminated = ele_piece;
        board.eleminated.push(ele_piece);
        parent.removeChild(e.target);
        parent.appendChild(draggedElement);
      }
      if (e.target.className.includes("piece-drag-hover")) {
        e.target.appendChild(draggedElement);
      }
      board.movelog.push(move);
      let curr_id = e.target.id;
      let start_ele = board.get_board_item(id[0], id[1]);
      start_ele.row = Number.parseInt(curr_id[0]);
      start_ele.col = Number.parseInt(curr_id[1]);
      board.set_board_item(curr_id[0], curr_id[1], start_ele);
      board.set_board_item(id[0], id[1], null);
      audio.play();
      for (let i = 0; i < moves.length; i++) {
        const ele = document.getElementById(
          `${moves[i].dest.row}${moves[i].dest.col}`
        );
        ele.classList.remove("piece-drag-hover");
        if (ele.className.includes("piece-enemy")) {
          ele.classList.remove("piece-enemy");
        }
      }
    }
  }
}
