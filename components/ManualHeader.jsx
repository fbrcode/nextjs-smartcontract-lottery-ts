import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';

export default function ManualHeader() {
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3 } = useMoralis();
  // useEffect(() => {}, [])
  // takes a function as the first argument
  // takes an array of dependencies as the second argument
  // if the array is empty, the function will only run once (anytime something renders)
  // if the array is not empty, the function will run whenever any of the dependencies change
  // NEED TO BE CAREFUL WITH THIS: circular render dependencies will cause an infinite loop
  // sample code
  useEffect(() => {
    console.log('*** 01 isWeb3Enabled (dependency array):', isWeb3Enabled);
  }, [isWeb3Enabled]); // this will run whenever isWeb3Enabled changes
  useEffect(() => {
    console.log('*** 02 isWeb3Enabled (blank dependency array):', isWeb3Enabled);
  }, []); // executes only once when the component is mounted
  useEffect(() => {
    console.log('*** 03 isWeb3Enabled (no dependency array):', isWeb3Enabled);
  }); // executes every time the component renders
  // actual code
  useEffect(() => {
    if (isWeb3Enabled) return; // if isWeb3Enabled is true, we'll be done
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('connected')) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]); // this will run whenever isWeb3Enabled changes

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem('connected');
        deactivateWeb3();
        console.log('Null account found');
      }
    });
  }, []);

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('connected', 'injected');
            }
          }}
        >
          Connect
        </button>
      )}
    </div>
  );
}
