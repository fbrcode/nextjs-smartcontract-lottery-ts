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
