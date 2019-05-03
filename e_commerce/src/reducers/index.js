import { combineReducers } from "redux";
import AuthentificationReducer from './authentification'
import ProductReducer from "./products"
import DetailProduct from "./Detail-product"
import {reducer as formReducer} from 'redux-form'


const rootReducer = combineReducers({
    authentification : AuthentificationReducer,
    loginForm : formReducer,
    products : ProductReducer,
    oneProduct : DetailProduct
});

export default rootReducer;