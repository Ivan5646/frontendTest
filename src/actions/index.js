import axios from 'axios';
import jquery from 'jquery';

export const requestTasks = () => ({
    type: 'REQUEST_TASKS',
});

export const receiveTasks = (result) => ({
    type: 'RECEIVE_TASKS',
    result: result,
});

export function fetchTasks(pageNumber, sortBy) {
    return function (dispatch) {
        console.log("fetch fired", `https://uxcandy.com/~shapoval/test-task-backend/?developer=ivan${pageNumber ? `&page=${pageNumber}` : ''}${sortBy ? `&sort_field=${sortBy}` : ''}`);
        dispatch(requestTasks());
        return fetch(`https://uxcandy.com/~shapoval/test-task-backend/?developer=ivan${pageNumber ? `&page=${pageNumber}` : ''}${sortBy ? `&sort_field=${sortBy}` : ''}`)
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

export const setSortField  = (sortField, order) => {
    return {
        type: 'SET_SORT_FIELD',
        sortField: sortField
    }
}

export const createTask = (task) => {
    return (dispatch) => {
        // var form = new FormData();
        // form.append("username", "333");
        // form.append("email", "333@ggg.com");
        // form.append("text", "333 text");

        const taskData = {username: "petro", email: "petroMail", text: "random text so random"};

        function myFunction(data, callback) { // request is failing
            var result = false;
            jquery.ajax({
                url: 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=mikhai', // 'http://ptsv2.com/t/0o8hh-1548184815/post',
                crossDomain: true,
                method: 'POST',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                data: data,
                dataType: "jsonp",
                success: data => {
                    //dispatch(createTaskSuccess(data));
                    console.log("post successful");
                    result = data;
                    if(callback != null) {
                        callback(result);
                    }
                },
                error: function (error) {
                    console.log("post error", error);
                    //result = false;
                    result = data;
                    if(callback != null)  {
                        callback(result);
                    }
                }
            });
        }
        function processData(result) {
            console.log("result for dispatch", result);
            dispatch(createTaskSuccess(result));
        }
        myFunction(taskData, processData);

    }
};

export const createTaskSuccess = (data) => { // coming undefined
    console.log("data", data);
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

// async wait
export const createTaskAwait = (task) => {
    const config = {
        APIHost: 'https://uxcandy.com/~shapoval/test-task-backend',
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
                dispatch(createTaskSuccess(data))
            } else {
                console.log("data.message", data.message);
            }
        } catch (error) {
            console.log('Network error');
        }
    })();
    }
}


// export const createTask = (task) => {
//     console.log("username, email, text", task.username, task.email, task.text);
//     return (dispatch) => {
//         return axios.post("https://uxcandy.com/~shapoval/test-task-backend/create?developer=mikhai", {
//             params: {
//                 username: task.username,
//                 email: task.email,
//                 text: task.text
//             }})
//             .then(response => {
//                 dispatch(createTaskSuccess(response.data))
//             })
//             .catch(error => {
//                 console.log("post error", error);
//                 throw(error);
//             });
//     };
// };
//
// export const createTaskSuccess = (data) => {
//     return {
//         type: 'ADD_TASK',
//         payload: {
//             //_id: data._id,
//             username: data.username,
//             email: data.email,
//             text: data.text
//         }
//     }
// };

