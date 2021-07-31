import { useState, useEffect } from 'react'
import axios from "axios";
import { getEthPrice, getAllProtos, getHistoricalEthPrice } from '../../../utils/apiCalls'
import totalprotos from '../../../assets/totalprotos.json'


const useGetTrades = (address) => {

    const [history, setHistory] = useState([])
    const [activeTrades, setActiveTrades] = useState([])

    const getAllTrades = async () => {
        let config = {
            params: {
                'tokenAddress': "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c",
                'makerAddress': address,
            },
        }
        const url = "https://gy2601wgv6.execute-api.us-east-1.amazonaws.com/dev/filledorders"
        const response = await axios.get(url, config)
        setHistory(response.data)
        return history;
    }

    const getAllActivePositions = (history) => {
        let activeTrades = [];
        history.forEach((trade) => {
            let result = history.filter(elem => elem.token_id === trade.token_id)
            if (result.length === 1) {
                activeTrades.push(trade)
            }
        })
        setActiveTrades(activeTrades);
        return activeTrades;

    }

    const sumBenefs = () => {

    }

    const init = async () => {
        const history = await getAllTrades();
        getAllActivePositions(history)
    }

    useEffect(() => {
        init();
    }, []);

    return { history: history, activeTrades: activeTrades }
}

export default useGetTrades