const localLottery = require('./localhost/Lottery.json');
const localVRF = require('./localhost/VRFCoordinatorV2Mock.json');

const rinkebyLottery = require('./rinkeby/Lottery.json');

const loadDeployedLotteryContract = (network) => {
  if (network === 'localhost') {
    return localLottery;
  } else if (network === 'rinkeby') {
    return rinkebyLottery;
  }
  return null;
};

const loadDeployedVRFMockContract = (network) => {
  if (network === 'localhost') {
    return localVRF;
  }
  return null;
};

const networkMapping = {
  31337: 'localhost',
  4: 'rinkeby',
};

module.exports = {
  loadDeployedLotteryContract,
  loadDeployedVRFMockContract,
  networkMapping,
};
