import React, { Component } from 'react'
import {Navbar, Nav,Button,FormControl,Form, NavDropdown} from "react-bootstrap"
import {getAllCategories} from '../../actions/index'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CategoriesForHeader from "../Render-categories-Header"

class Header extends Component  {

  componentWillMount(){
    this.props.getAllCategories()
}

renderCategories(){
  const {categories} = this.props
  if(categories){
      return categories.map((category)=>{
        return <CategoriesForHeader key={category._id} category = {category}/>
      })
  }
}


render () {
return (
    <header>
       <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">E-COMMERCE</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/products">Products</Nav.Link>
      <NavDropdown title="Categories" id="collasible-nav-dropdown">
      {this.renderCategories()}
      </NavDropdown>
      <Nav.Link href="/login">Connexion</Nav.Link>
      <Nav.Link href="/signup">Inscription</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>  
    </header>
)
}
}

const mapStateToProps = (state) => {
  return {
      categories : state.categories
  }
}


const mapDispatchToProps=(dispatch)=>({
  ...bindActionCreators({getAllCategories},dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Header)