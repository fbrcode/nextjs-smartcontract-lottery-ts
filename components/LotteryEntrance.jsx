// function to enter the lottery
import { useWeb3Contract } from 'react-moralis';
import { loadDeployedLotteryContract, networkMapping } from '../constants';
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useNotification } from 'web3uikit';

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

  // console.log(`lottery.address: ${lotteryAddress}`);
  // console.log(`lottery.abi: ${lotteryABI.length}`);

  const [lotteryEntranceFee, setLotteryEntranceFee] = useState('0');
  const [numberOfPlayers, setNumberOfPlayers] = useState('0');
  const [recentWinner, setRecentWinner] = useState('0');

  const dispatch = useNotification();

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

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: lotteryABI,
    contractAddress: lotteryAddress,
    functionName: 'getNumberOfPlayers',
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: lotteryABI,
    contractAddress: lotteryAddress,
    functionName: 'getRecentWinner',
    params: {},
  });

  async function updateUI() {
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    const numberOfPlayersFromCall = (await getNumberOfPlayers()).toString();
    const recentWinnerFromCall = (await getRecentWinner()).toString();

    setLotteryEntranceFee(entranceFeeFromCall); // save as wei value
    setNumberOfPlayers(numberOfPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      // try to read the lottery entrance fee from the contract
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async function (tx) {
    await tx.wait(1); // wait for the transaction to be confirmed by 1 block
    handleNewNotification(tx);
    updateUI();
  };

  const handleNewNotification = function (tx) {
    dispatch({
      type: 'info',
      message: `Transaction ${tx.hash.slice(0, 6)}...${tx.hash.slice(tx.hash.length - 4)} confirmed!`,
      title: 'Transaction notification',
      position: 'topR',
      icon: 'bell',
    });
  };

  return (
    <div>
      Lottery entrance component
      {lotteryAddress ? (
        <div>
          <button
            onClick={async function () {
              await enterLottery({
                onSuccess: handleSuccess, // checks to see if a transaction was sent successfully to MetaMask
                onError: (error) => console.log(error),
              });
            }}
          >
            Enter Lottery
          </button>
          Lottery Entrance Fee = {ethers.utils.formatUnits(lotteryEntranceFee, 'ether')} ETH Number of players =
          {numberOfPlayers}
          Recent winner = {recentWinner}
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
