/* eslint-env node */
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import _ from 'lodash';
import chalk from 'chalk';

export const getInput = async (year, day, filename) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const inputPath = path.join(__dirname, `${year}`, `day${day}`, filename);
    const rawData = await fs.readFile(inputPath, 'utf8');
    const input = _.split(rawData, '\n');
    if (input.length === 1 && input[0] === '') {
      return null;
    }
    return input;
  } catch (err) {
    const e = new Error(`Year ${year} Day ${day} ${filename} cannot be loaded`);
    e.cause = err;
    throw e;
  }
};

export const drawGrid = (data, options) => {
  const opts = _.defaults(
    options,
    {
      empty: chalk.gray('.'),
      xMin: 0,
      xMax: null,
      yMin: 0,
      yMax: null,
      hashes: true,
    },
  );

  // find max bounds
  for (let y = 0; y < data.length; y += 1) {
    opts.yMax = y;
    if (data[y] && data[y].length > opts.xMax) {
      opts.xMax = data[y].length;
    }
  }

  if (opts.xMax > 80) {
    console.log(chalk.red('!! drawGrid: Grid is too wide to show'));
    return;
  }

  if (opts.hashes) {
    process.stdout.write('    ');
    for (let x = opts.xMin; x <= opts.xMax; x += 1) {
      process.stdout.write(chalk.gray(`${x % 10} `));
    }
    process.stdout.write('\n');
    process.stdout.write('\n');
  }
  for (let y = opts.yMin; y <= opts.yMax; y += 1) {
    if (opts.hashes) {
      process.stdout.write(chalk.gray(`${y % 10}   `));
    }
    for (let x = opts.xMin; x <= opts.xMax; x += 1) {
      process.stdout.write((data[y] && data[y][x]) ? String(data[y][x]) : opts.empty);
      process.stdout.write(' ');
    }
    process.stdout.write('\n');
  }
  process.stdout.write('\n');
};
