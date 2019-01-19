const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'REQUEST_TASKS':
            return { ...state, loading: true };
        case 'RECEIVE_TASKS':
            return { ...state, tasks: action.result.message.tasks, loading: false };
        default:
            return state;
    }
};

export default reducer;
