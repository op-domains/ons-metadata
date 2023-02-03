import { utils, BigNumber } from 'ethers';
import { Version }          from '../base';

const sha3     = require('js-sha3').keccak_256;
const namehash = require('@ensdomains/eth-ens-namehash');

const eth0x =
  'bc41dd7236fa8be09e593a876f5868355879efd89a87f2a6d06bb0b228b3a3b2';

export function constructEthNameHash(tokenId: string, version: Version): string {
  if (version > Version.v1) return tokenId;

  const label0x = utils
    .hexZeroPad(utils.hexlify(BigNumber.from(tokenId)), 32)
    .replace('0x', '');
  const labels = [label0x, eth0x];

  // 0 x 64
  let node = '0000000000000000000000000000000000000000000000000000000000000000';
  for (var i = labels.length - 1; i >= 0; i--) {
    var labelSha = labels[i];
    node = sha3(Buffer.from(node + labelSha, 'hex'));
  }
  return '0x' + node;
}

export function getNamehash(nameOrNamehash: string) {
  const _name = nameOrNamehash.substring(0, nameOrNamehash.lastIndexOf('.'));
  // if not name, return original
  if (!_name) return nameOrNamehash;

  const _lhexId = namehash.hash(nameOrNamehash);
  return _lhexId;
}
