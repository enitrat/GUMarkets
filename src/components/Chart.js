
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getPriceHistory } from '../utils/ImmutableXConnection.js'
import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { SpinnerWrapper } from '../styles/GlobalStyle'

function Chart({ proto, quality }) {
    const [history, setHistory] = useState([])
    const [isLoading, setLoading] = useState(false);

    const Init = async (proto, quality) => {
        setLoading(true)
        //get price history
        const json = JSON.stringify(
            {
                "proto": [`${proto}`],
                "quality": [`${quality}`]
            }
        );
        const hprices = await getPriceHistory(json)
        console.log(hprices)
        setHistory(hprices)
        setLoading(false)
    }

    useEffect(() => {
        Init(proto, quality)
    }, [])

    return (
        <>
            {isLoading ?
                <SpinnerWrapper>
                    <Spinner animation="grow" /> </SpinnerWrapper>
                :
                <div className="d-flex align-items-center">
                    <LineChart width={500} height={300} data={history}>
                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
            }
        </>
    )
}

export default Chart