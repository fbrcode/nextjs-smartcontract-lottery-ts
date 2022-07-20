import localLottery from './localhost/Lottery.json';
import localVRF from './localhost/VRFCoordinatorV2Mock.json';
import rinkebyLottery from './rinkeby/Lottery.json';

export const loadDeployedLotteryContract = (network: string) => {
  if (network === 'localhost') {
    return localLottery;
  } else if (network === 'rinkeby') {
    return rinkebyLottery;
  }
  return null;
};

export const loadDeployedVRFMockContract = (network: string) => {
  if (network === 'localhost') {
    return localVRF;
  }
  return null;
};

export const networkMapping: NetworkReference = {
  31337: 'localhost',
  4: 'rinkeby',
};

export type NetworkReference = {
  [key: number]: NetworkOptions;
};

export type NetworkOptions = 'localhost' | 'rinkeby' | 'kovan' | 'mainnet' | 'ropsten' | 'polygon';
