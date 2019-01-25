import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { login } from "../actions/index";
import {createTask} from "../actions";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login : "",
            password: ""
        }
    }

    handleLoginChange(e) {
        this.setState({login: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        if ( this.state.login == 'admin' && this.state.password == '123') {
            this.props.login({login: this.state.login, password: this.state.password});
        }
    }

    render() {
        return (
            <form onSubmit={(e) => this.onSubmit(e)}>
                <label htmlFor="">Login</label>
                <input type="text" placeholder="login" value={this.state.username} onChange={(e) => this.handleLoginChange(e)}/>
                <label htmlFor="">Password</label>
                <input type="text" placeholder="password" value={this.state.username} onChange={(e) => this.handlePasswordChange(e)} />
                <button type="submit">submit</button>
            </form>
            )
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({login: login}, dispatch)
}

export default connect(null, matchDispatchToProps)(Login);