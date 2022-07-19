# NextJs Lottery Project

## Install

With the directory empty, run

- `yarn create next-app .`
- `git init`

**`pages/_app.js`** is the entrypoint for everything.

```js
import "../styles/globals.css";

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
