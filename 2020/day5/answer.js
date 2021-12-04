/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  // part 1
  let part1Answer = null;

  let maxSeatId = null;
  const seen = [];
  _.each(input, line => {
    if (line) {
      // input is just binary, row is 7 bits, seat is 3 bits
      // F = 0
      // B = 1

      // L = 0
      // R = 1

      const rowEncoded = _.join(_.map(_.take(line, 7), ch => ch === 'F' ? '0' : '1'), '');
      const row = parseInt(rowEncoded, 2);
      const colEncoded = _.join(_.map(_.takeRight(line, 3), ch => ch === 'L' ? '0' : '1'), '');
      const col = parseInt(colEncoded, 2);
      const seatId = (row * 8) + col;
      seen.push(seatId);
      if (maxSeatId === null || seatId > maxSeatId) {
        maxSeatId = seatId;
      }
    }
  });
  part1Answer = maxSeatId;


  console.log(`Part 1: ${part1Answer}`);



  // part 2
  let part2Answer = null;


  // look through all the seats and find a gap
  seen.sort();
  let prev = null;
  _.each(seen,  seat => {
    if (prev) {
      const diff = seat - prev;
      if (diff !== 1) {
        part2Answer = prev + 1;
      }
    }
    prev = seat;
  });


  console.log(`Part 2: ${part2Answer}`);
}

export default solve;
