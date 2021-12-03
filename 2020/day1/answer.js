/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));
  const entries = _.map(input, l => parseInt(l, 10));
  console.log(entries);

  let answer;
  for(let i = 0; i < entries.length; i += 1) {
    const a = entries[i];
    for (let j = i + 1; j < entries.length; j += 1) {
      const b = entries[j];
      if (a + b === 2020) {
        answer = a *  b;
        console.log(`${a} * ${b} = ${answer}`);
        break;
      }
    }
  }

  console.log(`Part 1: ${answer}`);

  for(let i = 0; i < entries.length; i += 1) {
    const a = entries[i];
    for (let j = i + 1; j < entries.length; j += 1) {
      const b = entries[j];
      for (let k = j + 1; k < entries.length; k += 1) {
        const c = entries[k];
        if (a + b + c === 2020) {
          answer = a *  b * c;
          console.log(`${a} * ${b} * ${c} = ${answer}`);
          break;
        }
      }
    }
  }

  console.log(`Part 2: ${answer}`);
}

export default solve;
