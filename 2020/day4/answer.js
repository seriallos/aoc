/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
function solve(input) {
  // const inputInts = _.map(input, i => parseInt(i, 10));
  const required = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
  ];
  let cur = {
    byr: null,
    iyr: null,
    eyr: null,
    hgt: null,
    hcl: null,
    ecl: null,
    pid: null,
  };
  let valid = 0;
  _.each(input, line => {
    if (!line) {
      if (_.every(_.pick(cur, required))) {
        valid += 1;
      }
      cur = {
        byr: null,
        iyr: null,
        eyr: null,
        hgt: null,
        hcl: null,
        ecl: null,
        pid: null,
      };
    } else {
      _.each(_.split(line, ' '), pair => {
        const [key, value] = _.split(pair, ':');
        cur[key] = value;
      });
    }
  });

  console.log(`Part 1: ${valid}`);

  let numValid = 0;
  const validEyeColors = [
    'amb',
    'blu',
    'brn',
    'gry',
    'grn',
    'hzl',
    'oth',
  ];
  _.each(input, line => {
    if (!line) {
      let valid = true;
      if (!_.every(_.pick(cur, required))) {
        valid = false;
      }
      const byr = parseInt(cur.byr);
      if (!byr || byr < 1920 || byr > 2002) {
        valid = false;
      }
      const iyr = parseInt(cur.iyr, 10);
      if (!iyr || iyr < 2010 || iyr > 2020) {
        valid = false;
      }
      const eyr = parseInt(cur.eyr, 10);
      if (!eyr || eyr < 2020 || eyr > 2030) {
        valid = false;
      }
      const hgt = cur.hgt;
      if (hgt) {
        const matches = hgt.match(/(\d+)([a-z]+)/);
        if (!matches) {
          valid = false;
        } else {
          const value = matches[1];
          const measure = matches[2];
          if (!measure) {
            valid = false;
          } else {
            if (measure === 'in') {
              const inches = parseInt(value, 10);
              if (inches < 59 || inches > 76) {
                valid = false;
              }
            } else if (measure === 'cm') {
              const cms = parseInt(value, 10);
              if (cms < 150 || cms > 193) {
                valid = false;
              }
            }
          }
        }
      }
      if (!cur.hcl || !cur.hcl.match(/#[0-9a-f]{6}/)) {
        valid = false;
      }

      // ecl
      if (!_.includes(validEyeColors, cur.ecl)) {
        valid = false;
      }

      // pid
      if (!cur.pid || !cur.pid.match(/^[0-9]{9}$/)) {
        valid = false;
      }

      if (valid) {
        numValid += 1;
      }
      cur = {
        byr: null,
        iyr: null,
        eyr: null,
        hgt: null,
        hcl: null,
        ecl: null,
        pid: null,
      };
    } else {
      _.each(_.split(line, ' '), pair => {
        const [key, value] = _.split(pair, ':');
        cur[key] = value;
      });
    }
  });

  console.log(`Part 2: ${numValid}`);

  // guess 180 - too high
}

export default solve;
