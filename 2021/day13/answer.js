/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
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



  let readingPoints = true;
  let data = [];
  const instructions = [];
  let xMax = 0;
  let yMax = 0;
  _.each(input, line => {
    if (!line) {
      readingPoints = false;
    }
    if (readingPoints) {
      const [x, y] = _.map(_.split(line, ','), i => parseInt(i, 10));
      if (!data[y]) {
        data[y] = [];
      }
      data[y][x] = true;
      if (x > xMax) {
        xMax = x;
      }
      if (y > yMax) {
        yMax = y;
      }
    } else {
      const matches = line.match(/fold along ([xy])=(\d+)/);
      if (matches) {
        instructions.push({
          dir: matches[1],
          pos: parseInt(matches[2], 10),
        });
      }
    }
  });

  // ensure data is not sparse
  for (let y = 0; y < yMax + 1; y += 1) {
    for (let x = 0; x < xMax + 1; x += 1) {
      if (!data[y]) {
        data[y] = [];
      }
      data[y][x] = data[y][x] || false;
    }
  }

  _.each(_.take(instructions, 1), ({ dir, pos }) => {
    const newData = _.map(data, row => [...row]);

    const tMax = dir === 'x' ? xMax : yMax;
    const fMax = dir === 'x' ? yMax : xMax;

    const dist = tMax - pos;

    for (let t = 1; t <= dist; t += 1) {
      for (let f = 0; f <= fMax; f += 1) {
        if (dir === 'y') {
          if (pos - t >= 0) {
            newData[pos - t][f] = newData[pos + t][f] || newData[pos - t][f];
          }
          if (pos + t <= tMax) {
            newData[pos + t][f] = false;
          }
        } else {
          if (pos - t >= 0) {
            newData[f][pos - t] = newData[f][pos + t] || newData[f][pos - t];
          }
          if (pos + t <= tMax) {
            newData[f][pos + t] = false;
          }
        }
      }
    }

    data = newData;
    answer = 0;
    for (let y = 0; y < yMax + 1; y += 1) {
      for (let x = 0; x < xMax + 1; x += 1) {
        if (data[y][x]) {
          answer += 1;
        }
      }
    }
  });


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




  let readingPoints = true;
  let data = [];
  const instructions = [];
  let xMax = 0;
  let yMax = 0;
  _.each(input, line => {
    if (!line) {
      readingPoints = false;
    }
    if (readingPoints) {
      const [x, y] = _.map(_.split(line, ','), i => parseInt(i, 10));
      if (!data[y]) {
        data[y] = [];
      }
      data[y][x] = true;
      if (x > xMax) {
        xMax = x;
      }
      if (y > yMax) {
        yMax = y;
      }
    } else {
      const matches = line.match(/fold along ([xy])=(\d+)/);
      if (matches) {
        instructions.push({
          dir: matches[1],
          pos: parseInt(matches[2], 10),
        });
      }
    }
  });

  // ensure data is not sparse
  for (let y = 0; y < yMax + 1; y += 1) {
    for (let x = 0; x < xMax + 1; x += 1) {
      if (!data[y]) {
        data[y] = [];
      }
      data[y][x] = data[y][x] || false;
    }
  }

  _.each(instructions, ({ dir, pos }) => {
    const newData = _.map(data, row => [...row]);

    const tMax = dir === 'x' ? xMax : yMax;
    const fMax = dir === 'x' ? yMax : xMax;

    const dist = tMax - pos;

    for (let t = 1; t <= dist; t += 1) {
      for (let f = 0; f <= fMax; f += 1) {
        if (dir === 'y') {
          if (pos - t >= 0) {
            newData[pos - t][f] = newData[pos + t][f] || newData[pos - t][f];
          }
          if (pos + t <= tMax) {
            newData[pos + t][f] = false;
          }
        } else {
          if (pos - t >= 0) {
            newData[f][pos - t] = newData[f][pos + t] || newData[f][pos - t];
          }
          if (pos + t <= tMax) {
            newData[f][pos + t] = false;
          }
        }
      }
    }

    data = newData;
    answer = 0;
    for (let y = 0; y < yMax + 1; y += 1) {
      for (let x = 0; x < xMax + 1; x += 1) {
        if (data[y][x]) {
          answer += 1;
        }
      }
    }
  });


  drawGrid(data);
  answer = 'look at grid';






  return answer;
}
