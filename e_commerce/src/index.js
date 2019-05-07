import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom"
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import reducers from './reducers';
import './index.css';
import Routes from './routes'
import * as serviceWorker from './serviceWorker';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


// const token = localStorage.getItem('token')

// // Permet de rester connecter grâce à l'exsitence du token
// if(token){
//     store.dispatch(setAuthentification(true))
// }

ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
<BrowserRouter>
 <Routes/>
</BrowserRouter>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
