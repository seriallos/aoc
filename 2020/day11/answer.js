/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

import { drawGrid } from '../../util.js';

const LOG_TEST = true;
const LOG_REAL = false;

export const part1 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    }
  };

  let answer = null;

  const layout = input;
  let seats = _.map(layout, row => _.map(row, () => '.'));
  drawGrid(layout);
  drawGrid(seats);

  const updateSeats = () => {
    const newSeats = [...seats];
    for (let y = 0; y < seats.length; y += 1) {
      const row = seats[y];
      for (let x = 0; x < row.length; x += 1) {
        const seat = seats[y][x];
        if (seats[y][x] === '.') {
        } else {
          // i am here
        }
      }
    }
  };

  return answer;
}

export const part2 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    }
  };

  let answer = null;

  return answer;
}
