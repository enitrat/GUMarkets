import { useState, useEffect } from 'react'
import axios from "axios";
import { getEthPrice, getAllProtos } from '../../utils/apiCalls'


const useGetNFTs = (address) => {

    const [data, setData] = useState([]);
    const [allPrices, setAllPrices] = useState([]);

    useEffect(() => {


        const getAllAssets = async (c) => {
            let cursor;
            let data = [];
            const ethPrice = await getEthPrice();
            localStorage.setItem('ethPrice', ethPrice)

            do {
                let config = {
                    params: {
                        'cursor': cursor,
                        'user': address,
                        'order_by': 'updated_at',
                        'direction': 'desc',
                    },
                }
                const url = 'https://api.x.immutable.com/v1/assets'
                const response = await axios.get(url, config)
                const result = response.data
                const resData = result.result;
                cursor = result.cursor;
                data = data.concat(resData)
            } while (cursor)
            setData(data);
        };

        const getAllPrices = async () => {
            const ethPrice = localStorage.getItem('ethPrice')
            const protos = await getAllProtos();
            protos.forEach((proto) => proto.price = (proto.takerAssetAmount * Math.pow(10, -18) * ethPrice).toFixed(2))
            console.log(protos)
            setAllPrices(protos)
        }

        getAllAssets();
        getAllPrices();
    }, []);

    return { data: data, allPrices: allPrices }
}

export default useGetNFTs