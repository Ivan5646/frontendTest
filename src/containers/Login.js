import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { login } from "../actions/index";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login : "",
            password: "",
            showForm: false
        }
    }
    
    formOnChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if ( this.state.login == 'admin' && this.state.password == '123') {
            this.props.login({login: this.state.login, password: this.state.password});
        }
        this.setState({login: ''});
        this.setState({password: ''});
    }

    renderForm(){
        this.setState({showForm: !this.state.showForm});
    }

    form() {
        return (
           this.state.showForm && (<form onSubmit={(e) => this.onSubmit(e)}>
                <label htmlFor="">Login</label>
                <input type="text" placeholder="login" name="login" value={this.state.login} onChange={(e) => this.formOnChange(e)}/>
                <label htmlFor="">Password</label>
                <input type="text" placeholder="password" name="password" value={this.state.password} onChange={(e) => this.formOnChange(e)} />
                <button type="submit">submit</button>
            </form>)
        )
    }

    render() {
        return (
            <div>
                <div onClick={() => this.renderForm()}>Login</div>
                <div>{this.form()}</div>
            </div>
            )
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({login: login}, dispatch)
}

export default connect(null, matchDispatchToProps)(Login);