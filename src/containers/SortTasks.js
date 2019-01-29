import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { fetchTasks, setSortOrder, setSortField } from '../actions/index'

class SortTasks extends React.Component {
    constructor(props) {
        super(props);
        //window.globSortField = null;
    }

    sort(sortField) {
       this.props.fetchTasks(this.props.pageNumber, sortField, this.props.sortOrder);
       this.props.setSortField(sortField);
       //window.globSortField = sortField;
    }

    sortDirection() {
        if (this.props.sortOrder === 'asc') {
            this.props.setSortOrder('desc')
            this.props.fetchTasks(this.props.pageNumber, this.props.sortField, 'desc');
        } else {
            this.props.setSortOrder('asc');
            this.props.fetchTasks(this.props.pageNumber, this.props.sortField, 'asc');
        }

    }

    render() {
        return(
            <div>
                <h3>Sort by</h3>
                <div onClick={() => this.sort("username")}>Username</div>
                <div onClick={() => this.sort("email")}>Email</div>
                <div onClick={() => this.sort("status")}>Status</div>
                <div onClick={() => this.sortDirection()}>{this.props.sortOrder === 'asc' ? 'change sort order to from Z to A' : ' change sort order to from A to Z'}</div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        sortField: state.fetchArgs.sortField,
        sortOrder: state.fetchArgs.sortOrder,
        pageNumber: state.fetchArgs.pageNumber,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchTasks: fetchTasks, setSortOrder: setSortOrder, setSortField: setSortField}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SortTasks);