import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { createTask, createTaskAwait } from "../actions/index";


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
        this.props.createTaskAwait({username: this.state.username, email: this.state.email, text: this.state.text});
        // reset fields
        this.setState({username: ''});
        this.setState({text: ''});
        this.setState({email: ''});
    }

    render() {
        return (
            <form onSubmit={(e) => this.onSubmit(e)} className="add-task">
                <div className="add-task__field-block">
                    <label>Name</label>
                    <input type="text" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)} placeholder="name" required />
                </div>
                <div className="add-task__field-block">
                    <label>Email</label>
                    <input type="email" value={this.state.email} onChange={(e) => this.handleEmailChange(e)} placeholder="yourmail@gmail.com" required />
                </div>
                <div className="add-task__field-block">
                    <label>Text</label>
                    <input type="text"  value={this.state.text} onChange={(e) => this.handleTextChange(e)} placeholder="text" />
                </div>
                <button type="submit" className="btn btn-primary">create new task</button>
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
    return bindActionCreators({createTask: createTask, createTaskAwait: createTaskAwait}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddTask);