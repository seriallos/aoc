/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

const LOG_TEST = true;
const LOG_REAL = false;

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





  const openers = '({<[';
  const stack = [];
  const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };
  const invalidChars = {
  };
  let score = 0;
  _.each(input, line => {
    _.each(line, ch => {
      let corrupt = false;
      if (_.includes(openers, ch)) {
        stack.push(ch);
      } else {
        const opener = stack.pop(ch);
        if (
          opener === '(' && ch !== ')'
          || opener === '{' && ch !== '}'
          || opener === '[' && ch !== ']'
          || opener === '<' && ch !== '>'
        ) {
          if (!invalidChars[ch]) {
            invalidChars[ch] = 0;
          }
          invalidChars[ch] += 1;
          corrupt = true;
        }
      }
      if (corrupt) {
        score += points[ch];
      }
    });
  });


  answer = score;



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


  const openers = '({<[';
  const scores = [];
  _.each(input, line => {
    if (!line) {
      return;
    }
    const stack = [];
    let corrupt = false;
    _.each(line, ch => {
      if (_.includes(openers, ch)) {
        stack.push(ch);
      } else {
        const opener = stack.pop(ch);
        if (
          opener === '(' && ch !== ')'
          || opener === '{' && ch !== '}'
          || opener === '[' && ch !== ']'
          || opener === '<' && ch !== '>'
        ) {
          // nothing
          corrupt = true;
          return false;
        }
      }
    });
    if (!corrupt) {
      // incomplete
      let score = 0;
      const toClose = _.join(_.map(_.reverse(stack), ch => {
        score *= 5;
        switch (ch) {
          case '(': score += 1; return ')';
          case '[': score += 2; return ']';
          case '{': score += 3; return '}';
          case '<': score += 4; return '>';
        }
      }), '');
      log(toClose, score);
      scores.push(score);
    }
  });

  const middle = (scores.length - 1) / 2;
  scores.sort((a, b) => a - b);

  answer = scores[middle];








  return answer;
}
