import { useState, useEffect } from 'react'
import axios from "axios";
import { getEthPrice, getAllProtos, getHistoricalEthPrice } from '../../utils/apiCalls'
import totalprotos from '../../assets/totalprotos.json'


const useGetNFTs = (address) => {


    const [data, setData] = useState([]);
    //const [allPrices, setAllPrices] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [statePoints, setPoints] = useState(0)

    var points = 0;

    /**
     * Retourne la liste des prix de chaque proto
     */
    const getAllPrices = async () => {
        const ethPrice = localStorage.getItem('ethPrice')
        const protos = await getAllProtos();
        protos.forEach((proto) => proto.price = (proto.takerAssetAmount * Math.pow(10, -18) * ethPrice).toFixed(2))
        return protos
    }
    /**
     * 
     * @returns {data} la liste de tous les NFT présents sur ImmuX pour l'utilisateur sous forme
     * "result": [
            {
                "token_address": "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c",
                "id": "0x03c53584ad15429d51fa2460e2578868bccd1ce2628741e573837c2a01e198e1",
                "user": "0x8205aa128988277979ea0fe327f48ce9682f7cc4",
                "status": "imx",
                "uri": null,
                "name": "Blessing of Death",
                "description": null,
                "image_url": "https://card.godsunchained.com/?id=932&q=4",
                "metadata": {
                    "god": "death",
                    "set": "trial",
                    "mana": 2,
                    "name": "Blessing of Death",
                    "type": "card",
                    "image": "https://card.godsunchained.com/?id=932&q=4",
                    "proto": 932,
                    "attack": 0,
                    "effect": "Your relic gains: \"Whenever a creature dies, gain 3 favor.\"",
                    "health": 0,
                    "rarity": "common",
                    "quality": "Meteorite"
                },
                "collection": {
                    "name": "Gods Unchained",
                    "icon_url": null
                },
                "created_at": "2021-03-29T18:53:35.608486Z",
                "updated_at": "2021-07-22T06:23:26.350774Z"
            },
            ]
     *  
     */
    const getAllAssets = async () => {
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
        return data;
    };

    /**
     * 
     * @param {*} asset le NFT dont on veut récupérer le prix d'acquisition
     */
    const getPriceInfo = async (asset, allPrices, historicalPrices) => {

        try {
            const ethcurrentPrice = localStorage.getItem('ethPrice');
            const ethPriceHistory = historicalPrices
            let ethPrice;
            let config = {
                params: {
                    'page_size': 20,
                    'buy_token_address': '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c',
                    'buy_token_id': asset.id,
                    'order_by': 'timestamp',
                    'direction': 'desc'
                },
            }
            const url = 'https://api.x.immutable.com/v1/orders'
            const response = await axios.get(url, config)

            const result = response.data.result[0].amount_sold
            const proto = response.data.result[0].buy.data.properties.image_url.split("id=")[1].split("&q=").join("-")
            //ethprice at updated_tmstp time
            let unix_time = Date.parse(response.data.result[0].updated_timestamp)
            unix_time = new Date(unix_time).setUTCHours(0, 0, 0, 0)
            let found = ethPriceHistory.find(element => element[0] === unix_time)
            ethPrice = found === undefined ? ethcurrentPrice : found[1]

            const price = (result * Math.pow(10, -18) * ethPrice).toFixed(2)
            points += totalprotos[proto]["points"]
            asset.token_proto = proto;
            asset.buyPrice = price;
            asset.actualPrice = getActualPrice(asset.token_proto, allPrices)
            asset.diffPrice = (+asset.actualPrice - +asset.buyPrice).toFixed(2)
            //getActualPrice();

        } catch (err) {
            console.log(err)
            asset.token_proto = undefined;
            asset.buyPrice = undefined;
            asset.actualPrice = undefined;
            asset.diffPrice = undefined;
        }
        return null;

    };

    /**
     * 
     * @param {*} token_proto 
     * @param {*} allPrices la liste des prix actuels
     * @returns le prix du proto analysé
     */
    const getActualPrice = (token_proto, allPrices) => {
        try {
            return (allPrices.filter((proto) => proto.token_proto === token_proto)[0].price)
        } catch (err) {
            console.log(err)
            return undefined
        }
    }

    const iterOnAssets = async (assets, allPrices) => {

        const historicalPrices = await getHistoricalEthPrice();
        // for (const asset of assets) {

        //     //Pour chaque asset, on lui rajoute une propriété token_proto, buyPrice, actualPrice, diffPrice

        //     await getPriceInfo(asset, allPrices, historicalPrices)
        // };

        await Promise.all(assets.map(async (asset) => {
            await getPriceInfo(asset, allPrices, historicalPrices)
        }))
        return;
    }

    async function init() {
        try {
            setLoading(true)
            // On récupère les prix par proto
            const allPrices = await getAllPrices();
            //On récupère la liste des assets, telle que retournée par l'API
            const assets = await getAllAssets();
            await iterOnAssets(assets, allPrices);
            setData(assets)
            setPoints(points)
            setLoading(false)

        } catch (err) {
            console.log(err)
        }

    }



    useEffect(() => {
        init();
    }, []);

    return { data: data, isLoading: isLoading, points: statePoints /*allPrices: allPrices*/ }
}

export default useGetNFTs