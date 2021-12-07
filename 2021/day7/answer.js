/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

const LOG_TEST = true;
const LOG_REAL = false;

let logWarned = false;

export const part1 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    } else if (!logWarned) {
      console.log('Logging is disabled for this run');
      logWarned = true;
    }
  };

  let answer = null;

  let positions = [];
  _.each(input, line => {
    if (line) {
      positions = _.map(_.split(line, ','), i => parseInt(i, 10));
    }
  });


  let leastMove = Infinity;
  for (let i = 0; i < positions.length; i += 1) {
    let total = 0;
    for (let j = 0; j < positions.length; j += 1) {
      if (i !== j) {
        total += Math.abs(positions[i] - positions[j]);
      }
    }
    if (total < leastMove) {
      leastMove = total;
    }
  }

  answer = leastMove;

  return answer;
}

export const part2 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    } else if (!logWarned) {
      console.log('Logging is disabled for this run');
      logWarned = true;
    }
  };

  let answer = null;


  let positions = [];
  _.each(input, line => {
    if (line) {
      positions = _.map(_.split(line, ','), i => parseInt(i, 10));
    }
  });

  const fuelCost = m => {
    let cost = 0;
    for (let i = 0; i <= m; i += 1) {
      cost += i;
    }
    return cost;
  };

  let leastMove = Infinity;
  for (let i = 0; i < _.max(positions); i += 1) {
    let total = 0;
    for (let j = 0; j < positions.length; j += 1) {
      const cost = fuelCost(Math.abs(i - positions[j]));
      total += cost;
    }
    if (total < leastMove) {
      log('new best position', i, 'cost', total);
      leastMove = total;
    }
  }

  answer = leastMove;



  return answer;
}
