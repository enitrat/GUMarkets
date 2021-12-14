import { useState, useEffect } from 'react'
import axios from "axios";
import { getEthPrice, getAllProtos, getHistoricalEthPrice } from '../../../utils/apiCalls'
import totalprotos from '../../../assets/totalprotos.json'


const useGetTrades = (address) => {

    const [history, setHistory] = useState([])
    const [activeTrades, setActiveTrades] = useState([])
    const [benefs, setBenefs] = useState(0);
    const [pending, setPending] = useState(0);


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

    const sumActive = (activeTrades) => {
        let sum = 0;
        activeTrades.forEach((trade) => {
            sum += trade.usd_price;
        })
        setPending(sum)
        return sum;
    }

    const sumBenefs = (history) => {
        let sum = 0;
        history.forEach((trade) => {
            if (trade.makerAddress === address) {
                console.log("==")
                sum += trade.usd_price;
            }
            else {
                sum -= trade.usd_price;
            }
        });
        setBenefs(sum)
        return sum;
    }

    const init = async () => {
        try {
            const _history = await getAllTrades();

        } catch (err) { console.log(err) }

    }

    const calcs = async () => {
        const _activeTrades = getAllActivePositions(history)
        const _benefs = sumBenefs(history);
        const _pending = sumActive(_activeTrades);
        console.log(_benefs);
        console.log(_pending);
    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        calcs();
    }, [history]);

    return { history: history, activeTrades: activeTrades, benefs: benefs, pending: pending }
}

export default useGetTrades