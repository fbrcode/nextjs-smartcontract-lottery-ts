# NextJs Lottery Project

## Install

With the directory empty, run

- `yarn create next-app .`
- `git init`

**`pages/_app.js`** is the entrypoint for everything.

```js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

### Wallet connection install

- `yarn add moralis react-moralis`

> Notice that they are not development dependencies.

### Notification Hooks

Web3-UI-Kit: <https://web3ui.github.io/web3uikit/?path=/story/5-popup-notification--hook-demo>

## Execution Steps

**On hardhat-smartcontract-lottery-ts git:(typescript-version)**:

> Make sure Metamask account was refreshed (account > settings > advanced > reset)

1. Start local node with: `yarn hardhat node --no-deploy`
2. Deploy contracts and update deployment info with: `yarn hardhat deploy --network localhost`
3. After some enter lottery actions, to pick a winner run: `yarn hardhat run scripts/mockOffChain.ts --network localhost`

**On nextjs-smartcontract-lottery-ts**:

- Start the app on <http://localhost:3000/> with `yarn dev`

## UI CSS Formatting

Tailwind CSS: <https://tailwindcss.com/>

Install: <https://tailwindcss.com/docs/guides/nextjs>

Commands:

- `yarn add --dev tailwindcss postcss autoprefixer`
- `yarn tailwindcss init -p`

Install VS code components:

- PostCSS Language Support: <https://marketplace.visualstudio.com/items?itemName=csstools.postcss>

- Tailwind CSS IntelliSense: <https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss>

## IPFS (InterPlanetary File System) Deployment

Using <https://ipfs.io/> to deploy frontend ina distributed manner.

IPFS node generates an unique hash for any data and every node generates the same hash for the same data.

Then we can pin that data to the node. And as much data is pinned by other nodes, more distributed that data will be.

### Install IPFS CLI

Mac instructions: <https://docs.ipfs.io/install/command-line/#official-distributions>

Check version: `ipfs --version`

Start daemon: `ipfs daemon`

Access through Web UI: <http://127.0.0.1:5001/webui>

Install the web browser extension to read `ipfs://` protocol.

**Steps to deploy**:

1. Build the frontend code as static content: `yarn build`
2. Export the content to `out` folder: `yarn next export`
3. Import the `out` folder in the node and pin it
4. Copy the CID (Content Identifier) and access it with `ipfs://<CID>`

Example: <ipfs://Qme8kYxg3d53PzE1kzShTY41Sz7Fvi1hJHq3SJUk455YjA>

## Hosting on IPFS & Filecoin using Fleek

Fleek website: <https://fleek.co>

- Sign up / Sign in with Github
- Add new site
- Choose personal account (or corporate)
- Pick only selected repositories: <https://github.com/fbrcode/nextjs-smartcontract-lottery-ts>
- Click "Install & Authorize"
- Select the added repository
- Choose hosting as: `IPFS`
- Select the branch: `main` (currently)
- Framework: `NextJS`
- Build command: `yarn && yarn run build && yarn next export`
- Published directory: `out`
- Click "Deploy site"

> Note: **Filecoin Deal ID**: blockchain that helps to pin your data

So, after a new code push, the website frontend gets updated with new content.

Decentralized Lottery Site: <https://royal-sea-1667.on.fleek.co/>

Or: <ipfs://QmULUhUEiMhidXGNm8bESFazeku1MMNk3ChNfsjaBcWJoi>

Site management: <https://app.fleek.co/#/sites/royal-sea-1667/overview?accountId=294682a1-1de4-43ff-986c-0644e8cde447>
