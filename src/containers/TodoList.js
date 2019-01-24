import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");
import { fetchTasks } from "../actions/index";
import AddTask from "./AddTask"
import SortTasks from "./SortTasks"

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
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

    render() {
        if (this.props.tasks) {
            return (
                <div>
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
        sortField: state.tasks.sortField
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchTasks: fetchTasks}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
