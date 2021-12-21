/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

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



  let [, p1Pos] = input[0].match(/position: (\d+)/);
  let [, p2Pos] = input[1].match(/position: (\d+)/);

  const positions = [
    parseInt(p1Pos, 10) - 1,
    parseInt(p2Pos, 10) - 1,
  ];

  const numPlayers = _.size(positions);

  const scores = [
    0,
    0,
  ];

  const spaces = 10;

  let turn = 0;

  let curRoll = 0;
  const roll = () => {
    const r = curRoll;
    curRoll += 1;
    return (r % 100) + 1;
  };

  while (_.every(scores, s => s < 1000)) {
    const player = turn % numPlayers;
    const rolls = [roll(), roll(), roll()];
    const move = _.sum(rolls);
    positions[player] += move;
    const pos = (positions[player] % spaces);
    scores[player] += pos + 1;
    //log(`Player ${player + 1} rolls ${rolls.join('+')} and move to space ${pos + 1} for a total score of ${scores[player]}`);
    turn += 1;
  }

  answer = _.min(scores) * curRoll;


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




  let [, p1Pos] = input[0].match(/position: (\d+)/);
  let [, p2Pos] = input[1].match(/position: (\d+)/);


  const spaces = 10;
  const winningScore = 21;

  const wins = [
    0,
    0,
  ];

  const startingPositions = [
    parseInt(p1Pos, 10) - 1,
    parseInt(p2Pos, 10) - 1,
  ];

  const numPlayers = 2;

  // 3d3
  const dieStats = [];
  dieStats[3] = 1;
  dieStats[4] = 3;
  dieStats[5] = 6;
  dieStats[6] = 7;
  dieStats[7] = 6;
  dieStats[8] = 3;
  dieStats[9] = 1;

  const play = rolls => {
    const scores = [0, 0];
    const positions = [...startingPositions];
    let turn = 0;
    while (scores[0] < winningScore && scores[1] < winningScore) {
      if (rolls[turn] === undefined) {
        return null;
      }
      const player = turn % numPlayers;
      positions[player] += rolls[turn];
      scores[player] += (positions[player] % spaces) + 1;
      turn += 1;
    }
    return scores[0] >= winningScore ? 0 : 1;
  };

  let universesFound = 0;
  let solutionsFound = 0;
  const walk = (rolls = [], numUniverses = 1) => {
    for (let i = 3; i <= 9; i += 1) {
      const newRolls = [...rolls, i];
      const newUniverses = numUniverses * dieStats[i];
      const winner = play(newRolls);
      if (winner !== null) {
        solutionsFound += 1;
        universesFound += newUniverses;
        if (solutionsFound % 10000000 === 0) {
          log(
            solutionsFound.toLocaleString(),
            '\t',
            universesFound.toLocaleString(),
            '\t',
            _.map(wins, w => w.toLocaleString()),
          );
        }
        wins[winner] += newUniverses;
      } else {
        // keep rolling
        walk(newRolls, newUniverses);
      }
    }
  };

  walk();

  answer = _.max(wins);

  // real: 444,356,092,776,315
  // mine: 1588312295

  // 444356092776315
  // 17198031389



  return answer;
}
