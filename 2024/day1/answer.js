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

  let left = [];
  let right = [];

  _.each(input, str => {
    const strs = _.map(_.filter(_.split(str, ' ')), s => parseInt(s, 10));
    if (_.size(strs)) {
      left.push(strs[0]);
      right.push(strs[1]);
    }
  });

  left.sort();
  right.sort();

  answer = 0;
  for (let i = 0; i < left.length; i += 1) {
    answer += Math.abs(left[i] - right[i]);
  }


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

  let left = [];
  let right = [];

  _.each(input, str => {
    const strs = _.map(_.filter(_.split(str, ' ')), s => parseInt(s, 10));
    if (_.size(strs)) {
      left.push(strs[0]);
      right.push(strs[1]);
    }
  });


  const occurrences = _.countBy(right);

  answer = _.reduce(
    left,
    (res, a) => {
      return res + (a * occurrences[a] || 0);
    },
    0,
  );




  return answer;
}
