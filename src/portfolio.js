import React, {useState, useEffect} from 'react';

function Portfolio(props) {

    const [currentWallet, setCurrentWallet] = useState();
    const [currentPortfolio, setCurrentPortfolio] = useState();

    const fetchWallet = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/wallet`);
        let json = await res.json();
        console.log(json)
        setCurrentWallet(json)
    };

    const fetchPortfolio = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/portfolio`);
        let json = await res.json();
        console.log('this is the portfolio json', json)
        setCurrentPortfolio(json);

    };

    useEffect(() => {
        console.log('this runs only once on component load')
        fetchWallet()
        fetchPortfolio()
    }, [])



    return (
        <div className={'border p-5'}>

            <h1 className={'text-xl font-bold'}>Portfolio</h1>
            {currentPortfolio && <table style={{width: '100%'}}>
                <thead>
                    <th className={'border'}>Stock</th>
                    <th className={'border'}>Quantity</th>
                    <th className={'border'}>Value</th>
                </thead>
                <tbody>
                    {currentPortfolio.map((item, idx) => {
                        return <tr key={idx}>
                            <td className={'border text-center'}>{item.symbol}</td>
                            <td className={'border text-center'}>{item.quantity}</td>
                            <td className={'border text-center'}>{item.price}</td>
                        </tr>

                    })}


                </tbody>
            </table>}

            {!currentPortfolio && <h1>Loading...</h1>}

            <br/>
            <br/>
            <br/>

            {currentWallet && <h1 className={'text-xl font-bold'}>Current Wallet Value: ${currentWallet.value}</h1>}


        </div>
    );
}

export default Portfolio;