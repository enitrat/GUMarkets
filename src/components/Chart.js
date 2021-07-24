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
import { getEthPrice, getHistoricalEthPrice } from '../utils/apiCalls.js';
import { getPriceHistory } from '../utils/ImmutableXConnection.js'
import { getAllOrdersHistory, getAvgDailyPrice } from '../utils/apiCalls.js';
import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { SpinnerWrapper } from '../styles/GlobalStyle'

function Chart({ proto, quality, type }) {
    const [history, setHistory] = useState([])
    const [isLoading, setLoading] = useState(true);

    const Init = async (proto, quality, min_date, type) => {
        setLoading(true)
        //get price history
        const json = JSON.stringify(
            {
                "proto": [`${proto}`],
                "quality": [`${quality}`]
            }
        );
        const ethPriceHistory = await getHistoricalEthPrice()
        const ethcurrentPrice = await getEthPrice();
        let ethprice;

        if (type === "month-avg") {
            const hprices = await getAvgDailyPrice(json, min_date)
            hprices.forEach((elem) => {
                let found = ethPriceHistory.find(element => element[0] === elem.data.unix_time)
                ethprice = found === undefined ? ethcurrentPrice : found[1]
                elem.data.price = +(elem.data.price * ethprice).toFixed(2)
            })
            console.log(hprices)
            setHistory(hprices)
        }
        else if (type === "month-detailed") {
            const hprices = await getAllOrdersHistory(json, min_date)
            hprices.forEach((elem) => {
                let found = ethPriceHistory.find(element => element[0] === elem.data.unix_time)
                ethprice = found === undefined ? ethcurrentPrice : found[1]
                elem.data.price = +(elem.data.price * ethprice).toFixed(2)
            })
            console.log(hprices)
            setHistory(hprices)
        }
        else if (type === "week-detailed") {
            const hprices = await getAllOrdersHistory(json, min_date)
            hprices.forEach(async (elem) => {
                let found = ethPriceHistory.find(element => element[0] === elem.data.unix_time)
                ethprice = found === undefined ? ethcurrentPrice : found[1]
                elem.data.price = +(elem.data.price * ethprice).toFixed(2)
            })
            console.log(hprices)
            setHistory(hprices)
        }

        setLoading(false)
    }

    useEffect(() => {

        let min_date;
        switch (type) {
            case ("month-avg"):
                min_date = new Date()
                min_date.setMonth(min_date.getMonth() - 1)
                min_date = min_date.toISOString();
                break;
            case "week-detailed":
                min_date = new Date()
                min_date.setTime(min_date.getTime() - 7 * 24 * 60 * 60 * 1000)
                min_date = min_date.toISOString();
                break;
            case ("month-detailed"):
                min_date = new Date()
                min_date.setMonth(min_date.getMonth() - 1)
                min_date = min_date.toISOString();
                break;
            default:
                console.log("===DEFAULT===", type)
                min_date = undefined;
        }
        Init(proto, quality, min_date, type)

    }, [])

    return (
        <>
            {
                history.forEach((elem) => console.log(typeof (elem.time)))
            }
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

                        <XAxis dataKey="time" stroke="#F2F2F3" />
                        <YAxis yAxisId="left" name="price" dataKey="data.price" stroke="#D6DBDF">
                            <Label angle={270} position='left' style={{ textAnchor: 'middle', fill: "#F4F6F7" }} >
                                USD price
                            </Label>
                        </YAxis>
                        <YAxis yAxisId="right" name="volume" dataKey="data.volume" orientation="right" domain={[0, dataMax => (dataMax * 5)]} stroke="#D6DBDF">
                            <Label angle={90} position='right' style={{ textAnchor: 'middle', fill: "#F4F6F7" }}>
                                Volume
                            </Label>
                        </YAxis>
                        <Tooltip itemStyle={{ color: "black" }} />
                        <Legend />
                        <Line yAxisId="left" dot={false} name="price" type="monotone" dataKey="data.price" stroke="#A9DFBF " />
                        <Bar yAxisId="right" name="volume" dataKey="data.volume" barSize={5} fill="#AF7AC5" />

                    </ComposedChart>
                </div>
            }
        </>
    )
}

export default Chart