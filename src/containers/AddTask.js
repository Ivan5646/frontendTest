import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { createTask } from "../actions/tasks";
import PropTypes from "prop-types";

class AddTask extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            username : "",
            text: "",
            email: "",
            endLimit: null
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

    timeOut() {
        const timer = setTimeout( () => {
            this.setState({['endLimit']: true});
        }, 2500);
        if (this.state.endLimit) {
            clearTimeout(timer);
        }
    }

    createTaskResult() {
        if (this.props.newTask === 'success' && !this.state.endLimit) {
            this.timeOut();
            return (
                <div className="add-task__result">Task created</div>
            )
        } else if (this.props.newTask === 'failed' && !this.state.endLimit) {
            this.timeOut();
            return (
                <div className="add-task__result">Error occurred</div>
            )
        }
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
                {this.createTaskResult()}
            </form>
        )
    }
}

AddTask.propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    text: PropTypes.string,

}

function mapStateToProps(state){
    return {
        tasks: state.tasks.tasks,
        newTask: state.tasks.newTask
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({createTask: createTask, createTask: createTask}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddTask);