import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
//import './css/styles.css'
import App from "./components/App"
import { saveState } from "./persistState/localStorage";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

store.subscribe(() => {
    saveState({
        login: store.getState().login
    });
});
