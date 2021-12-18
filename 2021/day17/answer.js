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


  const [, xtMin, xtMax, ytMin, ytMax] = _.map(
    input[0].match(/x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/),
    i => parseInt(i, 10),
  );

  const inTargetArea = (x, y) => {
    return x >= xtMin && x <= xtMax && y >= ytMin && y <= ytMax;
  };
  const hasMissed = (x, y) => {
    return x > xtMax || y < ytMax;
  };

  let yBest = -Infinity;
  for (let dxo = -1000; dxo < 1000; dxo += 1) {
    for (let dyo = -1000; dyo < 1000; dyo += 1) {
      let x = 0;
      let y = 0;
      let dx = dxo;
      let dy = dyo;
      let success = false;
      let yMax = -Infinity;
      do {
        x += dx;
        y += dy;
        if (y > yMax) {
          yMax = y;
        }
        if (inTargetArea(x, y)) {
          success = true;
          if (yMax > yBest) {
            yBest = yMax;
          }
        }
        dy -= 1;
        if (dx > 0) dx -= 1;
        if (dx < 0) dx += 1;
      } while (!success && !hasMissed(x, y))
    }
  }

  answer = yBest;

  // 1225 too low


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




  const [, xtMin, xtMax, ytMin, ytMax] = _.map(
    input[0].match(/x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/),
    i => parseInt(i, 10),
  );

  const inTargetArea = (x, y) => {
    return x >= xtMin && x <= xtMax && y >= ytMin && y <= ytMax;
  };
  const hasMissed = (x, y) => {
    return x > xtMax || y < ytMin;
  };

  let solutions = 0;
  let yBest = -Infinity;
  for (let dxo = 0; dxo < 300; dxo += 1) {
    for (let dyo = -200; dyo < 1000; dyo += 1) {
      let debug = false;
      if (dxo === 6 && dyo === 0) {
        log('debugging', dxo, dyo);
        debug = true;
      }
      let x = 0;
      let y = 0;
      let dx = dxo;
      let dy = dyo;
      let success = false;
      let yMax = -Infinity;
      do {
        x += dx;
        y += dy;
        if (y > yMax) {
          yMax = y;
        }
        if (debug) {
          log('  ', dx, dy, x, y);
        }
        if (inTargetArea(x, y)) {
          if (debug) {
            log('  in target');
          }
          solutions += 1;
          success = true;
          if (yMax > yBest) {
            yBest = yMax;
          }
          break;
        }
        dy -= 1;
        if (dx > 0) dx -= 1;
        if (dx < 0) dx += 1;
      } while (!success && !hasMissed(x, y))
      if (success) {
        log('success', dxo, dyo);
      }
    }
  }

  log(yBest);
  answer = solutions;

  // 2806 too low


  return answer;
}
