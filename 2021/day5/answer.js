/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  // part 1
  let part1Answer = null;

  const map = [
  ];

  const overlaps = new Set();
  let maxY = 11;
  let maxX = 11;

  const draw = ()  => {
    for (let y = 0; y < maxY; y += 1) {
      for (let x = 0; x < maxX; x += 1) {
        process.stdout.write((map[y] && map[y][x]) ? String(map[y][x]) : '.');
      }
      process.stdout.write('\n');
    }
  };

  _.each(input, line => {
    if (!line) {
      return;
    }
    const [ first, second ] = _.split(line, ' -> ');
    const [x1, y1] = _.map(_.split(first, ','), i => parseInt(i, 10));
    const [x2, y2] = _.map(_.split(second, ','), i => parseInt(i, 10));

    if (x1 > maxX) maxX = x1;
    if (x2 > maxX) maxX = x2;
    if (y1 > maxY) maxY = y1;
    if (y2 > maxY) maxY = y2;

    if (x1 === x2) {
      //console.log('vert', x1, y1, '->', x2, y2);
      let yMin, yMax;
      if (y1 < y2) {
        yMin = y1;
        yMax = y2;
      } else {
        yMin = y2;
        yMax = y1;
      }
      for (let y = yMin; y <= yMax; y += 1) {
        if (!map[y]) {
          map[y] = [];
        }
        if (!map[y][x1]) {
          map[y][x1] = 0;
        }
        map[y][x1] += 1;
        if (map[y][x1] > 1) {
          overlaps.add(`${x1}-${y}`);
        }
      }
    } else if (y1 === y2) {
      //console.log('horiz', x1, y1, '->', x2, y2);
      let xMin, xMax;
      if (x1 < x2) {
        xMin = x1;
        xMax = x2;
      } else {
        xMin = x2;
        xMax = x1;
      }
      for (let x = xMin; x <= xMax; x += 1) {
        if (!map[y1]) {
          map[y1] = [];
        }
        if (!map[y1][x]) {
          map[y1][x] = 0;
        }
        map[y1][x] += 1;
        if (map[y1][x] > 1) {
          overlaps.add(`${x}-${y1}`);
        }
      }
    } else {
      // Have to remove all the diagonal code to get the p1 answer to work properly
      //console.log('diag', x1, y1, '->', x2, y2);
      let xMin, xMax, yMin, yMax;
      let xDir;
      if (y1 < y2) {
        yMin = y1;
        yMax = y2;
        xMin = x1;
        xMax = x2;
      } else {
        yMin = y2;
        yMax = y1;
        xMin = x2;
        xMax = x1;
      }
      if (xMin < xMax) {
        xDir = 1;
      } else {
        xDir = -1;
      }

      let x = xMin;
      for (let y = yMin; y <= yMax; y += 1) {
        if (!map[y]) {
          map[y] = [];
        }
        if (!map[y][x]) {
          map[y][x] = 0;
        }
        map[y][x] += 1;
        if (map[y][x] > 1) {
          overlaps.add(`${x}-${y}`);
        }
        x += xDir;
      }
    }
  });
  part1Answer = overlaps.size;

  console.log(`Part 1: ${part1Answer}`);


  // part 2
  let part2Answer = overlaps.size;


  console.log(`Part 2: ${part2Answer}`);
}

export default solve;
