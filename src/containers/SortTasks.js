import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { fetchTasks } from '../actions/index'

class SortTasks extends React.Component {
    constructor(props) {
        super(props);
    }

    sort(sortField) {
        this.props.fetchTasks("", sortField);
    }

    render() {
        return(
            <div>
                <h3>Sort by</h3>
                <div onClick={() => this.sort("username")}>Username</div>
                <div onClick={() => this.sort("email")}>Email</div>
                <div onClick={() => this.sort("status")}>Status</div>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchTasks: fetchTasks}, dispatch)
}

export default connect(null, matchDispatchToProps)(SortTasks);