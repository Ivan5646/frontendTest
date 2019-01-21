import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { createTask } from "../actions/index";


class AddTask extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            username : "",
            text: "",
            email: "",
            //checked: false
        }
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        console.log(e);
        console.log("this.state.form", this.state);
        console.log("this.state.form.email", this.state.email);
        this.props.createTask({username: "xxx", email: "xxx@yahoo.com", text: "random text"});
        // validate
        // then reset the state agian to ''
    }

    render() {
        return (
            <form onSubmit={(e) => this.onSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type="text" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={this.state.email} onChange={(e) => this.handleEmailChange(e)} />
                </div>
                <div>
                    <label>Text</label>
                    <input type="text"  value={this.state.text} onChange={(e) => this.handleTextChange(e)} />
                </div>
                <div> {/* admin only can check it*/}
                    <label>Done</label>
                    <input type="checkbox"/>
                </div>
                <button type="submit">create</button>
            </form>
        )
    }
}

function mapStateToProps(state){
    return {
        tasks: state.tasks.tasks
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({createTask: createTask}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddTask);