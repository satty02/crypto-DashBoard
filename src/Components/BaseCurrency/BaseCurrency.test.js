import React from 'react';
import {fireEvent, render,screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BaseCurrency from './BaseCurrency';
import {coinsCurrencyAction} from '../../State/Action/coinsCurrencyAction'

it('render base currency with redux store',()=>{
    const initialState = '';
    const mockStore =  configureStore();
    const store = mockStore(initialState);


    const {baseCurrency} = render(
    <Provider store={store}>
        <BaseCurrency/>
    </Provider>
    )
    
})

it('on changing dispatched my action',()=>{
    const initialState = 'inr';
    const mockStore =  configureStore();
    const store = mockStore(initialState);


    const {getByRole} = render(
    <Provider store={store}>
        <BaseCurrency/>
    </Provider>
    )

    const selectElement = getByRole('combobox');
    fireEvent.change(selectElement,{target:{value:'usd'}});

    const actions = store.getActions();
    expect(actions).toContainEqual(coinsCurrencyAction('usd'))
})

it('simulate options',()=>{
    const initialState = 'inr';
    const mockStore =  configureStore();
    const store = mockStore(initialState);


    const {getByTestId,getAllByTestId} = render(
    <Provider store={store}>
        <BaseCurrency/>
    </Provider>
    )

    const selectElement = getByTestId('select')
    fireEvent.change(selectElement,{target:{value:'usd'}});

    let options = getAllByTestId('select-option');

    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
})