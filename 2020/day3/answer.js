/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));
  const rows = _.map(input, line => {
    return _.map(line, ch => ch === '#');
  });
  // top left is always open maybe?
  let right = 3;
  let down = 1;
  let x = right;
  let hits = 0;
  for(let y = 1; y < rows.length; y += down) {
    const row = rows[y];
    if (row[x % row.length]) {
      hits += 1;
    }
    x += right;
  }

  console.log(`Part 1: ${hits}`);

  const tests = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  let part2answer = null;
  for (let i = 0; i < tests.length; i += 1) {
    let right = tests[i][0];
    let down = tests[i][1];

    let x = right;
    hits = 0;
    for(let y = down; y < rows.length; y += down) {
      const row = rows[y];
      if (row[x % row.length]) {
        hits += 1;
      }
      x += right;
    }
    if (part2answer === null) {
      part2answer = hits;
    } else {
      part2answer *= hits;
    }
  }

  console.log(`Part 2: ${part2answer}`);
}

export default solve;
