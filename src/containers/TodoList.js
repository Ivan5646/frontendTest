import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { fetchTasks } from "../actions/index";

class TodoList extends React.Component {
    componentDidMount(){
        this.props.fetchTasks()
    }

    render() {
        if (this.props.tasks) {
            return (
                <div>
                    <h3>Tasks</h3>
                    <div>{
                        this.props.tasks.map((task) => {
                            return (
                                <div key={task.id}>
                                    <div>{task.id}</div>
                                    <div>{task.email}</div>
                                    <div>{task.text}</div>
                                </div>
                            )
                        })
                    }</div>
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        tasks: state.tasks.tasks
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchTasks: fetchTasks}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
