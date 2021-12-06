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

  let fishes = [];
  _.each(input, line => {
    if (line) {
      fishes = _.map(_.split(line, ','), i => parseInt(i, 10));
    }
  });

  for (let day = 0; day < 80; day += 1) {
    for (let i = 0; i < fishes.length; i += 1) {
      const fish = fishes[i];
      // decrement fish
      if (fish === 0) {
        fishes[i] = 6;
        fishes.push(9);
      } else {
        fishes[i] -= 1;
      }
    }
  }

  answer = fishes.length;

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



  // store the count of fishes at any given stage rather than each fish on its own
  let fishes = _.map(_.range(0, 8), () => 0);
  _.each(input, line => {
    if (line) {
      const fishCounts = _.map(_.split(line, ','), i => parseInt(i, 10));
      _.each(fishCounts, c => {
        if (!fishes[c]) {
          fishes[c] = 0;
        }
        fishes[c] += 1;
      });
    }
  });


  for (let day = 0; day < 256; day += 1) {
    // grab the doubling fish for today
    const birthing = fishes[0];
    // shift everyone else back a step
    for (let i = 0; i < 8; i += 1) {
      fishes[i] = fishes[i + 1] || 0;
    }
    // add the doubling fishes to their places
    fishes[6] += birthing;
    fishes[8] = birthing;
  }

  answer = _.sum(fishes);





  console.log(chalk.bgWhite.black.bold(`  Part 2: ${answer}  `));
}
