import React, { Component } from 'react'
import {reduxForm,Field} from 'redux-form'
import {signupUser} from '../../actions/index'
import {bindActionCreators} from 'redux'
import {Form,Button} from "react-bootstrap"
import {connect} from 'react-redux'

const FieldInput = ({ input, type, placeholder, name }) => {
  return (
      <Form.Control
          type={type}
          name = {name}
          placeholder={placeholder}
          value={input.value}
          onChange={input.onChange} />
  )
} 

class Signin extends Component  {

  handleSubmit = credentials =>{
    console.log('--->crednetial',credentials)
    this.props.signupUser(credentials,this.props.history)
  }

render () {
return (
<div className="container">
     <h1>Formulaire d'inscription</h1>
    <Form className  onSubmit={this.props.handleSubmit(this.handleSubmit)}>
 <Form.Group controlId="loginForm" >
   <Form.Label>Email</Form.Label>
   <Form.Control component = {FieldInput} name="email" type = "email" label= "email" placeholder = "Enter your Email" />
   <Form.Text className="text-muted">
     We'll never share your email with anyone else.
   </Form.Text>
 </Form.Group>

 <Form.Group>
   <Form.Label>Password</Form.Label>
   <Form.Control component = {FieldInput} name="password" type = "password" label= "password" placeholder="Choose a password"/>
 </Form.Group>
 <Button variant="primary" type="submit">
   S'inscrire
 </Button>
 </Form>
      </div>
)
}
}

const signupForm = reduxForm({
  form:"signupForm"
  })(Signin);

  const mapDispatchToProps=(dispatch)=>({
      ...bindActionCreators({signupUser},dispatch)
  })

export default connect(null,mapDispatchToProps)(signupForm)