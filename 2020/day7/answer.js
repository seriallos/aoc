/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  // part 1
  let part1Answer = null;

  const target = 'shiny gold';

  const rules = {};
  const containedBy = {};
  _.each(input, line => {
    if (line) {
      const [, type, contains] = line.match(/(\w+ \w+) bags contain (.*)/);
      const rule = {
        type,
      };
      let bagContains = [];
      if (contains == 'no other bags.') {
        // no op
      } else {
        _.each(_.split(contains, ', '), bagStr => {
          const [, num, bag] = bagStr.match(/(\d+) (\w+ \w+) bag/);
          bagContains.push({
            type: bag,
            num,
          });
          if (!containedBy[bag]) {
            containedBy[bag] = [];
          }
          containedBy[bag].push(type);
        });
      }
      rule.contains = bagContains;
      rules[type] = rule;
    }
  });

  const possibleBags = new Set();
  const candidates = containedBy[target];
  // need this check for the 2nd part example input
  if (candidates) {
    while (candidates.length > 0) {
      const candidate = candidates.shift();
      possibleBags.add(candidate);
      _.each(containedBy[candidate], bag => {
        if (!possibleBags.has(bag)) {
          candidates.push(bag);
        }
      });
    }
  }

  part1Answer = possibleBags.size;

  console.log(`Part 1: ${part1Answer}`);

  // part 2
  let part2Answer = 0;

  const toVisit = [rules[target]];
  while (toVisit.length > 0) {
    const node = toVisit.shift();
    _.each(node.contains, bag => {
      for (let i = 0; i < bag.num; i += 1) {
        part2Answer += 1;
        toVisit.push(rules[bag.type]);
      }
    });
  }

  console.log(`Part 2: ${part2Answer}`);
}

export default solve;
