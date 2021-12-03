/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));


  // part 1

  const ones = [];
  for (let i = 0; i < input.length; i += 1) {
    const num = input[i];
    for (let j = 0; j < num.length; j += 1) {
      if (num[j] === '1') {
        if (!ones[j]) {
          ones[j] = 0;
        }
        ones[j] += 1;
      }
    }
  }

  let gamma = '';
  let epsilon = '';
  for (let i = 0; i < ones.length; i += 1) {
    if (ones[i] > (input.length / 2)) {
      gamma += '1';
      epsilon += '0';
    } else {
      gamma += '0';
      epsilon += '1';
    }
  }
  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  const power = gamma * epsilon;

  console.log('gamme', gamma, 'epsilon', epsilon, 'power', power);

  console.log(`Part 1: ${power}`);

  // part 2

  let oxygen = '';
  let candidates = [...input];
  for (let i = 0; i < input[0].length; i += 1) {
    const zeroCandidates = [];
    const oneCandidates = [];
    for (let j = 0; j < candidates.length; j += 1) {
      if (candidates[j][i] === '1') {
        oneCandidates.push(candidates[j]);
      } else {
        zeroCandidates.push(candidates[j]);
      }
    }
    if (oneCandidates.length >= zeroCandidates.length) {
      candidates = oneCandidates;
      oxygen += '1';
    } else {
      candidates = zeroCandidates;
      oxygen += '0';
    }
  }

  let co2 = '';
  candidates = [...input];
  for (let i = 0; i < input[0].length; i += 1) {
    if (candidates.length === 1) {
      co2 += candidates[0][i];
      continue;
    }
    const zeroCandidates = [];
    const oneCandidates = [];
    for (let j = 0; j < candidates.length; j += 1) {
      if (candidates[j][i] === '1') {
        oneCandidates.push(candidates[j]);
      } else {
        zeroCandidates.push(candidates[j]);
      }
    }
    if (oneCandidates.length < zeroCandidates.length || zeroCandidates.length === 0) {
      candidates = oneCandidates;
      co2 += '1';
    } else {
      candidates = zeroCandidates;
      co2 += '0';
    }
  }
  console.log('oxygen', oxygen, parseInt(oxygen, 2));
  console.log('co2', co2, parseInt(co2, 2));

  const answer = parseInt(oxygen, 2) * parseInt(co2, 2);

  console.log(`Part 2: ${answer}`);

}

export default solve;
