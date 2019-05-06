import React,{Component} from 'react'
import {reduxForm,Field} from 'redux-form'
import {LoginUser} from '../../actions/index'
import {bindActionCreators} from 'redux'
import {Form,Button} from "react-bootstrap"
import {connect} from 'react-redux'

const FIELDS = {email : "email", password : "password"}

class Login extends Component{

handleSubmit = (credentials) =>{
    console.log('--->crednetial',credentials)
    this.props.LoginUser(credentials,this.props.history)
    }

    render(){
        return(
            <div>
<div className = "container formLogin">
<h1 className = "title">> Connexion</h1>
<Form className  onSubmit={this.props.handleSubmit(this.handleSubmit)}>
 <Form.Group controlId="loginForm" >
   <Form.Label>Email</Form.Label>
   <Form.Control type="email" name = {FIELDS.email} placeholder="Enter email" />
   <Form.Text className="text-muted">
     We'll never share your email with anyone else.
   </Form.Text>
 </Form.Group>

 <Form.Group>
   <Form.Label>Password</Form.Label>
   <Form.Control type="password" name={FIELDS.password} placeholder="Password" />
 </Form.Group>
 <Button variant="primary" type="submit">
   Connect
 </Button>
 </Form>

{/* <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <div className="row justify-content-md-center">
                    <h1 className='title'>Connexion</h1>
                </div>
                <div className="row justify-content-md-center">
                    <fieldset className='cold-md-4 form-group'>
                        <label className="bmd-label-floating">Email</label>
                        <Field name={FIELDS.email} component="input" type="text" className="form-control" />
                    </fieldset>
                </div>
                <div className="row justify-content-md-center">
                    <fieldset className='cold-md-4 form-group'>
                        <label className="bmd-label-floating">Mot de passe</label>
                        <Field name={FIELDS.password} component="input" type="password" className="form-control" />
                    </fieldset>
                </div>

                    <button type="submit" className="btn btn-primary btn-raised">Connexion</button>
                <div className="row justify-content-md-center">
                </div>
            </form> */}
    </div>
            </div>
           
        )
    }
}

 const loginForm = reduxForm({
    form:"loginForm",
    fields : Object.keys(FIELDS)
    })(Login);

    const mapDispatchToProps=(dispatch)=>({
        ...bindActionCreators({LoginUser},dispatch)
    })

export default connect(null,mapDispatchToProps)(loginForm)