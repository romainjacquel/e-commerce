import React, { Component } from 'react'
import {signoutUser} from "../../actions/index"
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'


class Signout extends Component  {
componentWillMount(){
    this.props.signoutUser()
}

render () {
return (
    <div classname = "container">
        <h1>Aurevoir</h1>
      </div>
)
}
}

    
const mapDispatchToProps=(dispatch)=>({
        ...bindActionCreators({signoutUser},dispatch)
})


export default connect(null,mapDispatchToProps) (Signout)