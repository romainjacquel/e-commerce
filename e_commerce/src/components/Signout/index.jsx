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
    <div classname = "container signout">
        <h1 className = 'signout_title'>Oups ! Vous nous quittez déjà ?</h1>
        <p className="signout_text">Dommage ! On espère vous revoir au plus vite ! :)</p>
      </div>
)
}
}

    
const mapDispatchToProps=(dispatch)=>({
        ...bindActionCreators({signoutUser},dispatch)
})


export default connect(null,mapDispatchToProps) (Signout)