const reducer = (state = {pageNumber: 1, sortOrder: 'asc'}, action) => {
    switch (action.type) {
        case 'SET_PAGE_NUMBER':
            return {...state, pageNumber: action.pageNumber};
        case 'SET_SORT_FIELD':
            return {...state, sortField: action.sortField};
        case 'SET_SORT_ORDER':
            return {...state, sortOrder: action.sortOrder};
        default:
            return state
    }
}

export default reducer;