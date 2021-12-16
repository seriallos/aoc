/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
import { drawGrid } from '../../util.js';

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


  const take = (msg, num) => {
    const bits = msg.substring(0, num);
    const rest = msg.substring(num);
    return [bits, rest];
  };

  let versionSum = 0;
  const parsePacket = data => {
    const packet = {};
    let versionStr, remains;
    [versionStr, remains] = take(data, 3);
    packet.version = parseInt(versionStr, 2);
    versionSum += packet.version;
    while (remains.length > 0) {
      if (parseInt(remains, 2) === 0) {
        break;
      }
      let packetTypeIdStr;
      [packetTypeIdStr, remains] = take(remains, 3);
      packet.type = parseInt(packetTypeIdStr, 2);
      switch (packet.type) {
        case 4: {
          // literal value
          let moreDigits = true;
          let value = '';
          do {
            let group, digits;
            [group, remains] = take(remains, 1);
            [digits, remains] = take(remains, 4);
            value += digits;
            if (group === '0') {
              moreDigits = false;
            }
          } while (moreDigits);
          packet.value = parseInt(value, 2);
          return [packet, remains];
        }
        default: {
          // operator packet
          let lengthTypeId;
          [lengthTypeId, remains] = take(remains, 1);
          if (lengthTypeId === '1') {
            let numSubPacketsStr;
            [numSubPacketsStr, remains] = take(remains, 11);
            const numSubPackets = parseInt(numSubPacketsStr, 2);
            packet.contains = [];
            for (let i = 0; i < numSubPackets; i += 1) {
              let subPacket;
              [subPacket, remains] = parsePacket(remains);
              packet.contains.push(subPacket);
            }
            return [packet, remains];
          } else {
            let bitLengthStr, packetData;
            [bitLengthStr, remains] = take(remains, 15);
            const bitLength = parseInt(bitLengthStr, 2);
            [packetData, remains] = take(remains, bitLength);
            packet.contains = [];
            let subRemains = packetData;
            do {
              let subPacket;
              [subPacket, subRemains] = parsePacket(subRemains);
              packet.contains.push(subPacket);
              if (!subRemains || !parseInt(subRemains, 2)) {
                return [packet, remains];
              }
            } while (subRemains)
          }
        }
      }
    }
    return [packet, remains];
  }

  const originalTransmission = _.map(input[0], ch => parseInt(ch, 16).toString(2).padStart(4, '0')).join('');

  const parsed = parsePacket(originalTransmission);

  answer = versionSum;


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



  const take = (msg, num) => {
    const bits = msg.substring(0, num);
    const rest = msg.substring(num);
    return [bits, rest];
  };

  let versionSum = 0;
  const parsePacket = data => {
    const packet = {};
    let versionStr, remains;
    [versionStr, remains] = take(data, 3);
    packet.version = parseInt(versionStr, 2);
    versionSum += packet.version;
    while (remains.length > 0) {
      if (parseInt(remains, 2) === 0) {
        break;
      }
      let packetTypeIdStr;
      [packetTypeIdStr, remains] = take(remains, 3);
      packet.type = parseInt(packetTypeIdStr, 2);
      switch (packet.type) {
        case 4: {
          // literal value
          packet.name = 'literal';
          let moreDigits = true;
          let value = '';
          do {
            let group, digits;
            [group, remains] = take(remains, 1);
            [digits, remains] = take(remains, 4);
            value += digits;
            if (group === '0') {
              moreDigits = false;
            }
          } while (moreDigits);
          packet.value = parseInt(value, 2);
          return [packet, remains];
        }
        default: {
          // operator packet
          let lengthTypeId;
          [lengthTypeId, remains] = take(remains, 1);
          if (lengthTypeId === '1') {
            let numSubPacketsStr;
            [numSubPacketsStr, remains] = take(remains, 11);
            const numSubPackets = parseInt(numSubPacketsStr, 2);
            packet.contains = [];
            for (let i = 0; i < numSubPackets; i += 1) {
              let subPacket;
              [subPacket, remains] = parsePacket(remains);
              packet.contains.push(subPacket);
            }
          } else {
            let bitLengthStr, packetData;
            [bitLengthStr, remains] = take(remains, 15);
            const bitLength = parseInt(bitLengthStr, 2);
            [packetData, remains] = take(remains, bitLength);
            packet.contains = [];
            let subRemains = packetData;
            do {
              let subPacket;
              [subPacket, subRemains] = parsePacket(subRemains);
              packet.contains.push(subPacket);
              if (!subRemains || !parseInt(subRemains, 2)) {
                log('no more sub-packet data', subRemains);
              }
            } while (subRemains)
          }
          switch (packet.type) {
            case 0: // sum
              packet.name = 'sum';
              packet.value = _.sumBy(packet.contains, 'value');
              break;
            case 1: // product
              packet.name = 'product';
              packet.value = _.reduce(packet.contains, (r, p) => r * p.value, 1);
              break;
            case 2: // minimum
              packet.name = 'minimum';
              packet.value = _.minBy(packet.contains, 'value')?.value;
              break;
            case 3: // maximum
              packet.name = 'maximum';
              packet.value = _.maxBy(packet.contains, 'value')?.value;
              break;
            case 5: // greater than
              packet.name = 'greater than';
              packet.value = packet.contains[0].value > packet.contains[1].value ? 1 : 0;
              break;
            case 6: // less than
              packet.name = 'less than';
              packet.value = packet.contains[0].value < packet.contains[1].value ? 1 : 0;
              break;
            case 7: // equal to
              packet.name = 'equal to';
              packet.value = packet.contains[0].value === packet.contains[1].value ? 1 : 0;
              break;
          }
          return [packet, remains];
        }
      }
    }
    return [packet, remains];
  }

  const originalTransmission = _.map(input[0], ch => parseInt(ch, 16).toString(2).padStart(4, '0')).join('');

  const [packet, remains] = parsePacket(originalTransmission);
  log(JSON.stringify(packet, null, 2));
  log(`Remaining data: "${remains}"`);

  answer = packet.value;






  return answer;
}
