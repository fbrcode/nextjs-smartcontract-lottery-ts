import { ConnectButton } from 'web3uikit';

export default function Header() {
  return (
    <div>
      Decentralized Lottery
      {/* moralisAuth={false} means that we are not trying to connect to a server */}
      <ConnectButton moralisAuth={false} />
    </div>
  );
}
