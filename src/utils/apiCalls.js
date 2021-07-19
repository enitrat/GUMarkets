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

export async function getCheapestSellOrders(ordersCursor, tokenName, metadata) {
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const ordersRequest = await client.getOrders({
        cursor: ordersCursor,
        status: 'active',
        sell_token_address: COLLECTION_ADDRESS,
        name: tokenName,
        sell_metadata: metadata,
        order_by: 'buy_quantity',
        direction: 'asc'
    });
    return { orders: ordersRequest.result, cursor: ordersRequest.cursor };
}

getAllProtos();