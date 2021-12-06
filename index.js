/* eslint-env node */
import { performance } from 'perf_hooks';

import _ from 'lodash';
import chalk from 'chalk';

import { getInput } from './util.js';

async function main() {
  const year = parseInt(process.argv[2], 10);
  const day = parseInt(process.argv[3], 10);

  if (!year || year < 2015 || year > new Date().getFullYear()) {
    console.log('Invalid year input');
    console.log('USAGE: node index.js YEAR DAY');
    console.log('  e.g. $ node index.js 2021 2');
    process.exit(1);
  }

  if (!day || day > 25) {
    console.log('Invalid day input');
    console.log('USAGE: node index.js YEAR DAY');
    console.log('  e.g. $ node index.js 2021 2');
    process.exit(1);
  }

  console.log(`Running year ${year} day ${day}...`);
  console.log();

  try {
    const testInput = await getInput(year, day, 'example.txt');
    const realInput = await getInput(year, day, 'input.txt');

    const module = await import(`./${year}/day${day}/answer.js`);
    const solve = module.default;
    const part1 = module.part1;
    const part2 = module.part2;

    if (testInput.length) {
      console.log(chalk.bold('===================================='));
      console.log(chalk.bold('||            Test Input          ||'));
      console.log(chalk.bold('===================================='));

      const testStart = performance.now();

      if (part1 || part2) {
        part1(testInput, true);
        part2(testInput, true);
      } else {
        solve(testInput, true);
      }

      const testDuration = performance.now() - testStart;

      console.log();
      console.log(chalk.gray(`Runtime: ${_.round(testDuration, 3)}ms`));
    } else {
      console.log('Test input is empty, skipping');
    }

    if (realInput.length) {
      console.log();
      console.log();
      console.log(chalk.bold('===================================='));
      console.log(chalk.bold('||            Real Input          ||'));
      console.log(chalk.bold('===================================='));

      const realStart = performance.now();

      if (part1 || part2) {
        part1(realInput, false);
        part2(realInput, false);
      } else {
        solve(realInput, false);
      }

      const realDuration = performance.now() - realStart;

      console.log();
      console.log(chalk.gray(`Runtime: ${_.round(realDuration, 3)}ms`));
    } else {
      console.log('Real input is empty, skipping');
    }
  } catch (err) {
    console.log(err);
  }
}

main();
