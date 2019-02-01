const reducer = (state = {sortField: ""}, action) => {
    switch (action.type) {
        case 'REQUEST_TASKS':
            return { ...state, loading: true };
        case 'RECEIVE_TASKS':
            return { ...state, tasks: action.result.message.tasks, totalTasks: action.result.message.total_task_count, loading: false };
        case 'ADD_TASK':
            return {...state, newTask: action.payload}; // ? now fetched from backend
        case 'SET_SORT_FIELD':
            return {...state, sortField: action.sortField};
        default:
            return state;
    }
};

export default reducer;
