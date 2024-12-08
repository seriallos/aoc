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

  const regex = /mul\((\d+),(\d+)\)/gi;
  _.each(input, line => {
    const matches = [...line.matchAll(regex)];
    _.each(matches, match => {
      log(match[0], match[1], match[2]);
      answer += parseInt(match[1], 10) * parseInt(match[2], 10);
    });
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

  log();

  let answer = 0;

  const regex = /((mul)\((\d+),(\d+)\)|(don't)\(\)|(do)\(\))/gi;
  let enabled = true;
  _.each(input, line => {
    const matches = [...line.matchAll(regex)];
    _.each(matches, match => {
      if (match[5]) {
        enabled = false;
      }
      if (match[6]) {
        enabled = true;
      }
      if (match[2] && enabled) {
        answer += parseInt(match[3], 10) * parseInt(match[4], 10);
        log(answer);
      }
    });
  });








  return answer;
}
