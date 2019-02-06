import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { createTask } from "../actions/tasks";


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

    formOnChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        this.props.createTask({username: this.state.username, email: this.state.email, text: this.state.text});
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
                    <input type="text" name="username" value={this.state.username} onChange={(e) => this.formOnChange(e)} placeholder="name" required />
                </div>
                <div className="add-task__field-block">
                    <label>Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={(e) => this.formOnChange(e)} placeholder="yourmail@gmail.com" required />
                </div>
                <div className="add-task__field-block">
                    <label>Text</label>
                    <input type="text" name="text"  value={this.state.text} onChange={(e) => this.formOnChange(e)} placeholder="text" />
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
    return bindActionCreators({createTask: createTask, createTask: createTask}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddTask);