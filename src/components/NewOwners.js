
import { useState, useEffect } from 'react'
import { getLastTradesData, getOrdersHistory, getLastTrades } from '../utils/apiCalls'

function NewOwners({ proto, quality }) {

    const [trades, setTrades] = useState([])

    async function init() {
        try {
            const json = JSON.stringify(
                {
                    "proto": [`${proto}`],
                    "quality": [`${quality}`]
                }
            );
            const tradesData = await getLastTradesData(json);
            setTrades(tradesData.slice(0, 5))
        } catch (err) { console.log(err) }
    }

    useEffect(() => {
        init();
        console.log(trades)
    }, [])


    return (
        <div>
            <ul>
                {trades.map((trade) => (
                    <li>owner : {trade.owner}, price:{trade.price}, NFT_id : {trade.tokenID}</li>
                ))
                }
            </ul>
        </div>
    )
}

export default NewOwners;