import React from "react"
import {NavDropdown} from "react-bootstrap"

const CategoriesForHeader = ({category})=>{

    return(<NavDropdown.Item href="#">{category.name}</NavDropdown.Item>)
}

export default CategoriesForHeader