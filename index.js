/* eslint-env node */
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
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

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dir = await fs.opendir(path.join(__dirname, String(year), `day${day}`));
    const inputFiles = [];
    for await (const dirent of dir) {
      if (path.extname(dirent.name) === '.txt') {
        inputFiles.push(dirent.name);
      }
    }
    inputFiles.sort();

    const module = await import(`./${year}/day${day}/answer.js`);
    const solve = module.default;
    const part1 = module.part1;
    const part2 = module.part2;

    for (const file of inputFiles) {
      const input = await getInput(year, day, file);
      if (input) {
        const isTest = file !== 'input.txt';
        const decoWidth = 40;
        const spaces = _.join(_.map(_.range(_.floor((decoWidth - 4 - file.length) / 2)), () => ' '), '');
        const nudge = file.length % 2 === 1 ? ' ' : '';

        const fileColor = isTest ? chalk.magenta : chalk.blue;

        console.log();
        console.log(fileColor(_.join(_.map(_.range(0, decoWidth), () => '='), '')));
        console.log(fileColor(`||${spaces}${file}${nudge}${spaces}||`));
        console.log(fileColor(_.join(_.map(_.range(0, decoWidth), () => '='), '')));


        const start = performance.now();

        let answer1, answer2;
        if (part1 || part2) {
          answer1 = part1(input, isTest);
          answer2 = part2(input, isTest);
        } else {
          solve(input, isTest);
        }

        const duration = performance.now() - start;
        if (answer1 !== undefined || answer2 !== undefined) {
          const blockWidth = 40;
          const answer = chalk.bgCyan.black.bold;

          const answer1Msg = `Part 1: ${answer1}`;
          const answer2Msg = `Part 2: ${answer2}`;
          const padding1 = _.range(0, blockWidth - answer1Msg.length - 2).map(() => ' ').join('');
          const padding2 = _.range(0, blockWidth - answer2Msg.length - 2).map(() => ' ').join('');

          console.log(answer(_.range(0, blockWidth).map(() => ' ').join('')));
          console.log(answer(`  ${answer1Msg}${padding1}`));
          console.log(answer(`  ${answer2Msg}${padding2}`));
          console.log(answer(_.range(0, blockWidth).map(() => ' ').join('')));
        }

        console.log(chalk.gray(`Runtime: ${_.round(duration, 3)}ms`));
      } else {
        console.log(chalk.bgYellow.black(`!! ${file} is empty, skipping`));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

main();
