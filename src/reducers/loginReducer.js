const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {loggedUser: action.payload.login};
        default:
            return state;
    }
}

export default reducer;