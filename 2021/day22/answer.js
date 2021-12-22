/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import assert from 'assert';

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



  const MIN = -50;
  const MAX = 50;
  const reactor = [];
  for (let z = MIN; z <= MAX; z += 1) {
    for (let y = MIN; y <= MAX; y += 1) {
      for (let x = MIN; x <= MAX; x += 1 ) {
        if (!reactor[z]) {
          reactor[z] = [];
        }
        if (!reactor[z][y]) {
          reactor[z][y] = [];
        }
        reactor[z][y][x] = false;
      }
    }
  }

  _.each(input, line => {
    if (line) {
      const [ stateStr, rest ] = line.split(' ');
      const bounds = _.map(_.split(rest, ','), bound => {
        return _.map(_.split(bound.substring(2), '..'), i => parseInt(i, 10));
      });
      const state = stateStr === 'on' ? true : false;
      const [xMin, xMax] = bounds[0];
      const [yMin, yMax] = bounds[1];
      const [zMin, zMax] = bounds[2];
      assert(xMin <= xMax, 'xMin larger than xMax');
      assert(yMin <= yMax, 'yMin larger than yMax');
      assert(zMin <= zMax, 'zMin larger than zMax');
      if (xMin >= MIN && xMax <= MAX && yMin >= MIN && yMin <= MAX && zMin >= MIN && xMax <= MAX) {
        for (let z = zMin; z <= zMax; z += 1) {
          for (let y = yMin; y <= yMax; y += 1) {
            for (let x = xMin; x <= xMax; x += 1) {
              reactor[z][y][x] = state;
            }
          }
        }
      }
    }
  });

  answer = 0;
  for (let z = MIN; z <= MAX; z += 1) {
    for (let y = MIN; y <= MAX; y += 1) {
      for (let x = MIN; x <= MAX; x += 1 ) {
        if (reactor[z][y][x]) {
          answer += 1;
        }
      }
    }
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

  const area = cube => {
    return (cube[1] - cube[0]) * (cube[3] - cube[2]) * (cube[5] - cube[4]);
  };

  let cubes = [];

  _.each(input, (line, i) => {
    if (line && !_.startsWith(line, '#')) {
      log(`Processing cube ${i} ---`);
      const [ stateStr, rest ] = line.split(' ');
      const bounds = _.map(_.split(rest, ','), bound => {
        return _.map(_.split(bound.substring(2), '..'), i => parseInt(i, 10));
      });
      const value = stateStr === 'on' ? 1 : 0;
      let [xMin, xMax] = bounds[0];
      let [yMin, yMax] = bounds[1];
      let [zMin, zMax] = bounds[2];

      xMax += 1;
      yMax += 1;
      zMax += 1;

      // lot of the concepts largely lifted from https://pastebin.com/vKSar4KB

      const newCube = [xMin, xMax, yMin, yMax, zMin, zMax, value];

      const newCubes = [];

      // check all existing cubes against the new one
      _.each(cubes, cube => {
        // check for an overlap with the new cube
        const xOverlap = xMax > cube[0] && xMin < cube[1];
        const yOverlap = yMax > cube[2] && yMin < cube[3];
        const zOverlap = zMax > cube[4] && zMin < cube[5];
        if (xOverlap && yOverlap && zOverlap) {
          // if we found an overlap, slice up the existing cube into smaller parts
          // check each of the 6 possible slice directions.
          // End up adding a slice of the existing cube and then editing the existing cube in cubes
          if (cube[0] < xMin) {
            newCubes.push([cube[0], xMin, cube[2], cube[3], cube[4], cube[5], cube[6]]);
            cube[0] = xMin;
          }
          if (cube[1] > xMax) {
            newCubes.push([xMax, cube[1], cube[2], cube[3], cube[4], cube[5], cube[6]]);
            cube[1] = xMax;
          }

          if (cube[2] < yMin) {
            newCubes.push([cube[0], cube[1], cube[2], yMin, cube[4], cube[5], cube[6]]);
            cube[2] = yMin;
          }
          if (cube[3] > yMax) {
            newCubes.push([cube[0], cube[1], yMax, cube[3], cube[4], cube[5], cube[6]]);
            cube[3] = yMax;
          }

          if (cube[4] < zMin) {
            newCubes.push([cube[0], cube[1], cube[2], cube[3], cube[4], zMin, cube[6]]);
            cube[4] = zMin;
          }
          if (cube[5] > zMax) {
            newCubes.push([cube[0], cube[1], cube[2], cube[3], zMax, cube[5], cube[6]]);
            cube[5] = zMax;
          }
        } else {
          newCubes.push(cube);
        }
      });
      newCubes.push(newCube);

      cubes = newCubes;
    }
  });

  answer = 0;

  _.each(cubes, cube => {
    if (cube[6] > 0) {
      answer += area(cube);
    }
  });




  return answer;
}
