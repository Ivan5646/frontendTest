import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import {editTask} from "../actions";

class EditTask extends React.Component {
    constructor(props) {
        super(props)
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.editTask();
    }

    render() {
        return(
            <form onSubmit={(e) => this.onSubmit(e)}>
                <label htmlFor="">Name</label>
                <input type="text" defaultValue={this.props.name} />
                <label htmlFor="">Email</label>
                <input type="text"  defaultValue={this.props.email}/>
                <label htmlFor="">Text</label>
                <input type="text" defaultValue={this.props.text} />
                <input type="checkbox" defaultValue={this.props.status} />
                <button type="submit">edit</button>
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
    return bindActionCreators({editTask: editTask}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditTask);