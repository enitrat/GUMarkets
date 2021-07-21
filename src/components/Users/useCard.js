import { useState, useEffect } from 'react'
import axios from "axios";
import { getEthPrice } from '../../utils/apiCalls'
import { getCheapestUSDSellOrders } from '../../utils/apiCalls';

const useCard = (id) => {

    const [buyPrice, setBuyPrice] = useState([]);
    const [proto, setProto] = useState(null)
    const [actualPrice, setActualPrice] = useState(undefined)

    var qualities = {
        4: "Meteorite",
        3: "Shadow",
        2: "Gold",
        1: "Diamond"
    };

    const getQuality = (key) => { return qualities[key] }

    useEffect(() => {

        const getBuyPrice = async () => {

            try {
                const ethPrice = await getEthPrice();
                let config = {
                    params: {
                        'page_size': 20,
                        'buy_token_address': '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c',
                        'buy_token_id': id,
                        'order_by': 'timestamp',
                        'direction': 'desc'
                    },
                }
                const url = 'https://api.x.immutable.com/v1/orders'
                const response = await axios.get(url, config)
                const result = response.data.result[0].amount_sold
                const proto = response.data.result[0].buy.data.properties.image_url.split("id=")[1].split("&q=").join("-")
                setProto(proto)
                const price = (result * Math.pow(10, -18) * ethPrice).toFixed(2)
                setBuyPrice(price);
                getActualPrice();

            } catch (err) {
                setBuyPrice(undefined)
                console.log(err)
            }
        };

        const getActualPrice = async () => {
            try {
                //get best price for this card
                const json = JSON.stringify(
                    {
                        "proto": [`${proto.split('-')[0]}`],
                        "quality": [`${getQuality(proto.split('-')[1])}`]
                    }
                );
                let { orders } = await getCheapestUSDSellOrders(json)
                console.log(orders[0].buy.data.quantity)
                setActualPrice(orders[0].buy.data.quantity)

            } catch (err) {
                console.log(err)
            }
        }

        getBuyPrice();
    }, []);

    return { buyPrice: buyPrice, proto: { token_proto: proto }, actualPrice: actualPrice }
}

export default useCard