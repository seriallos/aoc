/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  // part 1
  let part1Answer = null;

  let curGroup = 0;
  const groups = [];
  const groups2 = [];
  _.each(input, line => {
    if (!line) {
      // new group
      curGroup += 1;
    } else {
      if (!groups[curGroup]) {
        groups[curGroup] = new Set();
      }
      _.each(line, ch => groups[curGroup].add(ch));

      if (!groups2[curGroup]) {
        // seed the group with the first response
        groups2[curGroup] = _.split(line, '');
      } else {
        groups2[curGroup] = _.intersection(groups2[curGroup], _.split(line, ''));
      }
    }
  });

  part1Answer = _.sumBy(groups, g => g.size);


  console.log(`Part 1: ${part1Answer}`);



  // part 2
  let part2Answer = null;

  part2Answer = _.sumBy(groups2, g => g.length);

  console.log(`Part 2: ${part2Answer}`);
}

export default solve;
