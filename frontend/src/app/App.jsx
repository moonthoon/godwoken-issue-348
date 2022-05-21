import React from 'react';
import {Web3ReactProvider} from '@web3-react/core';
import Web3 from "web3";
import Test from "./Test";

class App extends React.Component {

    getLibrary(provider) {
        return new Web3(provider)
    }

    render() {
        return (
            <Web3ReactProvider getLibrary={this.getLibrary}>
                <Test />
            </Web3ReactProvider>
        )
    }
}

export default App;
