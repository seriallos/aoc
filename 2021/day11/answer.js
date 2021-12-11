/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

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


  const energy = [];
  _.each(input, (line, y) => {
    _.each(line, (ch, x) => {
      if (!energy[y]) {
        energy[y] = [];
      }
      energy[y][x] = parseInt(ch, 10);
    });
  });



  for (let step = 1; step <= 100; step += 1) {
    // increment all by 1
    for (let y = 0; y < energy.length; y += 1) {
      const row = energy[y];
      for (let x = 0; x < row.length; x += 1) {
        energy[y][x] += 1;
      }
    }

    // now keep iterating until all flashes have resolved
    const flashed = new Set();
    let hadFlash = false;
    do {
      hadFlash = false;
      for (let y = 0; y < energy.length; y += 1) {
        const row = energy[y];
        for (let x = 0; x < row.length; x += 1) {
          if (energy[y][x] > 9) {
            const key = `${y}-${x}`;
            if (!flashed.has(key)) {
              answer += 1;
              flashed.add(key);
              hadFlash = true;
              // increment neighbors
              for (let dy = -1; dy <= 1; dy += 1) {
                for (let dx = -1; dx <= 1; dx += 1) {
                  const ty = y + dy;
                  const tx = x + dx;
                  if (ty >= 0 && ty < 10 && tx >= 0 && tx < 10) {
                    if (!(tx === x && ty === y)) {
                      energy[ty][tx] += 1;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } while (hadFlash)

    // set all flashed pots to 0
    for (let y = 0; y < energy.length; y += 1) {
      const row = energy[y];
      for (let x = 0; x < row.length; x += 1) {
        if (energy[y][x] > 9) {
          energy[y][x] = 0;
        }
      }
    }
    log('after step', step);
  }


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





  const energy = [];
  _.each(input, (line, y) => {
    _.each(line, (ch, x) => {
      if (!energy[y]) {
        energy[y] = [];
      }
      energy[y][x] = parseInt(ch, 10);
    });
  });



  for (let step = 1; step <= 1000; step += 1) {
    // increment all by 1
    for (let y = 0; y < energy.length; y += 1) {
      const row = energy[y];
      for (let x = 0; x < row.length; x += 1) {
        energy[y][x] += 1;
      }
    }

    // now keep iterating until all flashes have resolved
    const flashed = new Set();
    let hadFlash = false;
    do {
      hadFlash = false;
      for (let y = 0; y < energy.length; y += 1) {
        const row = energy[y];
        for (let x = 0; x < row.length; x += 1) {
          if (energy[y][x] > 9) {
            const key = `${y}-${x}`;
            if (!flashed.has(key)) {
              flashed.add(key);
              hadFlash = true;
              // increment neighbors
              for (let dy = -1; dy <= 1; dy += 1) {
                for (let dx = -1; dx <= 1; dx += 1) {
                  const ty = y + dy;
                  const tx = x + dx;
                  if (ty >= 0 && ty < 10 && tx >= 0 && tx < 10) {
                    if (!(tx === x && ty === y)) {
                      energy[ty][tx] += 1;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } while (hadFlash)
    if (flashed.size === 100) {
      answer = step;
      break;
    }

    // set all flashed pots to 0
    for (let y = 0; y < energy.length; y += 1) {
      const row = energy[y];
      for (let x = 0; x < row.length; x += 1) {
        if (energy[y][x] > 9) {
          energy[y][x] = 0;
        }
      }
    }
    log('after step', step);
  }





  return answer;
}
