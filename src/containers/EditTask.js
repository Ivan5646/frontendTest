import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { updateTask } from "../actions/tasks";

class EditTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: undefined,
            checked: undefined
        }
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    handleStatusChange(e) {
        this.setState({checked: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        // handle nothing changed
        this.props.updateTask({text: this.state.text ? this.state.text : '', status: this.state.checked}, this.props.id);
    }

    showUpdateResult() {
        if (this.props.tasks.updatedTask === 'failed') {
            return (
                <div className="edit-task__result">error occurred</div>
            )
        } else if (this.props.tasks.updatedTask === 'success') {
            return (
                <div className="edit-task__result">success</div>
            )
        }
    }

    render() {
        return(
            <form onSubmit={(e) => this.onSubmit(e)} className="edit-task">
                <label>Text:</label>
                <input type="text" defaultValue={this.props.text} onChange={(e) => this.handleTextChange(e)} />
                <div>
                    <label>Done</label>
                    <input type="checkbox" defaultValue={this.props.status} onChange={(e) => this.handleStatusChange(e)} />
                </div>
                <button type="submit">edit</button>
                {this.showUpdateResult()}
            </form>
        )
    }
}

function mapStateToProps(state){
    return {
        tasks: state.tasks
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({updateTask: updateTask}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditTask);