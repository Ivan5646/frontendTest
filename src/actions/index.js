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
        return fetch("https://uxcandy.com/~shapoval/test-task-backend/?developer=ivan")
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