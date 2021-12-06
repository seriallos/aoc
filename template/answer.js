/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import chalk from 'chalk';

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

  console.log(chalk.bgWhite.black.bold(`  Part 1: ${answer}  `));
}

export const part2 = (input, isTest) => {
  // eslint-disable-next-line no-unused-vars
  const log = (...args) => {
    if ((LOG_TEST && isTest) || (LOG_REAL && !isTest)) {
      console.log(...args);
    }
  };

  let answer = null;

  console.log(chalk.bgWhite.black.bold(`  Part 2: ${answer}  `));
}
