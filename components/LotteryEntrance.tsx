// function to enter the lottery
import { useWeb3Contract } from 'react-moralis';
import { loadDeployedLotteryContract, networkMapping } from '../constants';
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import { BigNumber, ethers, ContractTransaction } from 'ethers';
import { useNotification } from 'web3uikit';

interface contractAddressesInterface {
  [key: string]: string[];
}

export default function LotteryEntrance() {
  let { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = chainIdHex === null ? 0 : parseInt(chainIdHex);
  const networkName = networkMapping[chainId];
  const lottery = loadDeployedLotteryContract(networkName);
  const lotteryAddress = lottery?.address;
  const lotteryABI = lottery?.abi;
  const [lotteryEntranceFee, setLotteryEntranceFee] = useState('0');
  const [numberOfPlayers, setNumberOfPlayers] = useState('0');
  const [recentWinner, setRecentWinner] = useState('0');

  const dispatch = useNotification();

  const {
    runContractFunction: enterLottery,
    isLoading,
    isFetching,
  } = useWeb3Contract({
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
    const entranceFeeFromCall = ((await getEntranceFee()) as BigNumber).toString();
    const numberOfPlayersFromCall = ((await getNumberOfPlayers()) as BigNumber).toString();
    const recentWinnerFromCall = (await getRecentWinner()) as string;

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

  const handleSuccess = async function (tx: ContractTransaction) {
    await tx.wait(1); // wait for the transaction to be confirmed by 1 block
    handleNewNotification(tx);
    updateUI();
  };

  const handleNewNotification = function (tx: ContractTransaction) {
    dispatch({
      type: 'info',
      message: `Transaction ${tx.hash.slice(0, 6)}...${tx.hash.slice(tx.hash.length - 4)} confirmed!`,
      title: 'Transaction notification',
      position: 'topR',
      icon: 'bell',
    });
  };

  // NEXT STEP: handle events listening to refresh the UI

  return (
    <div className="p-5">
      {lotteryAddress ? (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={async function () {
              await enterLottery({
                onSuccess: (tx) => handleSuccess(tx as ContractTransaction), // checks to see if a transaction was sent successfully to MetaMask
                onError: (error) => console.log(error),
              });
            }}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className=" animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              <div>Enter Lottery</div>
            )}
          </button>
          <div className="p-1">
            Lottery Entrance Fee: <strong>{ethers.utils.formatUnits(lotteryEntranceFee, 'ether')} ETH</strong>
          </div>
          <div className="p-1">
            Number of players: <strong>{numberOfPlayers}</strong>
          </div>
          <div className="p-1">
            Recent winner: <strong>{recentWinner}</strong>{' '}
          </div>
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
