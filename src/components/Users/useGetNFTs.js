import { useState, useEffect } from 'react'
import axios from "axios";

const useGetNFTs = (address) => {

    const [data, setData] = useState([]);
    useEffect(() => {

        const getAllAssets = async (c) => {
            let cursor;
            let data = [];

            do {
                let config = {
                    params: {
                        'cursor': cursor,
                        'user': address
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

        getAllAssets();
    }, []);

    return { data: data }
}

export default useGetNFTs