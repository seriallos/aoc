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

  let answer = 0;

  _.each(input, line => {
    const values = _.map(_.split(line, ' '), s => parseInt(s, 10));
    if (values.length) {
      let safe = true;
      let lastDir;
      for (let i = 0; safe && i < values.length - 1; i += 1) {
        const dist = values[i] - values[i + 1];
        const dir = dist / Math.abs(dist);
        if (!lastDir) {
          lastDir = dir;
        } else {
          safe = lastDir === dir;
        }
        if (safe) {
          safe = Math.abs(dist) >= 1 && Math.abs(dist) <= 3;
        }
      }
      if (safe) {
        answer += 1;
      }
    }
  });



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



  _.each(input, line => {
    const values = _.map(_.split(line, ' '), s => parseInt(s, 10));
    if (values.length) {
      let anySafe = false;
      for (let j = -1; !anySafe && j < values.length; j += 1) {
        const vals = [...values];
        if (j >= 0) {
          vals.splice(j, 1);
        }
        let safe = true;
        let lastDir;
        for (let i = 0; safe && i < vals.length - 1; i += 1) {
          const dist = vals[i] - vals[i + 1];
          const dir = dist / Math.abs(dist);
          if (!lastDir) {
            lastDir = dir;
          } else {
            safe = lastDir === dir;
          }
          if (safe) {
            safe = Math.abs(dist) >= 1 && Math.abs(dist) <= 3;
          }
        }
        if (safe) {
          anySafe = true;
        }
      }
      if (anySafe) {
        answer += 1;
      }
    }
  });





  return answer;
}
