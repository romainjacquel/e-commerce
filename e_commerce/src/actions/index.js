import axios from 'axios'
import {PRODUCTS,CATEGORIES, SET_AUTHENTIFICATION} from "./actions-types"

const BACK_END_POINT = "http://localhost:3090"

export function setAuthentification(isLoggedIn){
    return {
            type:SET_AUTHENTIFICATION,
            payload:isLoggedIn
    };
}

// Request for User

export function LoginUser({email,password},history){
    return function(dispatch){
        axios.post(`${BACK_END_POINT}/user/login`,{
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

export function signupUser({email,password},history){
    return function(dispatch){
        axios.post(`${BACK_END_POINT}/user/signup`,{
            email,
            password
        }).then((response)=>{
            console.log("---> response signup",response)
            localStorage.setItem("token",response.data.token);
            dispatch(setAuthentification(true));
            history.push('/products')
        }).catch((error)=>{
            console.log(error)
        })
    }
}

// Request for Products

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
            dispatch({type:PRODUCTS.GET_ONE_PRODUCT,payload:response.data.product})
        })
    }
}

// Request for categories

export function getAllCategories(){
    return function(dispatch){
        axios.get(`${BACK_END_POINT}/categories`).then((response)=>{
            dispatch({type:CATEGORIES.GET_ALL_CATEGORIES,payload:response.data.categories})
    }).catch( error =>{
        console.log("--> getAllCategories ( error ) : ",error)
    })
}
}