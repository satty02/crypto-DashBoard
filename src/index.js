import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { Store } from './State/Store/Store';
import Routing from './Routing';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={Store}> 
          <Routing/>
    </Provider>
);


