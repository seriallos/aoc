/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

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

  const rules = {};

  const start = input[0];
  input.shift();
  input.shift();
  _.each(input, line => {
    if (line) {
      const [test, insert] = _.split(line, ' -> ');
      rules[test] = {
        test,
        insert,
      };
    }
  });

  /*
  Template:     NNCB
  After step 1: NCNBCHB
  After step 2: NBCCNBBBCBHCB
                NBCCNBBBCBHCB
  After step 3: NBBBCNCCNBBNBNBBCHBHHBCHB
  After step 4: NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
  */

  let polymer = start;
  for (let step = 1; step <= 10; step += 1) {
    let nextPolymer = '';
    for (let i = 0; i < polymer.length - 1; i += 1) {
      const pair = polymer.substr(i, 2);
      if (i === 0) {
        nextPolymer += pair[0];
      }
      nextPolymer += rules[pair].insert;
      nextPolymer += pair[1];
    }
    polymer = nextPolymer;
  }

  const elements = _.mapValues(_.groupBy(polymer), (value, key) => ({ element: key, count: value.length }));
  const sorted = _.sortBy(elements, 'count');

  answer = sorted[sorted.length - 1].count - sorted[0].count;

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





  const rules = {};

  const start = input[0];
  input.shift();
  input.shift();
  _.each(input, line => {
    if (line) {
      const [test, insert] = _.split(line, ' -> ');
      rules[test] = {
        test,
        insert,
      };
    }
  });

  /*
  Template:     NNCB
  After step 1: NCNBCHB
  After step 2: NBCCNBBBCBHCB
  After step 3: NBBBCNCCNBBNBNBBCHBHHBCHB
  After step 4: NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
  */

  // each step is 2x - 1 length

  let polymer = start;
  let pairs = _.map(_.range(0, polymer.length - 1), i => {
    const pair = polymer[i] + polymer[i + 1];
    return pair;
  });
  pairs = _.countBy(pairs);
  for (let step = 1; step <= 40; step += 1) {
    let newPairs = {};
    const counts = {};
    let first = true;
    _.each(pairs, (count, pair) => {
      const rule = rules[pair];
      const pairA = pair[0] + rule.insert;
      const pairB = rule.insert + pair[1];
      if (!newPairs[pairA]) {
        newPairs[pairA] = 0;
      }
      newPairs[pairA] += count;

      if (!newPairs[pairB]) {
        newPairs[pairB] = 0;
      }
      newPairs[pairB] += count;

      if (first) {
        first = false;
        if (!counts[pair[0]]) {
          counts[pair[0]] = 0;
        }
        counts[pair[0]] += count;
      }
      if (!counts[rule.insert]) {
        counts[rule.insert] = 0;
      }
      counts[rule.insert] += count;
      if (!counts[pair[1]]) {
        counts[pair[1]] = 0;
      }
      counts[pair[1]] += count;
    });
    pairs = newPairs;

    const sorted = _.sortBy(counts);

    answer = sorted[sorted.length - 1] - sorted[0];
    //log('after step', step, 'polymer length', _.sum(_.map(counts)));
    /*
      Answer after step 10 = 2571
      {
        F: 1917,
        H: 1704,
        K: 1732,
        C: 3140,
        O: 1220,
        N: 1093,
        V: 1139,
        S: 2003,
        P: 1940,
        B: 569
      }
      [
        { element: 'B', count: 637 },
        { element: 'N', count: 1270 },
        { element: 'V', count: 1368 },
        { element: 'O', count: 1407 },
        { element: 'K', count: 2040 },
        { element: 'H', count: 2053 },
        { element: 'F', count: 2211 },
        { element: 'P', count: 2289 },
        { element: 'S', count: 2402 },
        { element: 'C', count: 3780 }
      ]
    */
  }

  // 3458967022108 was wrong

  return answer;
}
