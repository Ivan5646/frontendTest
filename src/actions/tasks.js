import axios from 'axios';
import store from '../store'
import md5 from 'js-md5';
import config from '../configs/config'

axios.defaults.baseURL = config.APIHost;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
const instance = axios.create({
    params: {
        developer: config.developer,
    },
});

// set fetch args
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
    return function (dispatch) {
        dispatch(requestTasks());
        return fetch(`${config.APIHost}?developer=${config.developer}${pageNumber ? `&page=${pageNumber}` : ''}${sortBy ? `&sort_field=${sortBy}` : ''}${sortOrder ? `&sort_direction=${sortOrder}` : ''}`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error),
            )
            .then((result) => {
                dispatch(receiveTasks(result));
                },
            );
    };
}

// post task
export const createTask = (task) => {
    return (dispatch) => {
        (async () => {
            const form = new FormData();
            form.append('username', task.username);
            form.append('email', task.email);
            form.append('text', task.text);

            try {
                const { data } = await instance.post('/create', form);

                if (data.status === 'ok') {
                    const page = store.getState().fetchArgs.pageNumber;
                    const sortField = store.getState().fetchArgs.sortField;
                    const sortOrder = store.getState().fetchArgs.sortOrder;
                    dispatch(createTaskSuccess());
                    dispatch(fetchTasks(page, sortField, sortOrder));
                } else {
                    console.log("data.message", data.message);
                    dispatch(createTaskFailure());
                }
            } catch (error) {
                console.log('Network error');
                dispatch(createTaskFailure());
            }
        })();
    }
}

export const createTaskSuccess = () => {
    return {
        type: 'CREATE_TASK_SUCCESS'
    };
}

export const createTaskFailure = () => {
    return {
        type: 'CREATE_TASK_FAILURE'
    }
}

// update task
function generateSignature(text, status) {
    // sort alphabetically status and text?
    let sortedAndToken = `status=${status}&text=${text}&${config.token}`; // the values being inputted
    sortedAndToken = encodeURIComponent(sortedAndToken); // URI encode
    const signature = md5(sortedAndToken); // create md5 hash
    return signature;
}

export const updateTask = (task, id) => {
    var status = task.status ? 10 : 0;
    status = status.toString();
    return (dispatch) => {
        (async () => {
            const form = new FormData();
            form.append('text', task.text);
            form.append('status', status);
            form.append('token', config.token);
            form.append('signature', generateSignature(task.text, status));

            try {
                const { data } = await instance.post(`/edit/${id}`, form);

                if (data.status === 'ok') {
                    const page = store.getState().fetchArgs.pageNumber;
                    const sortField = store.getState().fetchArgs.sortField;
                    const sortOrder = store.getState().fetchArgs.sortOrder;
                    dispatch(updateTaskSuccess());
                    dispatch(fetchTasks(page, sortField, sortOrder));
                } else {
                    dispatch(updateTaskFailure());
                }
            } catch (error) {
                console.log('Network error');
                dispatch(updateTaskFailure());
            }
        })();
    }
}

export const updateTaskSuccess = (data) => {
    return {
        type: 'UPDATE_TASK_SUCCESS',
        data
    }
}

export const updateTaskFailure = () => {
    return {
        type: 'UPDATE_TASK_FAILURE'
    }
}