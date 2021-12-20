/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
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



  const algorithm = input[0];
  const originalImage = [];
  for (let i = 2; i < input.length; i += 1) {
    if (input[i]) {
      originalImage.push(input[i]);
    }
  }

  const addBorder = (image, amount = 3, value = '.') => {
    const width = image[0].length;
    const newImage = [];
    for (let i = 0; i < amount; i += 1) {
      newImage.push(_.repeat(value, width + (amount * 2)));
    }

    _.each(image, row => {
      newImage.push(_.repeat(value, amount) + row + _.repeat(value, amount));
    });

    for (let i = 0; i < amount; i += 1) {
      newImage.push(_.repeat(value, width + (amount * 2)));
    }
    return newImage;
  };

  const history = [];
  const steps = 2;

  const pixelValue = (image, x, y, oobValue) => {
    let value = '';
    for (let ay = y - 1; ay <= y + 1; ay += 1) {
      for (let ax = x - 1; ax <= x + 1; ax += 1) {
        let pixel;
        if (image[ay] && image[ay][ax]) {
          pixel = image[ay][ax]
        } else {
          pixel = oobValue;
        }
        value += pixel === '#' ? '1' : '0';
      }
    }
    return parseInt(value, 2);
  };

  let working = _.cloneDeep(originalImage);
  drawGrid(working);
  for (let step = 1; step <= steps; step += 1) {
    let infiniteValue;
    if (isTest) {
      infiniteValue = '.';
    } else {
      infiniteValue = step % 2 === 0 ? '#' : '.';
    }
    working = addBorder(working, 2, infiniteValue);
    const newImage = [];
    for (let y = 0; y < working.length; y += 1) {
      for (let x = 0; x < working[y].length; x += 1) {
        const value = pixelValue(working, x, y, infiniteValue);
        if (!newImage[y]) {
          newImage[y] = '';
        }
        newImage[y] += algorithm[value];
      }
    }
    working = newImage;
    history.push(newImage);
  }
  drawGrid(working);

  answer = 0;
  for (let y = 0; y < working.length; y += 1) {
    answer += _.sumBy(working[y], ch => ch === '#');
  }

  // 5944 - too high
  // 5179 - too low
  // 3658 - too low


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




  const algorithm = input[0];
  const originalImage = [];
  for (let i = 2; i < input.length; i += 1) {
    if (input[i]) {
      originalImage.push(input[i]);
    }
  }

  const addBorder = (image, amount = 3, value = '.') => {
    const width = image[0].length;
    const newImage = [];
    for (let i = 0; i < amount; i += 1) {
      newImage.push(_.repeat(value, width + (amount * 2)));
    }

    _.each(image, row => {
      newImage.push(_.repeat(value, amount) + row + _.repeat(value, amount));
    });

    for (let i = 0; i < amount; i += 1) {
      newImage.push(_.repeat(value, width + (amount * 2)));
    }
    return newImage;
  };

  const history = [];
  const steps = 50;

  const pixelValue = (image, x, y, oobValue) => {
    let value = '';
    for (let ay = y - 1; ay <= y + 1; ay += 1) {
      for (let ax = x - 1; ax <= x + 1; ax += 1) {
        let pixel;
        if (image[ay] && image[ay][ax]) {
          pixel = image[ay][ax]
        } else {
          pixel = oobValue;
        }
        value += pixel === '#' ? '1' : '0';
      }
    }
    return parseInt(value, 2);
  };

  let working = _.cloneDeep(originalImage);
  drawGrid(working);
  for (let step = 1; step <= steps; step += 1) {
    let infiniteValue;
    if (isTest) {
      infiniteValue = '.';
    } else {
      infiniteValue = step % 2 === 0 ? '#' : '.';
    }
    working = addBorder(working, 2, infiniteValue);
    const newImage = [];
    for (let y = 0; y < working.length; y += 1) {
      for (let x = 0; x < working[y].length; x += 1) {
        const value = pixelValue(working, x, y, infiniteValue);
        if (!newImage[y]) {
          newImage[y] = '';
        }
        newImage[y] += algorithm[value];
      }
    }
    working = newImage;
    history.push(newImage);
  }
  drawGrid(working);

  answer = 0;
  for (let y = 0; y < working.length; y += 1) {
    answer += _.sumBy(working[y], ch => ch === '#');
  }

  // 5944 - too high
  // 5179 - too low
  // 3658 - too low





  return answer;
}
