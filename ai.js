function random_piece(color) {
  let randomekey;
  if (color === "white") {
    randomekey = Math.floor(Math.random() * board.player_pieces.length);
  } else {
    randomekey = Math.floor(Math.random() * board.ai_pieces.length);
  }
  let piece =
    color === "white"
      ? board.player_pieces[randomekey]
      : board.ai_pieces[randomekey];
  return [piece, randomekey];
}

function random_moves(board, color) {
  let moves = [];
  let [r_piece, randomkey] = random_piece(color);
  if (r_piece.is_eleminated) {
    while (!r_piece.is_eleminated) {
      [r_piece, randomkey] = random_piece(color);
      moves = r_piece.generate_moves(board);
    }
  } else {
    moves = r_piece.generate_moves(board);
    if (moves.length === 0) {
      while (true) {
        [r_piece, randomkey] = random_piece(color);
        moves = r_piece.generate_moves(board);
        if (moves.length > 0) break;
      }
    }
  }

  return [r_piece, moves, randomkey];
}

function random_move(board, color) {
  const [r_piece, moves, randomkey] = random_moves(board, color);
  let r_move = moves[Math.floor(Math.random() * moves.length)];
  return [r_piece, r_move, randomkey, moves];
}

function check_winner(board) {
  if (board.king_white.is_eleminated) {
    return "black";
  }
  if (board.king_black.is_eleminated) {
    return "white";
  }
  return "none";
}

// function evaluate(board) {
//   let total_eval = 0;
//   for (let b in board.board) {
//     let piece = board.board[b];
//     if (piece === null)
//       if (piece !== null) {
//         if (piece.is_eleminated !== false) {
//           total_eval += piece.color === "white" ? piece.points : -piece.points;
//         }
//       }
//   }
//   return total_eval;
// }

// function make_best_move(board) {
//   let score = -20000;
//   let best_move = null;
//   for (let i = 0; i < board.ai_pieces.length; i++) {
//     let piece = board.ai_pieces[i];
//     if (!piece.is_eleminated) {
//       let moves = piece.generate_moves(board);
//       if (moves.length === 0) continue;
//       for (let i = 0; i < moves.length; i++) {
//         let move = moves[i];
//         board.make_move(piece, move, "black");
//         let best_score = minimax(board, 4, true);
//         board.undo_move();
//         if (best_score >= score) {
//           score = best_score;
//           best_move = move;
//         }
//       }
//     }
//   }
//   console.log(board);

//   return best_move;
// }

// function minimax(board, depth, is_maximizing) {
//   if (depth === 0) {
//     return evaluate(board);
//   }
//   if (is_maximizing) {
//     let best_score = -20000;

//     for (let i = 0; i < board.player_pieces.length; i++) {
//       let piece = board.player_pieces[i];
//       if (!piece.is_eleminated) {
//         let moves = piece.generate_moves(board);
//         if (moves.length === 0) continue;
//         for (let i = 0; i < moves.length; i++) {
//           let move = moves[i];

//           board.make_move(piece, move, "white");
//           best_score = Math.max(
//             best_score,
//             minimax(board, depth - 1, !is_maximizing)
//           );
//           board.undo_move();
//         }
//       }
//     }

//     return best_score;
//   } else {
//     let best_score = 20000;

//     for (let i = 0; i < board.ai_pieces.length; i++) {
//       let piece = board.ai_pieces[i];
//       if (!piece.is_eleminated) {
//         let moves = piece.generate_moves(board);
//         if (moves.length === 0) continue;
//         for (let i = 0; i < moves.length; i++) {
//           let move = moves[i];

//           board.make_move(piece, move, "black");
//           best_score = Math.min(
//             best_score,
//             minimax(board, depth - 1, !is_maximizing)
//           );
//           board.undo_move();
//         }
//       }
//     }
//     return best_score;
//   }
// }
