import { InjectedConnector } from '@web3-react/injected-connector'

const chainId = 71401;

export const injectedMetamask = new InjectedConnector({
    supportedChainIds: [chainId],
});
