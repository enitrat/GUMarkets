
import { useState, useEffect } from 'react'


const useWalletData = (assets) => {

    const [investment, setInvestment] = useState(0);
    const [values, setValues] = useState(0);
    const [roi, setRoi] = useState(0);
    const [isLoading, setLoading] = useState(false);
    console.log(assets)



    const getWalletData = (assets) => {

        setLoading(true)

        var sumBuyPrice = 0;
        var sumValues = 0;
        var sumDiff = 0;

        assets.forEach((asset) => {
            sumBuyPrice += +asset.buyPrice;
            sumValues += +asset.actualPrice;
            sumDiff += +asset.diffPrice;
            console.log(typeof (sumDiff), sumDiff)
        });

        setInvestment(sumBuyPrice)
        setValues(sumValues)
        setRoi(sumDiff)
        setLoading(false)

    }

    useEffect(() => {
        getWalletData(assets);
    }, []);

    return { investment: investment, values: values, roi: roi, }

}

export default useWalletData