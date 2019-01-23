const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'REQUEST_TASKS':
            return { ...state, loading: true };
        case 'RECEIVE_TASKS':
            return { ...state, tasks: action.result.message.tasks, totalTasks: action.result.message.total_task_count, loading: false };
        case 'ADD_TASK':
            return {...state, newTask: action.payload};
        default:
            return state;
    }
};

export default reducer;
