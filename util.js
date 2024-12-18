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
    const rawData = _.trimEnd(await fs.readFile(inputPath, 'utf8'));
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
      chars: {
        [true]: '#',
        [false]: '.',
      },
      hPadding: 0,
      xCutoff: 90,
      yCutoff: 50,
    },
  );

  // find max bounds
  for (let y = 0; y < data.length; y += 1) {
    opts.yMax = y;
    if (data[y] && data[y].length > opts.xMax) {
      opts.xMax = data[y].length - 1;
    }
  }

  if (opts.xMax > opts.xCutoff) {
    console.log(chalk.yellow(`!! drawGrid: Grid truncated, xMax = ${opts.xMax}, xCutoff = ${opts.xCutoff}`));
  }
  if (opts.yMax > opts.yCutoff) {
    console.log(chalk.yellow(`!! drawGrid: Grid truncated, yMax = ${opts.yMax}, yCutoff = ${opts.yCutoff}`));
  }

  const pad = _.range(0, opts.hPadding).map(() => ' ').join('');

  if (opts.hashes) {
    process.stdout.write('    ');
    for (let x = opts.xMin; x <= _.min([opts.xMax, opts.xCutoff]); x += 1) {
      process.stdout.write(chalk.gray(`${x % 10}${pad}`));
    }
    if (opts.xMax > opts.xCutoff) {
      process.stdout.write(chalk.yellow(` + ${opts.xMax - opts.xCutoff} cols`));
    }
    process.stdout.write('\n');
    process.stdout.write('\n');
  }
  for (let y = opts.yMin; y <= _.min([opts.yMax, opts.yCutoff]); y += 1) {
    if (opts.hashes) {
      process.stdout.write(chalk.gray(`${y % 10}   `));
    }
    for (let x = opts.xMin; x <= _.min([opts.xMax, opts.xCutoff]); x += 1) {
      let value = opts.empty;
      if (data[y] && data[y][x]) {
        value = data[y][x];
        if (opts.chars[value]) {
          value = opts.chars[value];
        } else {
          value = String(value);
        }
      }
      process.stdout.write(value);
      process.stdout.write(pad);
    }
    process.stdout.write('\n');
  }
  if (opts.yMax > opts.yCutoff) {
    process.stdout.write(chalk.yellow(`+ ${opts.yMax - opts.yCutoff} rows\n`));
  }
  process.stdout.write('\n');
};
