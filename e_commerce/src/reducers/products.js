import {PRODUCTS} from "../actions/actions-types"


export default function ProductReducer (state = [],action){
    switch(action.type){
        case PRODUCTS.GET_ALL_PRODUCTS :
            return action.payload
    }
    return state
}