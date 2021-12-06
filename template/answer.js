/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

function solve(input, isTest) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  const LOG_TEST = true;
  const LOG_REAL = false;

  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    }
  };

  let part1Answer = null;
  let part2Answer = null;

  // -----------------------------------------------------------
  // SOLVE HERE
  // -----------------------------------------------------------




  // Display answers
  console.log(`Part 1: ${part1Answer}`);
  console.log(`Part 2: ${part2Answer}`);
}

export default solve;
