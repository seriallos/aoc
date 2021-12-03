/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  let valid = 0;
  _.each(input, line => {
    const [, min, max, required, password] = line.match(/(\d+)-(\d+) ([a-z]): (.*)/);
    const count = _.size(_.filter(password, c => c === required));
    if (count >= min && count <= max) {
      valid += 1;
    }
  });

  console.log(`Part 1: ${valid}`);

  valid = 0;
  _.each(input, line => {
    const [, min, max, required, password] = line.match(/(\d+)-(\d+) ([a-z]): (.*)/);
    const firstMatch = password[min - 1] === required;
    const lastMatch = password[max - 1] === required;
    if ((firstMatch || lastMatch) && !(firstMatch && lastMatch)) {
      valid += 1;
    }
  });

  console.log(`Part 2: ${valid}`);
}

export default solve;
