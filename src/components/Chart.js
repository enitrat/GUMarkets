import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
    Label,
} from 'recharts';
import { getEthPrice } from '../utils/getProtoCollection.js';
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
        const ethprice = await getEthPrice()

        const hprices = await getPriceHistory(json)
        hprices.forEach((elem) => (
            elem.data.price = +(elem.data.price * ethprice).toFixed(2)
        ))
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
                    <ComposedChart
                        width={500}
                        height={400}
                        data={history}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" dataKey="data.price">
                            <Label angle={270} position='left' style={{ textAnchor: 'middle' }}>
                                USD price
                            </Label>
                        </YAxis>
                        <YAxis yAxisId="right" dataKey="data.volume" orientation="right" domain={[0, dataMax => (dataMax * 5)]}>
                            <Label angle={90} position='right' style={{ textAnchor: 'middle' }}>
                                Volume
                            </Label>
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="data.price" stroke="#8884d8" />
                        <Bar yAxisId="right" dataKey="data.volume" barSize={5} fill="#413ea0" />

                    </ComposedChart>
                </div>
            }
        </>
    )
}

export default Chart