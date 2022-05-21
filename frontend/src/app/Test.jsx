import React, {useEffect, useState} from 'react';
import {injectedMetamask} from './web3/connectors';
import {useWeb3React} from '@web3-react/core';
import {ethers, Contract, utils} from "ethers";
import contracts from "./config/contracts.json";
import {formatUnits} from "ethers/lib/utils";

const Test = () => {
    const {activate, active, account, library} = useWeb3React();
    const [balance, setBalance] = useState('0');
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');


    useEffect(() => {
        async function getBalance() {
            if (active) {
                const provider = new ethers.providers.Web3Provider(library.currentProvider);
                const signer = provider.getSigner();
                const TokenContract = new Contract(contracts.token.address, contracts.token.abi, signer);
                const userBalance = await TokenContract.balanceOf(account);
                setBalance(formatUnits(userBalance.toString(), 18).toString());
            }
        }

        getBalance();
    }, [account])

    async function onClickMetamask() {
        try {
            await activate(injectedMetamask);
        } catch (ex) {
            console.log(ex)
        }
    }

    async function onApprove() {
        const provider = new ethers.providers.Web3Provider(library.currentProvider);
        const signer = provider.getSigner();

        const TokenContract = new Contract(contracts.token.address, contracts.token.abi, signer);
        const approval = await TokenContract.approve(contracts.test.address, ethers.constants.MaxUint256);
        await approval.wait(2);
    }

    async function onSubmit() {
        const provider = new ethers.providers.Web3Provider(library.currentProvider);
        const signer = provider.getSigner();

        const TestContract = new Contract(contracts.test.address, contracts.test.abi, signer);
        const value = utils.parseUnits(amount, 18);
        await TestContract.test(address, value);
    }

    return (
        <div>
            {active ? (
                <div>
                    <span style={{display: 'block', marginBottom: 20}}>Connected</span>
                    <div style={{marginBottom: 20}}>
                        <span>
                            Balance: {Number(balance).toLocaleString('en-US', {
                                style: undefined,
                                currency: undefined,
                            })}
                        </span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                        <div style={{display: 'flex', gap: 20}}>
                            <label>Address</label>
                            <input value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                        <div style={{display: 'flex', gap: 20}}>
                            <label>Amount</label>
                            <input value={amount} onChange={(e) => setAmount(e.target.value)}/>
                        </div>
                    </div>
                    <div style={{marginTop: 20, display: 'flex', gap: 20}}>
                        <button onClick={onApprove}>Approve</button>
                        <button onClick={onSubmit}>Submit</button>
                    </div>
                </div>
            ) : (
                <button onClick={onClickMetamask}>Connect</button>
            )}
        </div>
    );
}

export default Test;
