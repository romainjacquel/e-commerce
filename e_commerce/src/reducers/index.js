import { combineReducers } from "redux";
import AuthentificationReducer from './authentification'
import ProductReducer from "./products"
import DetailProduct from "./Detail-product"
import CategoriesReducer from "./categories"
import {reducer as loginForm} from 'redux-form'
import {reducer as signupForm} from 'redux-form'


const rootReducer = combineReducers({
    authentification : AuthentificationReducer,
    loginForm,
    products : ProductReducer,
    categories : CategoriesReducer,
    oneProduct : DetailProduct,
    signupForm
});

export default rootReducer;