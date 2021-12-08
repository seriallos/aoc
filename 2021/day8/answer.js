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

  /*

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

*/

  let answer = null;

  const lengths = [
    6,
    2,
    5,
    5,
    4,
    5,
    6,
    3,
    7,
    6,
  ]
  const uniqueLengths = [
    lengths[1],
    lengths[4],
    lengths[7],
    lengths[8],
  ];
  let appearances = 0;
  _.each(input, line => {
    if (line) {
      const [ patternsRaw, outputRaw ] = _.split(line, '|');
      const patterns = _.filter(_.map(_.split(patternsRaw, ' '), p => _.trim(p)));
      const output = _.filter(_.map(_.split(outputRaw, ' '), p => _.trim(p)));
      _.each(output, o => {
        if (_.includes(uniqueLengths, o.length)) {
          appearances += 1;
        }
      });
    }
  });

  answer = appearances;


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


  const lengths = [
    6, // 0
    2, // 1
    5, // 2
    5, // 3
    4, // 4
    5, // 5
    6, // 6
    3, // 7
    7, // 8
    6, // 9
  ];

  const hasLetters = (str, compare) => {
    return _.every(compare, ch => {
      return _.includes(str, ch);
    });
  };
  let total = 0;
  _.each(input, (line, idx) => {
    if (line) {
      const [ patternsRaw, outputRaw ] = _.split(line, '|');
      const patterns = _.filter(_.map(_.split(patternsRaw, ' '), p => _.trim(p)));
      const output = _.filter(_.map(_.split(outputRaw, ' '), p => _.trim(p)));
      const combined = _.uniq(_.map([...patterns, ...output], n => n.split('').sort().join('')));

      const numbers = [];
      _.each(combined, o => {
        if (o.length === lengths[1]) {
          numbers[1] = o;
        } else if (o.length === lengths[4]) {
          numbers[4] = o;
        } else if (o.length === lengths[7]) {
          numbers[7] = o;
        } else if (o.length === lengths[8]) {
          numbers[8] = o;
        }
      });

      const top = _.first(_.filter(numbers[7], ch => !_.includes(numbers[1], ch)));
      numbers[6] = _.first(_.filter(combined, n => n.length === 6 && !hasLetters(n, numbers[7])));
      const topRight = _.first(_.filter(numbers[8], ch => !_.includes(numbers[6], ch)));
      const lowerRight = _.first(_.filter(numbers[1], ch => ch !== topRight));
      numbers[3] = _.first(_.filter(combined, n => n.length === 5 && hasLetters(n, numbers[7])));
      numbers[2] = _.first(_.filter(combined, n => n.length === 5 && !_.includes(n, lowerRight)));
      numbers[5] = _.first(_.filter(combined, n => n.length === 5 && n !== numbers[3] && n !== numbers[2]));
      const lowerLeft = _.first(_.reject(numbers[2], ch => _.includes(numbers[3], ch)));

      // 0
      // 9
      numbers[9] = _.first(_.filter(combined, n => n.length === 6 && !_.includes(n, lowerLeft)));
      numbers[0] = _.first(_.filter(combined, n => n.length === 6 && _.includes(n, lowerLeft) && n !== numbers[6]));

      let str = '';
      _.each(_.map(output, o => o.split('').sort().join('')), num => {
        const n = _.findIndex(numbers, n => n === num);
        if (n === -1) {
          log(numbers, num, n);
          log('BAD PARSE ON LINE', idx);
        }
        str += _.findIndex(numbers, n => n === num);
      });
      total += +str;
    }
  });

  answer = total;

  return answer;
}
