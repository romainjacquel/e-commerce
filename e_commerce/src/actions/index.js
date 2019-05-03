import axios from 'axios'
import {PRODUCTS, SET_AUTHENTIFICATION} from "./actions-types"


const FRONT_END_POINT = "http://localhost:3000"
const BACK_END_POINT = "http://localhost:3090"

export function setAuthentification(isLoggedIn){
    return {
            type:SET_AUTHENTIFICATION,
            payload:isLoggedIn
    };
}

export function LoginUser({email,password},history){
    return function(dispatch){
        axios.options(`${BACK_END_POINT}/user/login`,{
            email,
            password
        }).then((response)=>{
            console.log('--->Login user',response)
            localStorage.setItem("token",response.data.token);
            dispatch(setAuthentification(true));
            history.push("/products")
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export function getAllProducts(){
        return function(dispatch){
            axios.get(`${BACK_END_POINT}/products`).then((response)=>{
                dispatch({type:PRODUCTS.GET_ALL_PRODUCTS,payload:response.data.products})
        }).catch( error =>{
            console.log("--> getAllProducts ( error ) : ",error)
        })
    }
}

export function getOneProduct(productId){
    return function(dispatch){
        axios.get(`${BACK_END_POINT}/products/${productId}`).then((response)=>{
            console.log(response)
            dispatch({type:PRODUCTS.GET_ONE_PRODUCT,payload:response.data.product})
        })
    }
}