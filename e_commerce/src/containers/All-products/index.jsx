import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAllProducts} from '../../actions/index'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router'

class AllProducts extends Component  {

constructor(props){
      super(props)
}
componentWillMount(){
      this.props.getAllProducts()
}

renderProducts(){
      const {products} = this.props
      
      if(products){
           return products.map((product)=>{

            const BASE_URL_IMG = 'http://localhost:3090/'
            const URL_IMG = `${BASE_URL_IMG}${product.productImage}`
            const URL_DETAIL_PRODUCT = `/product/${product._id}`


                  return  <Card style={{ width: '18rem', float : "left",margin : "2rem 1.5rem 0 0"  }} key={product._id}>
                  <Card.Img variant="top" height="180px" src={URL_IMG} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                    Price : {product.price} €
                    </Card.Text>
                    <Button href={URL_DETAIL_PRODUCT} variant="secondary" className="btn_description">Description</Button>
                    <Button variant="primary">Add to basket</Button>
                  </Card.Body>
                  </Card>
            })
      }
}

render () {
      
return (
<div className="container">
<h1 className="title">> All Products</h1>
{this.renderProducts()}
</div>
      
)
}
}

const mapStateToProps = (state) => {
      console.log("---> Le state",state)
      return {
          products : state.products
      }
  }

const mapDispatchToProps=(dispatch)=>({
      ...bindActionCreators({getAllProducts},dispatch)
  })

export default connect(mapStateToProps,mapDispatchToProps)(AllProducts)