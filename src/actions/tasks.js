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

export function fetchTasks(pageNumber, sortBy, sortOrder) { // refactor
    //pageNumber = 5;
    return function (dispatch) {
        console.log("fetch fired", `${config.APIHost}?developer=${config.developer}${pageNumber ? `&page=${pageNumber}` : ''}${sortBy ? `&sort_field=${sortBy}` : ''}${sortOrder ? `&sort_direction=${sortOrder}` : ''}`);
        dispatch(requestTasks());
        return fetch(`${config.APIHost}?developer=${config.developer}${pageNumber ? `&page=${pageNumber}` : ''}${sortBy ? `&sort_field=${sortBy}` : ''}${sortOrder ? `&sort_direction=${sortOrder}` : ''}`)
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
            }
        })();
    }
}

export const createTaskSuccess = (data) => {
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

// update task
function generateSignature(data, token) {
    var status = data.status ? 10 : 0;
    // id 7612
    // var sortedAndToken = "username=ajax&email=gggggggg@ggg.com&text=text text&token=beejee"; // sort alphabetically data
    //var sortedAndToken = "status=0&text=text text&token=beejee"; // only fields that are editing
    var sortedAndToken = `status=${status}&text=${data.text}&token=beejee`; // the values being inputted
    sortedAndToken = encodeURIComponent(sortedAndToken); // URI encode
    console.log("URI encoded", sortedAndToken);
    var signature = md5(sortedAndToken); // create md5 hash
    console.log("signature", signature);
    return signature;

    //const signature = `${data.username}${data.email}${data.text}`
}
//generateSignature();

export const updateTask = (task, id) => {
    var status = task.status ? 10 : 0;
    status = status.toString();
    console.log("task, id", task, id);
    return (dispatch) => {
        (async () => {
            const form = new FormData();
            form.append('text', task.text);
            form.append('status', status);
            form.append('token', config.token);
            form.append('signature', generateSignature(task));
            //form.append('signature', generateSignature(gatheringFormData, { key: 'token', value: config.token }));

            try {
                const { data } = await instance.post(`/edit/${id}`, form);

                if (data.status === 'ok') {
                    console.log("data.status", data.status);
                    //dispatch(createTaskSuccess(data));
                    //fetch tasks, handle arguments (save them to the store and get them from it?)
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

export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}

