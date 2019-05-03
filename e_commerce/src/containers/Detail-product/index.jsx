import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getOneProduct} from "../../actions/index"
import ProductContent from '../../components/Detail-product'


class DetailProduct extends Component  {

componentWillMount(){
    console.log(this.props.params)
    this.props.getOneProduct(this.props.match.params.productId)
}

renderDetailProduct(){
    const {product} = this.props
    console.log(this.props)
    if(product){
        return <ProductContent product = {product}/>
    }
}

render () {
    return (
        <div className="container">
            <h1 className="title">> Product detail</h1>
            {this.renderDetailProduct()}
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.oneProduct
    }
}

const mapDispatchToProps=(dispatch)=>({
    ...bindActionCreators({getOneProduct},dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(DetailProduct)