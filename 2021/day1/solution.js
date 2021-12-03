import _ from 'lodash';

function solve(input) {
  const measurements = _.map(input, i => parseInt(i, 10));

  let largerThanPrev = 0;
  let windowLargerThanPrev = 0;

  let prev = null;
  let prevWindow = null;

  const window = [];

  for (let i = 0; i < measurements.length; i += 1) {
    const cur = measurements[i];

    // part 1
    if (prev !== null) {
      if (cur > prev) {
        largerThanPrev += 1;
      }
    }
    prev = cur;

    // part 2
    let windowSum = null;
    window.push(cur);
    if (window.length > 3) {
      window.shift();
    }
    windowSum = _.sum(window);
    if (window.length === 3) {
      if (prevWindow !== null) {
        if (windowSum > prevWindow) {
          windowLargerThanPrev += 1;
        }
      }
      prevWindow = windowSum;
    }

  }

  console.log(`Part 1: Number of measurements larger than previous: ${largerThanPrev}`);
  console.log(`Part 2: Number of measurement windows larger than previous: ${windowLargerThanPrev}`);
}

export default solve;
