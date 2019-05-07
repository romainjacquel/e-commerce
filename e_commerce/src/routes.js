import React,{Component} from 'react'
import {Route,Switch} from "react-router-dom";
import Header from './components/Header'
import Signup from './components/Signup';
import Login from './components/Login'
import AllProducts from './containers/All-products'
import DetailProduct from "./containers/Detail-product"
import Signout from "./components/Signout"


// Router : On va mettre toutes nos routes dedans

class Routes extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Switch>
                    {/* User */}
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/logout" component={Signout}/>
                    {/* Return all_product */}
                    <Route exact path="/products" component={AllProducts}/> 
                    {/* Return one_product */}
                    <Route exact path="/product/:productId" component={DetailProduct}/>
                </Switch>
            </div>
        )
    }
}

export default Routes