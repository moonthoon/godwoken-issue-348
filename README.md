# Test case - Inconsistent transactions with same input data

This repo is a test case for https://github.com/nervosnetwork/godwoken-web3/issues/348

It contains two smart contracts:
- Token - a basic ERC20 token
- Test - a basic smart contract that transfers an amount of the ERC20 Token to an address

## Initial setup
```shell
npm i

cd frontend

npm i
```

## Deploy smart contracts to Godwoken testnet
I've put my private key for my test account in the `hardhat.config.js` feel free to replace this with your test wallet's private key.

```shell
npx hardhat compile
npm run deploy
```

## Run the frontend
```shell
npm start
```

The frontend uses the contracts that you deployed in an earlier step. You will be able to specify an address and an amount that you want to send. Then click `Approve` and once the transaction has gone through, click `Submit`

You will only need to approve once (unless you redeploy the contracts) because it approves for the maximum amount of tokens.

If you use the gas limit and gas price set by Metamask your transaction will go through however on https://v1.betanet.gwscan.com you will see that no transfer occurs.

If you use manually override the gas limit and price and set it to a more reasonable value you will see that the transfer took place.