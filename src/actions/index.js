import axios from 'axios';
import jquery from 'jquery';

export const requestTasks = () => ({
    type: 'REQUEST_TASKS',
});

export const receiveTasks = (result) => ({
    type: 'RECEIVE_TASKS',
    result: result,
});

export function fetchTasks() {
    return function (dispatch) {
        dispatch(requestTasks());
        return fetch("https://uxcandy.com/~shapoval/test-task-backend/?developer=mikhai")
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

export const createTask = (task) => {
    return (dispatch) => {
        var form = new FormData();
        form.append("username", "333");
        form.append("email", "333@ggg.com");
        form.append("text", "333 text");

        jquery.ajax({
            url: 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=mikhai',
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: form,
            dataType: "json",
            success: data => {
                dispatch(createTaskSuccess(data));
            },
            error: function (error) {
                console.log(error);
            }
        });
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

