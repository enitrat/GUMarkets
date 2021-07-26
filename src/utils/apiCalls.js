import { Link } from '@imtbl/imx-link-sdk';
import { ImmutableXClient } from '@imtbl/imx-link-lib';
import { ERC721TokenType, ETHTokenType } from '@imtbl/imx-link-types';
import Axios from 'axios';
import { createPortal } from 'react-dom';

//api endpoint de immuX
const apiAddress = 'https://api.x.immutable.com/v1';
//adresse ETH de la collection GodsUnchained
const COLLECTION_ADDRESS = '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c';



/**
 * 
 * @param {*} price 
 * @returns {string} La conversion du prix en Gwei en prix en eth
 */
export const toEthPrice = (price) => {
    return (price * Math.pow(10, -18)).toFixed(6);

}

export const getHistoricalEthPrice = async () => {
    let url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=max&interval=daily'
    try {
        const response = await Axios.get(url);
        const result = response.data;
        return result.prices;
    } catch (err) {
        console.log(err)
    }
}

/**
 * 
 * @returns {*} le prix de l'eth en USD
 */
export const getEthPrice = async () => {
    let url = 'https://min-api.cryptocompare.com/data/price'
    try {
        const response = await Axios.get(url,
            {
                params:
                {
                    "fsym": "ETH",
                    "tsyms": "USD",
                }
            });
        const result = response.data;
        return result.USD;
    } catch (err) {
        console.log(err)
    }
}



/**
 * 
 * @returns {string}  une liste contenant tous les protos , metadata et leurs prix minimum
 */
export async function getAllProtos() {

    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const ethPrice = await getEthPrice();
    let config = {
        headers: { 'x-api-key': 'Np8BV2d5QR9TSFEr9EvF66FWcJf0wIxy2qBpOH6s' },
        params: {
            'tokenAddress': '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c'
        },
    }
    let url = 'https://gy2601wgv6.execute-api.us-east-1.amazonaws.com/dev/all-orders'
    const response = await Axios(url, config)
    const protos = response.data
    protos.forEach((proto) => proto.price = (proto.takerAssetAmount * ethPrice * Math.pow(10, -18)).toFixed(2))
    return protos;


}

/**
 * 
 * @param {*} metadata au format JSON du sell_token
 * @returns les 5 ordres de ventes les moins chers
 */
export async function getCheapestSellOrders(metadata) {
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const ordersRequest = await client.getOrders({
        page_size: 5,
        status: 'active',
        sell_token_address: '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c',
        sell_metadata: metadata,
        order_by: 'buy_quantity',
        direction: 'asc'
    });
    return { orders: ordersRequest.result };
}


/**
 * 
 * @param {*} metadata au format JSON du sell_token
 * Convertit le prix des ordres retours de getCheapestSellOrders en USD
 * @returns les 5 ordres de vente les moins chers, prix converti en USD
 */
export async function getCheapestUSDSellOrders(metadata) {
    const { orders } = await getCheapestSellOrders(metadata)
    const ethPrice = await getEthPrice();
    orders.forEach((order) => {
        order.buy.data.quantity = (order.buy.data.quantity * Math.pow(10, -18) * ethPrice).toFixed(2)
    })
    return { orders: orders }
}


/**
 * 
 * @param {*} metadata au format JSON du sell_token
 * @param {*} min_date à partir de quand on récupère les données (1 mois max)
 * @returns liste des ventes triées par updated_timestamp croissant
 */
export async function getOrdersHistory(metadata, min_date) {
    let ordersCursors;
    let orders = [];
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    //Requête par timestamp CROISSANT pour avoir les ordres dans l'ordre chronologique
    const address = localStorage.getItem('WALLET_ADDRESS');
    try {
        do {
            let ordersRequest = await client.getOrders({
                page_size: 200,
                cursor: ordersCursors,
                status: 'filled',
                sell_token_address: COLLECTION_ADDRESS,
                sell_metadata: metadata,
                order_by: 'timestamp',
                direction: 'asc',
                min_timestamp: min_date

            });
            orders = orders.concat(ordersRequest.result);
            ordersCursors = ordersRequest.cursor;


        } while (ordersCursors);
        //on trie la liste selon le updated_timestamp croissant
        orders.sort((a, b) => (a.updated_timestamp.localeCompare(b.updated_timestamp)));
    } catch (err) {
        console.log(err);
    }
    finally {
        return orders;
    }

}

/**
 * 
 * @param {*} metadata au format JSON du sell_token
 * @returns 
 */
export async function getLastTrades(metadata) {
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    //Requête par timestamp DECROISSANT pour avoir les derniers ordres publiés
    const ordersRequest = await client.getOrders({
        page_size: 30,
        status: 'filled',
        sell_token_address: '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c',
        sell_metadata: metadata,
        order_by: 'timestamp',
        direction: 'desc'
    });
    //trier par updated_timestamp décroissant ()
    ordersRequest.result.sort((a, b) => (b.updated_timestamp.localeCompare(a.updated_timestamp)));
    return ordersRequest.result.slice(0, 5);

}

/**
 * 
 * @param {*} id 
 * @returns infos sur l'asset en question : {id, owner, name, metadata, creation time...}
 */
export async function getAssetInfo(id) {

    let url = `https://api.x.immutable.com/v1/assets/${COLLECTION_ADDRESS}/${id}`
    const response = await Axios(url)
    const infos = response.data
    return infos.user
}
export async function getLastTradesData(metadata) {
    const ethcurrentPrice = await getEthPrice();
    const ethPriceHistory = await getHistoricalEthPrice()
    let datas = [];
    let ethPrice;
    try {
        const trades = await getLastTrades(metadata);
        for (const trade of trades) {
            let tokenID = trade.sell.data.id;
            let owner = await getAssetInfo(tokenID)
            let unix_time = Date.parse(trade.updated_timestamp)
            console.log(unix_time)
            unix_time = new Date(unix_time).setUTCHours(0, 0, 0, 0)
            let found = ethPriceHistory.find(element => element[0] === unix_time)
            ethPrice = found === undefined ? ethcurrentPrice : found[1]
            let price = (trade.buy.data.quantity * Math.pow(10, -18) * ethPrice).toFixed(2)
            datas = datas.concat({ tokenID: tokenID, owner: owner, price: price, uptime: (Date.parse(trade.updated_timestamp) - Date.parse(trade.timestamp)) / 1000 })
        }

        return datas;
    } catch (err) { console.log(err) }
}

/**
 * 
 * @param {*} metadata 
 * @param {*} min_date 
 * @returns liste contenant pour chaque jour le prix moyen et le volume total
 */
export async function getAvgDailyPrice(metadata, min_date) {
    let h_prices = [];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let map = new Map();
    let volume;
    let price;
    try {
        const orders = await getOrdersHistory(metadata, min_date);
        orders.forEach((order) => {

            let unixtime = Date.parse(order.updated_timestamp)
            let time = new Date(unixtime)
            let f_time = time.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
            let unix_time = time.setUTCHours(0, 0, 0, 0)
            if (map.has(f_time)) {
                const res = map.get(f_time);
                price = (+res.price + +toEthPrice(order.buy.data.quantity))
                price /= 2
                volume = res.volume
            }
            else {
                volume = 0;
                price = (+toEthPrice(order.buy.data.quantity))

            }
            price.toFixed(6)

            map.set(f_time, { price: price, volume: (volume + 1), unix_time });
        });
        map.forEach((value, key) => {
            let dict = {
                time: key,
                data: value

            }
            h_prices = h_prices.concat(dict)
        })
        return h_prices;
    } catch (err) {
        console.log(err)
    }

}

/**
 * 
 * @param {*} metadata 
 * @param {*} min_date date à partir de laquelle on récupère les données (30j max)
 * @returns liste contenant les infos liées à chaque ordre de vente rempli.
 */
export async function getAllOrdersHistory(metadata, min_date) {
    let h_prices = [];
    let map = new Map();
    let volume;
    let price;
    try {
        const orders = await getOrdersHistory(metadata, min_date);
        console.log(orders)
        orders.forEach((order) => {

            let unixtime = Date.parse(order.updated_timestamp)
            let time = new Date(unixtime)
            let f_time = time.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
            let unix_time = time.setUTCHours(0, 0, 0, 0)
            price = (+toEthPrice(order.buy.data.quantity))
            price.toFixed(6)
            let dict = {
                time: f_time,
                data: {
                    price: price,
                    volume: 0,
                    unix_time: unix_time
                },
            }
            h_prices = h_prices.concat(dict)
        });
        return h_prices;
    } catch (err) {
        console.log(err)
    }
}

/**
 * 
 * @returns liste contenant les infos de chaque carte actuellement en promotion
 */
export const getDiscounts = async () => {
    let url = 'https://gumarkets.freeboxos.fr:5000/discounts'
    const response = await Axios(url)
    const result = response.data
    return result;

}


getCheapestUSDSellOrders();