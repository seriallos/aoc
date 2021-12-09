/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

import { drawGrid } from  '../../util.js';

const LOG_TEST = true;
const LOG_REAL = true;

let noLogWarned = false;

export const part1 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    } else if (!noLogWarned) {
      console.log('Logging is disabled for this input');
      noLogWarned = true;
    }
  };

  let answer = null;


  const map = [
  ];
  _.each(input, (line, y) => {
    _.each(line, (ch, x) => {
      if (!map[y]) {
        map[y] = [];
      }
      map[y][x] = parseInt(ch, 10);
    });
  });

  const checks = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  answer = 0;
  for (let y = 0; y < map.length; y += 1) {
    const row = map[y];
    for (let x = 0; x < row.length; x += 1) {
      // check if low point
      let lowest = true;
      _.each(checks, ([ dy, dx ]) => {
        if (map[y + dy] && map[y + dy][x + dx] !== undefined) {
          if (map[y + dy][x + dx] <= map[y][x]) {
            lowest = false;
          }
        }
      });
      if (lowest) {
        const risk = map[y][x] + 1;
        answer += risk;
      }
    }
  }

  // 1679 - not right
  // 1811 - not right

  return answer;
}

export const part2 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    } else if (!noLogWarned) {
      console.log('Logging is disabled for this input');
      noLogWarned = true;
    }
  };

  let answer = null;



  const map = [
  ];
  _.each(input, (line, y) => {
    _.each(line, (ch, x) => {
      if (!map[y]) {
        map[y] = [];
      }
      map[y][x] = parseInt(ch, 10);
    });
  });

  const checks = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  answer = 0;
  const basinSizes = [];
  for (let y = 0; y < map.length; y += 1) {
    const row = map[y];
    for (let x = 0; x < row.length; x += 1) {
      // check if low point
      let lowest = true;
      _.each(checks, ([ dy, dx ]) => {
        if (map[y + dy] && map[y + dy][x + dx] !== undefined) {
          if (map[y + dy][x + dx] <= map[y][x]) {
            lowest = false;
          }
        }
      });
      if (lowest) {
        // find basin size
        const visited = new Set();
        let candidates = [`${y}-${x}`];
        let basinSize = 0;
        do {
          const [y, x] = _.map(candidates.pop().split('-'), i => parseInt(i, 10));
          visited.add(`${y}-${x}`);
          basinSize += 1;
          _.each(checks, ([ dy, dx ]) => {
            if (map[y + dy] && map[y + dy][x + dx] !== 9 && map[y + dy][x + dx] !== undefined) {
              const key = `${y + dy}-${x + dx}`;
              if (!visited.has(key)) {
                candidates.push(key);
                candidates = _.uniq(candidates);
              }
            }
          });
        } while (candidates.length > 0);
        basinSizes.push(basinSize);
      }
    }
  }
  answer = _.reduce(_.takeRight(_.sortBy(basinSizes), 3), (r, i) => r * i, 1);




  return answer;
}
