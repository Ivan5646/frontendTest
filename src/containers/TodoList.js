import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");
import { fetchTasks } from "../actions/index";
import AddTask from "./AddTask"
import SortTasks from "./SortTasks"
import Login from "./Login"
import EditTask from "./EditTask"

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            showForm: false
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(){
        this.props.fetchTasks();
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        var sortArg = globSortField ? globSortField : "";
        this.props.fetchTasks(pageNumber, sortArg);
    }

    toggleEditForm(taskId) {
        this.setState({
            showForm: !this.state.showForm,
            taskId: taskId
        })
    }

    handleCheck(e) {
        // if admin, able to check and send it to backend. If not admin preventDefault().
        e.preventDefault();
    }

    render() {
        if (this.props.tasks) {
            return (
                <div>
                    <Login/>
                    <SortTasks/>
                    <h3>Tasks</h3>
                    <AddTask/>
                    <div>{
                        (this.props.tasks || []).map((task) => {
                            return (
                                <div key={task.id}>
                                    <div>{task.id}</div>
                                    <div><span>username: </span>{task.username}</div>
                                    <div><span>email: </span>{task.email}</div>
                                    <div>{task.text}</div>
                                    <div>
                                        <label>Done</label>
                                        <input onClick={(e) => this.handleCheck(e)} type="checkbox" defaultChecked={task.status !== 0}/>
                                    </div>
                                    <div>
                                        {this.props.admin && <button onClick={() => this.toggleEditForm(task.id)}>Edit</button>}
                                        {this.state.showForm && this.state.taskId === task.id && <EditTask name={task.name} email={task.email} text={task.text} status={task.status}/>}
                                    </div>
                                </div>
                            )
                        })
                    }</div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={3}
                        totalItemsCount={this.props.totalTasks * 3}
                        pageRangeDisplayed={this.props.totalTasks / 3}
                        onChange={this.handlePageChange}
                    />
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
    console.log("state.tasks.sortField", state.tasks.sortField);
    return {
        tasks: state.tasks.tasks,
        totalTasks: state.tasks.totalTasks,
        sortField: state.tasks.sortField,
        admin: state.login.loggedUser
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchTasks: fetchTasks}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
