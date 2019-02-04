import React from 'react'
import TodoList from '../containers/TodoList'
import Header from '../containers/Header'

const App = () => (
    <div className="fluid-container">
        <Header/>
        <TodoList />
    </div>
)

export default App;
