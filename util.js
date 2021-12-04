import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import _ from 'lodash';

export const getInput = async (year, day, filename) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const inputPath = path.join(__dirname, `${year}`, `day${day}`, filename);
    const rawData = await fs.readFile(inputPath, 'utf8');
    const input = _.split(rawData, '\n');
    return input;
  } catch (err) {
    const e = new Error(`Year ${year} Day ${day} ${filename} cannot be loaded`);
    e.cause = err;
    throw e;
  }
};
