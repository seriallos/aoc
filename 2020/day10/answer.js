/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import chalk from 'chalk';

const LOG_TEST = true;
const LOG_REAL = true;

export const part1 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    }
  };

  let answer = null;


  const adaptersUnsorted = [0];
  _.each(input, line => {
    if (line) {
      adaptersUnsorted.push(parseInt(line, 10));
    }
  });
  const adapters = _.sortBy(adaptersUnsorted);
  const deviceJolts = _.last(adapters) + 3;
  adapters.push(deviceJolts);

  const counts = [];
  for (let i = 0; i < adapters.length - 1; i += 1) {
    const diff = adapters[i + 1] - adapters[i];
    if (!counts[diff]) {
      counts[diff] = 0;
    }
    counts[diff] += 1;
  }
  answer = counts[1] * counts[3];

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


  const adaptersUnsorted = [0];
  _.each(input, line => {
    if (line) {
      adaptersUnsorted.push(parseInt(line, 10));
    }
  });
  const adapters = _.sortBy(adaptersUnsorted);
  const deviceJolts = _.last(adapters) + 3;
  adapters.push(deviceJolts);

  const findPaths = (list, path = '0', depth = 0) => {
    if (_.size(list) === 0) {
      return 0;
    } else if (_.size(list) === 1) {
      return 1;
    }
    const cur = list[0];
    let valid = 0;
    for (let j = 1; j < list.length; j += 1) {
      const diff = list[j] - cur;
      if (diff <= 3) {
        valid += findPaths(_.drop(list, j), path + ` -> ${list[j]}`, depth + 1);
      } else {
        break;
      }
    }
    return valid;
  }

  const groups = [];
  let curGroup = [];
  for (let i = 0; i < adapters.length - 1; i += 1) {
    const cur = adapters[i];
    curGroup.push(cur);
    if ((adapters[i + 1] - cur) >= 3) {
      groups.push(curGroup);
      curGroup = [];
    }
  }

  answer = 1;
  for(let i = 0; i < groups.length; i += 1) {
    answer *= findPaths(groups[i]);
  }

  return answer;
}
