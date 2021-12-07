/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input, isTest) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  const log = (...args) => {
    if (isTest) {
      console.log(...args);
    }
  };

  // part 1
  let part1Answer = null;
  let part2Answer = null;

  let windowSize = isTest ? 5 : 25;

  let prev = [];
  let full = [];
  _.each(input, rawNum => {
    const num = parseInt(rawNum, 10);
    if (prev.length === windowSize) {
      let valid = false;
      for (let i = 0; i < windowSize - 1; i += 1) {
        for (let j = i + 1; j < windowSize; j += 1) {
          if (prev[i] + prev[j] === num) {
            valid = true;
            break;
          }
        }
        if (valid) {
          break;
        }
      }
      if (!valid) {
        part1Answer = num;
        // part 2
        // find contiguous list of numbers that add up to the invalid number
        for (let i = 0; i < full.length - 1; i += 1) {
          const group = [full[i]];
          let sum = full[i];
          for (let j = i + 1; j < full.length; j += 1) {
            group.push(full[j]);
            sum += full[j];
            if (sum === num) {
              part2Answer = _.min(group) + _.max(group);
              break;
            }
          }
        }

        return false;
      }
    }
    prev.push(num);
    full.push(num);
    if (prev.length > windowSize) {
      prev.shift();
    }
  });


  console.log(`Part 1: ${part1Answer}`);



  // part 2


  console.log(`Part 2: ${part2Answer}`);
}

export default solve;
