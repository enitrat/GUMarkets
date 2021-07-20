import { Link } from '@imtbl/imx-link-sdk';
import { ImmutableXClient } from '@imtbl/imx-link-lib';
import { ERC721TokenType, ETHTokenType } from '@imtbl/imx-link-types';
import Axios from 'axios';
import { createPortal } from 'react-dom';

const apiAddress = 'https://api.x.immutable.com/v1';
const COLLECTION_ADDRESS = '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c';


var getUrlParams = function (url) {
    var params = {};
    (url + '?').split('?')[1].split('&').forEach(function (pair) {
        pair = (pair + '=').split('=').map(decodeURIComponent);
        if (pair[0].length) {
            params[pair[0]] = pair[1];
        }
    });
    return params;
};

export const toEthPrice = (price) => {
    return (price * Math.pow(10, -18)).toFixed(6);

}

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



export async function getAllProtos() {

    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    let config = {
        headers: { 'x-api-key': 'Np8BV2d5QR9TSFEr9EvF66FWcJf0wIxy2qBpOH6s' },
        params: {
            'tokenAddress': '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c'
        },
    }
    let url = 'https://gy2601wgv6.execute-api.us-east-1.amazonaws.com/dev/all-orders'
    const response = await Axios(url, config)
    const protos = response.data
    return protos;


}

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



export async function getCheapestUSDSellOrders(metadata) {
    const { orders } = await getCheapestSellOrders(metadata)
    const ethPrice = await getEthPrice();
    orders.forEach((order) => {
        order.buy.data.quantity = (order.buy.data.quantity * Math.pow(10, -18) * ethPrice).toFixed(2)
    })
    return { orders: orders }
}

export async function getOrdersHistory(metadata, min_date) {
    let ordersCursors;
    let orders = [];
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
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
        orders.sort((a, b) => (a.updated_timestamp.localeCompare(b.updated_timestamp)));
    } catch (err) {
        console.log(err);
    }
    finally {
        return orders;
    }

}

export async function getLastTrades(metadata) {
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const ordersRequest = await client.getOrders({
        page_size: 30,
        status: 'filled',
        sell_token_address: '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c',
        sell_metadata: metadata,
        order_by: 'timestamp',
        direction: 'asc'
    });
    ordersRequest.result.sort((a, b) => (a.updated_timestamp.localeCompare(b.updated_timestamp)));
    return ordersRequest.result.slice(0, 5);

}

export async function getAssetInfo(id) {

    let url = `https://api.x.immutable.com/v1/assets/${COLLECTION_ADDRESS}/${id}`
    const response = await Axios(url)
    const infos = response.data
    return infos.user
}
export async function getLastTradesData(metadata) {
    const ethPrice = await getEthPrice();

    let datas = [];
    try {
        const trades = await getLastTrades(metadata);
        for (const trade of trades) {
            let tokenID = trade.sell.data.id;
            let owner = await getAssetInfo(tokenID)
            let price = (trade.buy.data.quantity * Math.pow(10, -18) * ethPrice).toFixed(2)
            datas = datas.concat({ tokenID: tokenID, owner: owner, price: price })
        }

        return datas;
    } catch (err) { console.log(err) }
}

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
            price = (+toEthPrice(order.buy.data.quantity))
            price.toFixed(6)
            let dict = {
                time: f_time,
                data: {
                    price: price,
                    volume: 0
                },
            }
            h_prices = h_prices.concat(dict)
        });
        return h_prices;
    } catch (err) {
        console.log(err)
    }
}


getCheapestUSDSellOrders();