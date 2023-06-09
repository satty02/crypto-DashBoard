// this component fetches latest exchange rates from goinGeko.

import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {coinExchangeAction} from '../../State/Action/coinExchangeAction'
import CurrencyConverter from './CurrencyConverter';

function ExchangeAPI() {
    const dispatch = useDispatch()
    const getData = () => {

        const url = `https://api.coingecko.com/api/v3/exchange_rates`

        fetch(url).then(res => {
            if (!res.ok) {
                throw Error `Network Response is not ok`
            }
            return res.json()
        }).then(data => {
            dispatch(coinExchangeAction(data.rates))
        })

    };

    useEffect(()=>{
         getData();
         // eslint-disable-next-line 
    },[])

    return (
        <CurrencyConverter/>
    )
}

export default ExchangeAPI
