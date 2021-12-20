/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
import { drawGrid } from '../../util.js';

const LOG_TEST = true;
const LOG_REAL = true;

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



  const scanners = [];
  let curScanner = null;
  _.each(input, line => {
    if (line) {
      let matches;
      // eslint-disable-next-line no-cond-assign
      if (matches = line.match(/--- scanner (\d+) ---/)) {
        curScanner = matches[1];
      } else {
        if (!scanners[curScanner]) {
          scanners[curScanner] = [];
        }
        const [x, y, z] = line.split(',').map(i => parseInt(i, 10));
        scanners[curScanner].push([x, y, z]);
      }
    }
  });

  // scanners can only see 1000 units away

  const numRotations = 24;
  const getRotations = ([x, y, z]) => {
    // stolen from https://www.reddit.com/r/adventofcode/comments/rk0fyk/2021_day19_question_can_somebeody_tell_me_if_my/
    return [
      // x is facing x
      [x, y, z],
      [x, -z, y],
      [x, -y, -z],
      [x, z, -y],
      // x is facing -x
      [-x, -y, z],
      [-x, -z, -y],
      [-x, y, -z],
      [-x, z, y],
      // x is facing y
      [-z, x, -y],
      [y, x, -z],
      [z, x, y],
      [-y, x, z],
      // x is facing -y
      [z, -x, -y],
      [y, -x, z],
      [-z, -x, y],
      [-y, -x, -z],
      // x is facing z
      [-y, -z, x],
      [z, -y, x],
      [y, z, x],
      [-z, y, x],
      // x is facing -z
      [z, y, -x],
      [-y, z, -x],
      [-z, -y, -x],
      [y, -z, -x]
    ]
  };

  const knownBeacons = [...scanners[0]];
  const scannerPositions = [
    [0, 0, 0],
  ];
  let toSolve = _.range(1, scanners.length);


  let knownStart = 0;
  while (toSolve.length > 0) {
    log(`Need to solve ${toSolve.length} scanners, starting with knownBeacon ${knownStart}...`);
    // each time we go through, we only need to test new knownBeacons
    let prevKnown = knownBeacons.length;
    for (let s = 0; s < toSolve.length; s += 1) {
      const scanner = toSolve[s];
      let found = false;
      if (global.gc) {
        global.gc();
      }
      for (let i = 0; i < knownBeacons.length && !found; i += 1) {
        const comp = _.map(scanners[scanner], getRotations);
        for (let j = 0; j < comp.length && !found; j += 1) {
          for (let k = 0; k < numRotations && !found; k += 1) {
            const [dx, dy, dz] = [
              knownBeacons[i][0] - comp[j][k][0],
              knownBeacons[i][1] - comp[j][k][1],
              knownBeacons[i][2] - comp[j][k][2],
            ];
            // now shift all other compare scan points and see how many matches there are
            const shifted = _.map(comp, (points) => ([
              points[k][0] + dx,
              points[k][1] + dy,
              points[k][2] + dz,
            ]));
            const intersections = _.intersectionBy(
              knownBeacons,
              shifted,
              ([x, y, z]) => `${x}-${y}-${z}`,
            );
            const overlap = intersections.length;
            if (overlap >= 12) {
              log(`Solved scanner ${scanner} - Found ${overlap} matches from rotation ${k} (${dx}, ${dy}, ${dz})`);
              found = true;
              scannerPositions[scanner] = [dx, dy, dz];
              const diffs = _.differenceBy(
                shifted,
                knownBeacons,
                ([x, y, z]) => `${x}-${y}-${z}`,
              );
              _.each(diffs, d => knownBeacons.push(d));
              toSolve = _.without(toSolve, scanner);
            }
          }
        }
      }
    }
    knownStart = prevKnown;
  }

  answer = knownBeacons.length;

  const manhattanDistance = ([ax, ay, az], [bx, by, bz]) => Math.abs(ax - bx) + Math.abs(ay - by) + Math.abs(az - bz);

  let maxManhattanDist = 0;
  for (let i = 0; i < scannerPositions.length; i += 1) {
    for (let j = i + 1; j < scannerPositions.length; j += 1) {
      const dist = manhattanDistance(scannerPositions[i], scannerPositions[j]);
      if (dist > maxManhattanDist) {
        maxManhattanDist = dist;
      }
    }
  }

  log(`  Part 2 = ${maxManhattanDist}  `);

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

  let answer = 'Check output above';






  return answer;
}
