import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");
import { fetchTasks } from "../actions/index";
import AddTask from "./AddTask"

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

    // loadTasks() {
    //     this.props.fetchTasks()
    // }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        this.props.fetchTasks(pageNumber);
    }

    render() {
        if (this.props.tasks) {
            return (
                <div>
                    <h3>Tasks</h3>
                    <AddTask/>
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
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={18}
                        pageRangeDisplayed={5}
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
        tasks: state.tasks.tasks
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchTasks: fetchTasks}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
