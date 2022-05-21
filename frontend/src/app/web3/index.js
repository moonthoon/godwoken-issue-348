const Web3 = require('web3');

export const rpcUrl = 'https://godwoken-testnet-v1.ckbapp.dev';

const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

export default web3;
