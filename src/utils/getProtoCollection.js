import Axios from "axios"

export const fetchProtoCollection = async () => {
    let url = 'https://api.godsunchained.com/v0/proto?perPage=2000'
    const response = await Axios(url)
    const assets = response.data.records
    return assets;

}

export const fetchBestPrice = async (popupCard, quality) => {
    var bestOrder = {
        minPrice: Number.MAX_SAFE_INTEGER,
        orderID: null
    };
    let url = 'https://api.x.immutable.com/v1/orders'
    const json = JSON.stringify(
        {
            "proto": [`${popupCard.id}`],
            "quality": [`${quality}`]
        }
    );
    try {
        const response = await Axios.get(url,
            {
                params:
                {
                    sell_metadata: json,
                    status: 'active',
                    order_by: 'buy_quantity',
                    direction: 'asc',

                }
            })
        const result = response.data.result
        console.log(result)
        result.map((order) => {

            let quantity = order.buy.data.quantity
            let decimals = order.buy.data.decimals
            let currentPrice = (quantity * Math.pow(10, -decimals)).toFixed(6)
            let currentID = order.order_id
            if (bestOrder.minPrice > currentPrice) {
                bestOrder.minPrice = currentPrice;
                bestOrder.orderID = currentID;
            }
        })

        var image_url = result[0].sell.data.properties.image_url;
        console.log(bestOrder)

    } catch (err) {
        console.log(err)
    }
    finally {
        return {
            bestOrder,
            image_url
        };
    }


}

export const toEthPrice = (price) => {
    return (price * Math.pow(10, -18)).toFixed(6);

}

