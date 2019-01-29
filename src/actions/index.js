import axios from 'axios';
import store from '../store'

// fetch args
export const setPageNumber = (pageNumber) => ({
    type: 'SET_PAGE_NUMBER',
    pageNumber
});

export const setSortField = (sortField) => ({
    type: 'SET_SORT_FIELD',
    sortField
});

export const setSortOrder = (sortOrder) => ({
    type: 'SET_SORT_ORDER',
    sortOrder
});

// fetch tasks
export const requestTasks = () => ({
    type: 'REQUEST_TASKS',
});

export const receiveTasks = (result) => ({
    type: 'RECEIVE_TASKS',
    result: result,
});

export function fetchTasks(pageNumber, sortBy, sortOrder) {
    //pageNumber = 5;
    return function (dispatch) {
        console.log("fetch fired", `https://uxcandy.com/~shapoval/test-task-backend/?developer=mikhai${pageNumber ? `&page=${pageNumber}` : ''}${sortBy ? `&sort_field=${sortBy}` : ''}${sortOrder ? `&sort_direction=${sortOrder}` : ''}`);
        dispatch(requestTasks());
        return fetch(`https://uxcandy.com/~shapoval/test-task-backend/?developer=mikhai${pageNumber ? `&page=${pageNumber}` : ''}${sortBy ? `&sort_field=${sortBy}` : ''}${sortOrder ? `&sort_direction=${sortOrder}` : ''}`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error),
            )
            .then((result) => {
                dispatch(receiveTasks(result));
                const storeTasks = store.getState().tasks;
                console.log("storeTasks", storeTasks);
                },
            );
    };
}

// async wait
export const createTaskAwait = (task) => {
    const config = {
        APIHost: 'https://uxcandy.com/~shapoval/test-task-backend', //https://uxcandy.com/~shapoval/test-task-backend
        developer: 'mikhai',
        token: 'beejee',
    };
    axios.defaults.baseURL = config.APIHost;
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    const instance = axios.create({
        params: {
            developer: config.developer,
        },
    });
    return (dispatch) => {
        (async () => {
            const form = new FormData();
            form.append('username', task.username);
            form.append('email', task.email);
            form.append('text', task.text);

            try {
                const { data } = await instance.post('/create', form);

                if (data.status === 'ok') {
                    console.log("data.status", data.status);
                    //dispatch(createTaskSuccess(data))
                    // fetch tasks, handle arguments (save them to the store and get them from it?)
                    const page = store.getState().fetchArgs.pageNumber;
                    console.log("page", page);
                    const sortField = store.getState().fetchArgs.sortField;
                    console.log("sortField", sortField);
                    const sortOrder = store.getState().fetchArgs.sortOrder;
                    console.log("sortOrder", sortOrder);
                    dispatch(fetchTasks(page, sortField, sortOrder));
                } else {
                    console.log("data.message", data.message);
                }
            } catch (error) {
                console.log('Network error');
                // dispatch(createTaskSuccess({username: "myNameeee", email: "yahoo", text: "this text"}));
                // const page = store.getState().fetchArgs.pageNumber;
                // console.log("page", page);
                // const sortField = store.getState().fetchArgs.sortField;
                // console.log("sortField", sortField);
                // const sortOrder = store.getState().fetchArgs.sortOrder;
                // console.log("sortOrder", sortOrder);
                // dispatch(fetchTasks(page, sortField, sortOrder));
            }
        })();
    }
}

export const createTaskSuccess = (data) => { // coming undefined
    console.log("createTaskSuccess", data);
    return {
        type: 'ADD_TASK',
        payload: {
            //_id: data._id,
            username: data.username,
            email: data.email,
            text: data.text
        }
    }
};

export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}

export const editTask = (data) => {
    return {
        type: 'EDIT_TASK',
        payload: data
    }
}

