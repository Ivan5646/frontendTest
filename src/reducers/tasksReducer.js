const reducer = (state = {sortField: "", updatedTask: null, newTask: null}, action) => {
    switch (action.type) {
        case 'REQUEST_TASKS':
            return { ...state, loading: true };
        case 'RECEIVE_TASKS':
            return { ...state, tasks: action.result.message.tasks, totalTasks: action.result.message.total_task_count, loading: false };
        // case 'ADD_TASK':
        //     return {...state, newTask: action.payload}; // ? now fetched from backend
        case 'ADD_TASK':
            return {...state, newTask: 'success'};
        case 'CREATE_TASK_FAILURE':
            return {...state, newTask: 'failed'};
        case 'SET_SORT_FIELD':
            return {...state, sortField: action.sortField};
        case 'UPDATE_TASK_FAILURE':
            return {...state, updatedTask: "failed"};
        case 'UPDATE_TASK_SUCCESS':
            return {...state, updatedTask: "success"};
        default:
            return state;
    }
};

export default reducer;
