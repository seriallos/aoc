/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

const run = (program) => {
  let acc = 0;
  let instrPointer = 0;

  const linesExecuted = new Set();
  let loopFound = false;
  let finished = false;
  while (!loopFound && !finished) {
    const instr = program[instrPointer];
    if (!instr) {
      finished = true;
      return {
        acc,
        loop: false,
      };
    } else if (linesExecuted.has(instrPointer)) {
      loopFound = true;
      return {
        acc,
        loop: true,
      };
    } else {
      linesExecuted.add(instrPointer);
      switch (instr.op) {
        case 'acc':
          acc += instr.value;
          instrPointer += 1;
          break;
        case 'nop':
          instrPointer += 1;
          break;
        case 'jmp':
          instrPointer += instr.value;
          break;
        default:
          console.log('Unknown instruction', instrPointer, instr.op);
          process.exit(1);
      }
    }
  }
}

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));

  // part 1
  let part1Answer = null;

  let program = [];

  _.each(input, line => {
    if (line) {
      let [op, value] = _.split(line, ' ');
      value = parseInt(value, 10);
      program.push({
        op,
        value,
      });
    }
  });

  part1Answer = run(program).acc;

  console.log(`Part 1: ${part1Answer}`);

  // part 2
  let part2Answer = null;

  // generate the program variations, jmp to nop, nop to jmp
  _.each(program, (line, idx) => {
    let variant;
    if (line.op === 'jmp') {
      variant = [...program];
      variant[idx] = {
        ...program[idx],
        op: 'nop',
      };
    } else if (line.op === 'nop') {
      variant = [...program];
      variant[idx] = {
        ...program[idx],
        op: 'jmp',
      };
    }
    if (variant) {
      const result = run(variant);
      if (!result.loop) {
        part2Answer = result.acc;
        return false;
      }
    }
  });


  console.log(`Part 2: ${part2Answer}`);
}

export default solve;
