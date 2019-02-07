import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { login, logout } from "../actions/auth";
import PropTypes from "prop-types";

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

    logout() {
        this.props.logout();
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

    accountStatus() {
        if (this.props.loggedUser) {
            return (
                <div className="login">
                    <div onClick={() => this.logout()} className="login__btn">Sign out</div>
                </div>
            )
        } else {
            return (
                <div className="login">
                    <div>{this.form()}</div>
                    <div onClick={() => this.renderForm()} className="login__btn">Sign in</div>
                </div>
            )

        }
    }

    render() {
        return (
            this.accountStatus()
        )
    }
}

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.number
}

function mapStateToProps(state){
    return {
        loggedUser: state.login.loggedUser
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({login: login, logout: logout}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);