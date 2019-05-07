import React, { Component } from 'react'
import {reduxForm,Field} from 'redux-form'
import {signupUser} from '../../actions/index'
import {bindActionCreators} from 'redux'
import {Form,Button} from "react-bootstrap"
import {connect} from 'react-redux'

const FIELDS = {email : 'email',password:"password"}


class Signin extends Component  {

  handleSubmit = credentials =>{
    console.log('--->crednetial',credentials)
    this.props.signupUser(credentials,this.props.history)
  }

  renderInputComponent = field =>{
    return(
        <div className="row justify-content-md-center">
        <fieldset className="cold-md-4 form-group">
            <label className="bmd-label-floating">{field.label}</label>
            <input {...field.input} type={field.type} className="form-control" />
            
        </fieldset>
        </div>
    );
};

render () {
return (
<div className="container">
<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
    <div className="row justify-content-md-center">
        <h1 className="title">> Inscription</h1>
    </div>
        <Field
            name={FIELDS.email}
            component={this.renderInputComponent}
            type='email'
            label='Email'
        />
        <Field
            name={FIELDS.password}
            component={this.renderInputComponent}
            type='password'
            label='Password'
        />
        
        <div className="row justify-content-md-center">
            <button type='submit' className="btn btn-primary btn-raised">Inscription</button>
        </div>
    </form>
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