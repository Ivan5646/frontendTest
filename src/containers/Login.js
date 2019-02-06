import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { login } from "../actions/auth";

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
           this.state.showForm && (<form onSubmit={(e) => this.onSubmit(e)} className="login__form">
               <div>
                    <label htmlFor="">Login</label>
                    <input type="text" placeholder="login" name="login" value={this.state.login} onChange={(e) => this.formOnChange(e)}/>
               </div>
               <div>
                    <label htmlFor="">Password</label>
                    <input type="text" placeholder="password" name="password" value={this.state.password} onChange={(e) => this.formOnChange(e)} />
               </div>
                <button type="submit">submit</button>
            </form>)
        )
    }

    render() {
        return (
            <div className="login">
                <div>{this.form()}</div>
                <div onClick={() => this.renderForm()} className="login__btn">Login</div>
            </div>
            )
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({login: login}, dispatch)
}

export default connect(null, matchDispatchToProps)(Login);