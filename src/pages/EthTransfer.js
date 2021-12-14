import { transferEth } from "../utils/ImmutableXConnection";

import { useState, useEffect } from 'react'


function EthTransfer() {

    //Dans la page Browse, on affiche la totalité des ordres (uniques) en 

    const [receiverAddress, setReceiverAddress] = useState('');
    const [amount, setAmount] = useState('');


    function handleEthValue(e) {
        setAmount(e.target.value);
    }

    function handleReceiverAddress(e) {
        setReceiverAddress(e.target.value);
    }

    function handleSendEth() {
        transferEth(amount, receiverAddress);
    }
    return (
        <div>
            <input type="text" placeholder="eth to send" name="sendEth" onChange={handleEthValue} />
            <input type="text" placeholder="receiver address" name="receiverAddress" onChange={handleReceiverAddress} />
            <button onClick={handleSendEth}>Send Eth</button>
        </div>


    )
}

export default EthTransfer