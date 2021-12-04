/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  // part 1
  let part1Answer = null;
  let part2Answer = null;

  // parse the first line
  const draws = _.map(_.split(input[0], ','), i => parseInt(i, 10));

  const boards = [];
  const boardsMatched = [];
  const winningBoards = new Set();

  // dump the drawn numbers line
  input.shift();
  // dump the empty line
  input.shift();

  let board = 0;
  let row = 0;
  _.each(input, line => {
    if (!line) {
      // new board on an empty line
      board += 1;
      row = 0;
    } else {
      const values = _.map(_.filter(_.split(line, ' ')), i => parseInt(i, 10));
      if (!boards[board]) {
        boards[board] = [];
        boardsMatched[board] = [];
      }
      boards[board][row] = values;
      boardsMatched[board][row] = [false, false, false, false, false];
      row += 1;
    }
  });

  let winningDraw = null;
  // process each number drawn
  _.each(draws, draw => {
    _.each(boards, (board, boardIdx) => {

      // look over each board to see if it has the drawn number
      _.each(board, (row, rowIdx) => {
        _.each(row, (value, valueIdx) => {
          if (value === draw) {
            // mark it
            boardsMatched[boardIdx][rowIdx][valueIdx] = true;
          }
        });
      });

      // check for bingo
      if (!winningBoards.has(boardIdx)) {
        let bingo = false;
        for(let i = 0; i < board.length; i += 1) {
          // check row i
          if (_.every(boardsMatched[boardIdx][i])) {
            bingo = true;
          }

          // check column i
          let allMatched = true;
          for (let j = 0; j < board.length; j += 1) {
            if (!boardsMatched[boardIdx][j][i]) {
              allMatched = false;
              // early break since we've found a cell that isn't marked, not a bingo
              break;
            }
          }

          // found a column match
          if (allMatched) {
            bingo = true;
          }

          if (bingo) {
            winningBoards.add(boardIdx);
            winningDraw = draw;
            // calculate the answer
            let sum = 0;
            for (let i = 0; i < board.length; i += 1) {
              for (let j = 0; j < board.length; j += 1) {
                if (!boardsMatched[boardIdx][i][j]) {
                  sum += boards[boardIdx][i][j];
                }
              }
            }
            if (winningBoards.size === 1) {
              part1Answer = winningDraw * sum;
            }
            if (winningBoards.size === boards.length) {
              part2Answer = winningDraw * sum;
            }
            break;
          }
        }
      }
    });
    return true;
  });


  console.log(`Part 1: ${part1Answer}`);
  console.log(`Part 2: ${part2Answer}`);
}

export default solve;
