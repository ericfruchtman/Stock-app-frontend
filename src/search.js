import React, {useState, useEffect} from 'react';
// import yahooFinance from 'yahoo-finance';
// import yahooStockPrices from 'yahoo-stock-prices'

function Search (props) {
    // yahooFinance.quote({
    //     symbol: 'AAPL',
    //     modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
    // }, function (err, quotes) {
    //     console.log(err)
    //     console.log(quotes)
    // });
    const [inputText, setInputText] = useState ('');
    const [currentStock, setCurrentStock] = useState ();
    const [ticker, setTicker] = useState ();

    const [buyQuantity, setBuyQuantity] = useState (0);

    const [currentWallet, setCurrentWallet] = useState();

    const fetchWallet = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/wallet`);
        let json = await res.json();
        console.log(json)
        setCurrentWallet(json)
    };

    useEffect(() => {
        console.log('this runs only once on component load')


        fetchWallet()
    }, [])


    const fetchQuote = async () => {
        const res = await fetch (`http://localhost:3000/api/v1/portfolio/search/${inputText}`);
        let json = await res.json();
        console.log(json)
        setCurrentStock(json);
        setTicker(inputText);
        setInputText('')
    };

    const onInputChange = async (ev) => {
        console.log(ev.currentTarget.value)
        setInputText(ev.currentTarget.value);
    };

    const buyStock = async () => {

        console.log("Buy this stock")
        console.log(currentWallet)

        // check if the quantity is not 0
        // check if the user has enough cash in teh wallet to be able to make a purchase
        // if not show an error
        // if yes, make a purchase and add a field in the portfolio table

        if(buyQuantity === 0){
            alert('Buy quantity needs to be greater than 0!')
            return null;
        }

        let cashNeeded = buyQuantity * currentStock.data.price;
        console.log('cashNeeded is', cashNeeded)

        if(cashNeeded > currentWallet.value){
            alert('You dont have enough cash!');
        } 
        else {
            // make the purchase
            // making a field in the database table for portfolio
            let body = {
                symbol: ticker,
                quantity: buyQuantity,
                price: currentStock.data.price,

            }

            let options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {}

            };

            options.headers["Accept"] = "application/json, text/plain, */*";
            options.headers["Content-Type"] = "application/json;charset=utf-8";

            console.log(options);


            const res = await fetch(`http://localhost:3000/api/v1/portfolio`, options);
            let json = await res.json();
            console.log(json)

            setBuyQuantity(0)

            alert('Success!')

            window.location.reload();
        }

        // stock symbol
        // stock quote
    };


    const onBuyChange = async (ev) => {
        setBuyQuantity(ev.currentTarget.value);
    };


    return (
        <div className={'border p-5'}>

            <div className="grid grid-cols-2">
                <div className={'border p-5'}>
                    <input value={inputText} onChange={onInputChange} type="text" className={'border w-full p-3 rounded-full border-gray-300'}/>
                </div>
                <div className={'border p-5'}>
                    <span onClick={fetchQuote} className={'bg-transparent hover:bg-gray-600 cursor-pointer text-gray-600 p-2 rounded hover:text-white text-xl pl-5 pr-5 border border-gray hover:border-transparent rounded'}>Get Quote</span>
                </div>
            </div>

            {ticker && <div className="grid grid-cols-2">
                <div className={'border p-5'}>
                    {/*currentStock && <h1 className={'text-2xl'}>Stock Name/Symbol</h1>*/}
                   <h1 className={'text-2xl'}>{ticker} : {currentStock && <span>&nbsp;&nbsp;{currentStock.data.currency} {currentStock.data.price}</span>}</h1>
                </div>
                <div className={'border p-5'}>

                <span>
                        <input type="number" onChange={onBuyChange} className={'border'} value={buyQuantity} />&nbsp;&nbsp;
                        <span className={'bg-transparent hover:bg-blue-500 cursor-pointer text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded'} onClick={buyStock}>Buy</span>&nbsp;&nbsp;&nbsp;
                        </span>
                    {/*<span className={'bg-red-600 cursor-pointer p-2 rounded text-white text-xl pl-5 pr-5'}>Sell</span>*/}

                </div>
            </div>}

        </div>
    );
}

export default Search;