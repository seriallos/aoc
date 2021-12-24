/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import assert from 'assert';

import printf from 'printf';

// eslint-disable-next-line no-unused-vars
import { drawGrid } from '../../util.js';

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



  const program = [];
  _.each(input, line => {
    if (line) {
      const [instruction, arg1, arg2] = line.split(' ');
      program.push({
        instruction,
        arg1,
        arg2,
      });
    }
  });

  const run = (program, input, output = false) => {
    assert(_.isArray(input), 'input is not an array');
    let inputCount = 0;
    const vars = {
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    };

    let badInput = false;
    _.each(program, ({instruction, arg1, arg2}) => {
      let curInput = input[inputCount];

      let arg2value = parseInt(arg2);
      if (_.isNaN(arg2value)) {
        arg2value = vars[arg2];
      }
      switch (instruction) {
        case 'inp': {
          if (output) {
            log();
          }
          const ch = curInput;
          vars[arg1] = ch === 'x' ? 0 : parseInt(curInput, 10);
          inputCount += 1;
          break;
        }
        case 'add':
          vars[arg1] = vars[arg1] + arg2value;
          break;
        case 'mul':
          vars[arg1] = vars[arg1] * arg2value;
          break;
        case 'div':
          vars[arg1] = Math.trunc(vars[arg1] / arg2value);
          break;
        case 'mod':
          vars[arg1] = vars[arg1] % arg2value;
          break;
        case 'eql':
          vars[arg1] = vars[arg1] === arg2value ? 1 : 0;
          break;
        default:
          log('UNKNOWN INSTRUCTION', instruction);
          break;
      }
      if (output) {
        log(printf(
          '%s %2s %3s %10d %10d %10d %10s',
          instruction,
          arg1,
          arg2 || '',
          vars.w,
          vars.x,
          vars.y,
          vars.z.toString(26),
        ));
      }
    });

    if (badInput) {
      return null;
    }

    return {...vars};
  };


  if (isTest) {
    return 'No example for this problem';
  }

  let test = 9999999;
  //         11345678901234

  let found = false;
  let tested = 0;
  do {
    if (tested % 1000000 === 0) {
      log('testing', tested);
    }
    if (!String(test).match(/0/)) {
      const bits = _.map(String(test).split(''), i => parseInt(i, 10));
      const hack = [
        bits[0],
        bits[1],
        bits[2],
        'x',
        bits[3],
        bits[4],
        'x',
        bits[5],
        'x',
        bits[6],
        'x',
        'x',
        'x',
        'x',
      ];

      // Used these comments as a guide to determine valid numbers for my input
      // I was getting close to hacking this kind of solution by watching for 'eql x w' instructions
      // and backfilling the correct numeric input but it didn't quite work
      // https://www.reddit.com/r/adventofcode/comments/rnejv5/2021_day_24_solutions/hps5hgw/

      hack[13] = hack[0] + 1 - 5;
      hack[12] = hack[1] + 9 - 6;
      hack[3] = hack[2] + 11 - 13;
      hack[11] = hack[4] + 6 - 11;
      hack[6] = hack[5] + 13 - 14;
      hack[8] = hack[7] + 5 - 8;
      hack[10] = hack[9] + 2 - 9;

      if (_.some(hack, i => i <= 0 || i >= 10)) {
        // correct number isn't 1-9
      } else {
        const results = run(program, hack);
        if (results !== null) {
          if (results.z === 0) {
            log('found', hack.join(''));
            found = true;
            answer = hack.join('');
          }
        }
      }
    }
    test -= 1;
    tested += 1;
  } while (!found);



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




  const program = [];
  _.each(input, line => {
    if (line) {
      const [instruction, arg1, arg2] = line.split(' ');
      program.push({
        instruction,
        arg1,
        arg2,
      });
    }
  });

  const run = (program, input, output = false) => {
    assert(_.isArray(input), 'input is not an array');
    let inputCount = 0;
    const vars = {
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    };

    let badInput = false;
    _.each(program, ({instruction, arg1, arg2}) => {
      let curInput = input[inputCount];

      let arg2value = parseInt(arg2);
      if (_.isNaN(arg2value)) {
        arg2value = vars[arg2];
      }
      switch (instruction) {
        case 'inp': {
          if (output) {
            log();
          }
          const ch = curInput;
          vars[arg1] = ch === 'x' ? 0 : parseInt(curInput, 10);
          inputCount += 1;
          break;
        }
        case 'add':
          vars[arg1] = vars[arg1] + arg2value;
          break;
        case 'mul':
          vars[arg1] = vars[arg1] * arg2value;
          break;
        case 'div':
          vars[arg1] = Math.trunc(vars[arg1] / arg2value);
          break;
        case 'mod':
          vars[arg1] = vars[arg1] % arg2value;
          break;
        case 'eql':
          vars[arg1] = vars[arg1] === arg2value ? 1 : 0;
          break;
        default:
          log('UNKNOWN INSTRUCTION', instruction);
          break;
      }
      if (output) {
        log(printf(
          '%s %2s %3s %10d %10d %10d %10s',
          instruction,
          arg1,
          arg2 || '',
          vars.w,
          vars.x,
          vars.y,
          vars.z.toString(26),
        ));
      }
    });

    if (badInput) {
      return null;
    }

    return {...vars};
  };


  if (isTest) {
    return 'No example for this problem';
  }

  let test = 1;
  //         11345678901234

  let found = false;
  let tested = 0;
  do {
    if (tested % 1000000 === 0) {
      log('testing', tested);
    }
    if (!String(test).match(/0/)) {
      const bits = _.map(String(test).split(''), i => parseInt(i, 10));
      const hack = [
        bits[0],
        bits[1],
        bits[2],
        'x',
        bits[3],
        bits[4],
        'x',
        bits[5],
        'x',
        bits[6],
        'x',
        'x',
        'x',
        'x',
      ];

      // Used these comments as a guide to determine valid numbers
      // I was getting close to hacking this kind of solution by watching for 'eql x w' instructions
      // and backfilling the correct numeric input but it didn't quite work
      // https://www.reddit.com/r/adventofcode/comments/rnejv5/2021_day_24_solutions/hps5hgw/

      hack[13] = hack[0] + 1 - 5;
      hack[12] = hack[1] + 9 - 6;
      hack[3] = hack[2] + 11 - 13;
      hack[11] = hack[4] + 6 - 11;
      hack[6] = hack[5] + 13 - 14;
      hack[8] = hack[7] + 5 - 8;
      hack[10] = hack[9] + 2 - 9;

      if (_.some(hack, i => i <= 0 || i >= 10)) {
        // correct number isn't 1-9
      } else {
        const results = run(program, hack);
        if (results !== null) {
          if (results.z === 0) {
            log('found', hack.join(''));
            found = true;
            answer = hack.join('');
          }
        }
      }
    }
    test += 1;
    tested += 1;
  } while (!found);





  return answer;
}
