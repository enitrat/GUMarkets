
import { useState, useEffect } from 'react'
import { getLastTradesData, getOrdersHistory, getLastTrades } from '../utils/apiCalls'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
function NewOwners({ proto, quality }) {

    const WhiteText = styled.table`
        color:white;

    `

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
            <WhiteText className="table">
                <thead>
                    <tr>
                        <th scope="col">Owner</th>
                        <th scope="col">Buy price</th>
                        <th scope="col">available time</th>
                    </tr>
                </thead>
                <tbody>
                    {trades.map((trade) => (
                        <tr>

                            <td><Link to={`/godsunchained/user/${trade.owner}/history?type=all`}>
                                {trade.owner}
                            </Link>
                            </td>
                            <td>{trade.price}</td>
                            <td>{trade.uptime}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </WhiteText>
        </div>
    )
}

export default NewOwners;