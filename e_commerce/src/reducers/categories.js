import {CATEGORIES} from "../actions/actions-types"


export default function CategoriesReducer (state = [],action){
    switch(action.type){
        case CATEGORIES.GET_ALL_CATEGORIES :
            return action.payload
    }
    return state
}