const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {loggedUser: action.payload.login};
        case 'LOGOUT':
            return {loggedUser: null};
        default:
            return state;
    }
}

export default reducer;