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
  let seats = _.map(layout, row => _.map(row, () => false));
  let prevSeats;
  drawGrid(layout);

  const updateSeats = () => {
    const newSeats = _.map(seats, row => [...row]);
    for (let y = 0; y < seats.length; y += 1) {
      const row = seats[y];
      for (let x = 0; x < row.length; x += 1) {
        if (layout[y][x] === 'L') {
          let neighbors = 0;

          for (let y1 = y - 1; y1 <= y + 1; y1 += 1) {
            for (let x1 = x - 1; x1 <= x + 1; x1 += 1) {
              if (x1 >= 0 && y1 >= 0 && !(x1 === x && y1 === y)) {
                if (seats[y1] && seats[y1][x1]) {
                  neighbors += 1;
                }
              }
            }
          }

          if (!seats[y][x] && neighbors === 0) {
            newSeats[y][x] = true;
          } else if (seats[y][x] && neighbors >= 4) {
            newSeats[y][x] = false;
          }
        }
      }
    }
    prevSeats = seats;
    seats = newSeats;
  };

  let iterations = 0;
  let changed = true;
  while (changed) {
    answer = 0;
    changed = false;
    iterations += 1;
    updateSeats();
    drawGrid(seats);

    for (let y = 0; y < seats.length; y += 1) {
      const row = seats[y];
      for (let x = 0; x < row.length; x += 1) {
        if (seats[y][x] !== prevSeats[y][x]) {
          changed = true;
        }
        if (seats[y][x]) {
          answer += 1;
        }
      }
    }
  }

  log('iterations', iterations);


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
