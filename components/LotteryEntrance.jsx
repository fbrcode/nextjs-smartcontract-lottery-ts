// function to enter the lottery
import { useWeb3Contract } from 'react-moralis';
import { loadDeployedLotteryContract, networkMapping } from '../constants';
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const networkName = networkMapping[chainId];
  // console.log(`chain Id Hex: ${chainIdHex}`);
  // console.log(`chain Id: ${chainId}`);
  // console.log(`Network name: ${networkName}`);
  const lottery = loadDeployedLotteryContract(networkName);
  const lotteryAddress = lottery?.address;
  const lotteryABI = lottery?.abi;

  console.log(`lottery.address: ${lotteryAddress}`);
  console.log(`lottery.abi: ${lotteryABI.length}`);

  const [lotteryEntranceFee, setLotteryEntranceFee] = useState('0');

  const { runContractFunction: enterLottery } = useWeb3Contract({
    abi: lotteryABI,
    contractAddress: lotteryAddress,
    functionName: 'enterLottery',
    params: {},
    msgValue: lotteryEntranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: lotteryABI,
    contractAddress: lotteryAddress,
    functionName: 'getEntranceFee',
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      // try to read the lottery entrance fee from the contract
      async function updateUI() {
        const entranceFeeFromContract = (await getEntranceFee()).toString();
        setLotteryEntranceFee(entranceFeeFromContract); // save as wei value
        console.log(`Entrance fee: ${entranceFeeFromContract}`);
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div>
      Lottery entrance component
      {lotteryAddress ? (
        <div>
          <button
            onClick={async function () {
              await enterLottery();
            }}
          >
            Enter Raffle
          </button>
          Lottery Entrance Fee = {ethers.utils.formatUnits(lotteryEntranceFee, 'ether')} ETH
        </div>
      ) : (
        <div>
          No contract found for network / chain id:{' '}
          <strong>
            {networkName} / {chainId}
          </strong>
        </div>
      )}
    </div>
  );
}
