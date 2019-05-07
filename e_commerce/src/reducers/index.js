import { combineReducers } from "redux";
import AuthentificationReducer from './authentification'
import ProductReducer from "./products"
import DetailProduct from "./Detail-product"
import CategoriesReducer from "./categories"
import { reducer as form } from 'redux-form'


const rootReducer = combineReducers({
    authentification : AuthentificationReducer,
    form,
    products : ProductReducer,
    categories : CategoriesReducer,
    oneProduct : DetailProduct,
});

export default rootReducer;