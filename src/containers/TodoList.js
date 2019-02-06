import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import Pagination from "react-js-pagination";
import { fetchTasks, setPageNumber } from "../actions/tasks";
import AddTask from "./AddTask"
import SortTasks from "./SortTasks"
// import Login from "./Login"
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
        console.log("handlePageChange", pageNumber);
        this.setState({activePage: pageNumber});
        // var sortArg = globSortField ? globSortField : "";
        this.props.fetchTasks(pageNumber, this.props.sortField, this.props.sortOrder);

        // set the fetch args here to the store, in action get it from the store
        this.props.setPageNumber(pageNumber);
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

    crossedText(status) {
        return status === 10 ? 'crossed' : '';
    }

    render() {
        if (this.props.tasks) {
            return (
                <div className="container wrapper">
                    <AddTask/>
                    <SortTasks/>
                    <div className="todo-list">{
                        (this.props.tasks || []).map((task, index) => {
                            return (
                                <div key={task.id ? task.id : index} className={`todo-list__todo ${this.crossedText(task.status)}`}>
                                    <div>{task.id}</div>
                                    <div><span>username: </span>{task.username}</div>
                                    <div><span>email: </span>{task.email}</div>
                                    <div>{task.text}</div>
                                    <div>
                                        <label className="todo-list__done">Done</label>
                                        <input onClick={(e) => this.handleCheck(e)} type="checkbox" defaultChecked={task.status && task.status === 10}/>
                                    </div>
                                    <div>
                                        {this.props.admin && <button onClick={() => this.toggleEditForm(task.id)}>Edit</button>}
                                        {this.state.showForm && this.state.taskId === task.id && <EditTask text={task.text} status={task.status}/>}
                                    </div>
                                </div>
                            )
                        })
                    }</div>
                    <Pagination
                        itemClass={"page-item"}
                        linkClass={"page-link"}
                        activePage={this.state.activePage}
                        itemsCountPerPage={3}
                        totalItemsCount={this.props.totalTasks}
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
    return {
        tasks: state.tasks.tasks,
        totalTasks: state.tasks.totalTasks,
        //sortField: state.tasks.sortField,
        admin: state.login.loggedUser,
        sortField: state.fetchArgs.sortField,
        sortOrder: state.fetchArgs.sortOrder,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchTasks: fetchTasks, setPageNumber: setPageNumber}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
