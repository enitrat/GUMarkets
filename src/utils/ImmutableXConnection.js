//ImmutableXConnection.js
//Sample Immutable X functions for collection interaction

import { Link } from '@imtbl/imx-link-sdk';
import { ImmutableXClient } from '@imtbl/imx-link-lib';
import { ERC721TokenType, ETHTokenType } from '@imtbl/imx-link-types';
import { createPortal } from 'react-dom';

const linkAddress = 'https://link.x.immutable.com';
const apiAddress = 'https://api.x.immutable.com/v1';
// Ropsten Testnet
//const linkAddress = 'https://link.uat.x.immutable.com';
//const apiAddress = 'https://api.uat.x.immutable.com/v1';

//The token address for the collection to be monitored. Currently set to Gods Unchained
const COLLECTION_ADDRESS = '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c';

const link = new Link(linkAddress);


const WALLET_ADDRESS = 'WALLET_ADDRESS';
const STARK_PUBLIC_KEY = 'STARK_PUBLIC_KEY';

//////////////////////////////////////////////////////////////////////////////
//////////////////////// User Account Management /////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//Creates or logs a user into their Immutable X account via web3 wallet
export async function setupAndLogin() {
    const { address, starkPublicKey } = await link.setup({});
    localStorage.setItem(WALLET_ADDRESS, address);
    localStorage.setItem(STARK_PUBLIC_KEY, starkPublicKey);
}

//Remove the local storage wallet address
export function logout() {
    localStorage.removeItem('WALLET_ADDRESS');
}

//Get the user balances
export async function getUserBalances() {
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const address = localStorage.getItem('WALLET_ADDRESS');
    return await client.getBalances({ user: address });
}

//Deposits ETH into Immutable X
export async function depositEth(amountInEth) {
    await link.deposit({
        type: ETHTokenType.ETH,
        amount: amountInEth
    });
}

//Starts the withdrawal process from Immutable X
export async function prepareWithdrawal(amountInEth) {
    await link.prepareWithdrawal({
        type: ETHTokenType.ETH,
        amount: amountInEth
    });
}

//Finishes the withdrawal process from Immutable X
//Must wait for user balance to have ETH in the withdrawable state 
export async function completeWithdrawal() {
    await link.prepareWithdrawal({
        type: ETHTokenType.ETH
    });
}

//Show user history
export async function showUserHistory() {
    link.history({});
}

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Asset Management /////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * Get the user's assets
 * @param {string} assetCursor - optional cursor parameter 
 * @returns Object containing the assets and a cursor if more assets remain to be retrieved
 */
export async function getUserAssets(assetCursor) {
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const address = localStorage.getItem('WALLET_ADDRESS');
    const assetsRequest = await client.getAssets({ user: address, cursor: assetCursor, status: 'imx', collection: COLLECTION_ADDRESS });
    return { assets: assetsRequest.result, cursor: assetsRequest.cursor };
}


export async function getAllUserAssets() {
    let assetCursor;
    let assets = [];
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const address = localStorage.getItem('WALLET_ADDRESS');
    try {
        do {
            let assetRequest = await client.getAssets({ user: address, status: 'imx', collection: COLLECTION_ADDRESS, sell_orders: true });
            assets = assets.concat(assetRequest.result);
            assetCursor = assetRequest.cursor;

        } while (assetCursor);

        for (let asset of assets) {
            asset.isListed = false;
            if (asset.orders?.sell_orders?.length > 0) {
                asset.isListed = true;
            }
        }
    } catch (err) {
        console.log(err)
    }
    finally {
        return assets;
    }

}

//Opens the Link SDK popup to sell an asset as the specified price
export async function sellAsset(asset, priceInEth) {
    let sellParams = { amount: priceInEth, tokenId: asset.id, tokenAddress: asset.token_address };
    //Throws an error if not successful
    await link.sell(sellParams);
}

//Transfers an asset to another address
export async function transferERC721(asset, addressToSendTo) {
    await link.transfer({
        type: ERC721TokenType.ERC721,
        tokenId: asset.id,
        tokenAddress: asset.token_address,
        to: addressToSendTo
    });
}

//////////////////////////////////////////////////////////////////////////////
///////////////////////// Marketplace Management /////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * Get the cheapest active orders for the collection
 * @param {*} ordersCursor - optional cursor parameter 
 * @param {*} tokenName - optional token name to filter on 
 * @param {*} metadata - optional JSON string metadata to filter on 
 * @returns Object containing the cheapest orders and a cursor if more orders remain
 */
export async function getCheapestSellOrders(pageSize, ordersCursor, metadata) {
    try {
        const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
        const ordersRequest = await client.getOrders({
            page_size: pageSize,
            cursor: ordersCursor,
            status: 'active',
            sell_token_address: COLLECTION_ADDRESS,
            sell_metadata: metadata,
            order_by: 'buy_quantity',
            direction: 'asc'
        });
        return { orders: ordersRequest.result, cursor: ordersRequest.cursor };
    } catch (err) {
        console.log(err)

    }
}

export async function getOrdersHistory(metadata) {
    let ordersCursors;
    let orders = [];
    const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
    const address = localStorage.getItem('WALLET_ADDRESS');
    const min_date = new Date()
    min_date.setMonth(min_date.getMonth() - 1);
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
                min_timestamp: min_date.toISOString()

            });
            orders = orders.concat(ordersRequest.result);
            ordersCursors = ordersRequest.cursor;


        } while (ordersCursors);
    } catch (err) {
        console.log(err);
    }
    finally {
        return orders;
    }

}

export async function getPriceHistory(metadata) {
    let h_prices = [];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let map = new Map();
    let volume;
    let price;
    try {
        const orders = await getOrdersHistory(metadata);
        console.log(orders)
        orders.forEach((order) => {

            let unixtime = Date.parse(order.updated_timestamp)
            let time = new Date(unixtime)
            let f_time = time.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
            if (map.has(f_time)) {
                const res = map.get(f_time);
                price = (+res.price + +toEthPrice(order.buy.data.quantity))
                volume = res.volume
            }
            else {
                volume = 0;
                price = (+toEthPrice(order.buy.data.quantity))

            }
            price.toFixed(6)

            map.set(f_time, { price: price, volume: (volume + 1) });
        });
        console.log(map)
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
//Opens the Link SDK popup to complete an order
export async function fillOrder(order) {
    await link.buy({ orderId: order });
}

export const toEthPrice = (price) => {
    return (price * Math.pow(10, -18)).toFixed(6);

}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////