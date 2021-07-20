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
import { getAllOrdersHistory } from '../utils/apiCalls.js';
import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { SpinnerWrapper } from '../styles/GlobalStyle'

function Chart({ proto, quality, type }) {
    const [history, setHistory] = useState([])
    const [isLoading, setLoading] = useState(false);

    const Init = async (proto, quality, min_date, type) => {
        setLoading(true)
        console.log(min_date)
        //get price history
        const json = JSON.stringify(
            {
                "proto": [`${proto}`],
                "quality": [`${quality}`]
            }
        );
        const ethprice = await getEthPrice()

        if (type === "month-avg") {
            const hprices = await getPriceHistory(json, min_date)
            hprices.forEach((elem) => (
                elem.data.price = +(elem.data.price * ethprice).toFixed(2)
            ))
            console.log(hprices)
            setHistory(hprices)
        }
        else if (type === "month-detailed") {
            const hprices = await getAllOrdersHistory(json, min_date)
            hprices.forEach((elem) => (
                elem.data.price = +(elem.data.price * ethprice).toFixed(2)
            ))
            console.log(hprices)
            setHistory(hprices)
        }
        else if (type === "week-detailed") {
            const hprices = await getAllOrdersHistory(json, min_date)
            hprices.forEach((elem) => (
                elem.data.price = +(elem.data.price * ethprice).toFixed(2)
            ))
            console.log(hprices)
            setHistory(hprices)
        }

        setLoading(false)
    }

    useEffect(() => {

        let min_date;
        switch (type) {
            case ("month-avg" || "month-detailed"):
                min_date = new Date()
                min_date.setMonth(min_date.getMonth() - 1)
                min_date = min_date.toISOString();
                break;
            case "week-detailed":
                min_date = new Date()
                min_date.setTime(min_date.getTime() - 7 * 24 * 60 * 60 * 1000)
                min_date = min_date.toISOString();
                break;
            default:
                min_date = undefined;
        }
        console.log(type)
        console.log(min_date)
        Init(proto, quality, min_date, type)

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