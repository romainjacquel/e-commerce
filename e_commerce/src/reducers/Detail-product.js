import {PRODUCTS} from "../actions/actions-types"

export default function DetailProduct (state=null,action){
    switch(action.type){
        case PRODUCTS.GET_ONE_PRODUCT :
            return action.payload
    }

    return state
}