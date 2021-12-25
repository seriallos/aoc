/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
import { drawGrid } from '../../util.js';

const LOG_TEST = true;
const LOG_REAL = false;

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


  let map = [];

  _.each(input, line => {
    if (line) {
      map.push(line.split(''));
    }
  });


  drawGrid(map);
  let changed = false;
  let step = 0;
  do {
    changed = false;
    step += 1;
    let nextMap = _.cloneDeep(map);
    for (let y = 0; y < map.length; y += 1) {
      for (let x = 0; x < map[0].length; x += 1) {
        if (map[y][x] === '>') {
          const nextX = x + 1 === map[0].length ? 0 : x + 1;
          if (map[y][nextX] === '.') {
            nextMap[y][nextX] = '>';
            nextMap[y][x] = '.';
            changed = true;
          }
        }
      }
    }
    map = nextMap;
    nextMap = _.cloneDeep(map);
    for (let y = 0; y < map.length; y += 1) {
      for (let x = 0; x < map[0].length; x += 1) {
        if (map[y][x] === 'v') {
          const nextY = y + 1 === map.length ? 0 : y + 1;
          if (map[nextY][x] === '.') {
            nextMap[nextY][x] = 'v';
            nextMap[y][x] = '.';
            changed = true;
          }
        }
      }
    }
    map = nextMap;
    answer = step;
  } while (changed)



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









  return answer;
}
