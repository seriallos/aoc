/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  let depth = 0;
  let hPos = 0;

  for (let i = 0; i < input.length; i += 1) {
    const [dir, amountStr] = _.split(input[i], ' ');
    const amount = parseInt(amountStr, 10);
    switch (dir) {
      case 'forward':
        hPos += amount;
        break;
      case 'down':
        depth += amount;
        break;
      case 'up':
        depth -= amount;
        break;
      default:
        console.log('unknown direction', dir);
        break;
    }
  }

  const result = depth * hPos;
  console.log(`Part 1: ${result} (${hPos} * ${depth})`);

  depth = 0;
  hPos = 0;
  let aim = 0;

  for (let i = 0; i < input.length; i += 1) {
    const [dir, amountStr] = _.split(input[i], ' ');
    const amount = parseInt(amountStr, 10);
    switch (dir) {
      case 'forward':
        hPos += amount;
        depth += aim * amount;
        break;
      case 'down':
        aim += amount;
        break;
      case 'up':
        aim -= amount;
        break;
      default:
        console.log('unknown direction', dir);
        break;
    }
  }

  const part2Result = depth * hPos;
  console.log(`Part 2: ${part2Result} (${hPos} * ${depth})`);
}

export default solve;
