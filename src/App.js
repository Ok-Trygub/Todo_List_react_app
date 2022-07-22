import TodoList from "./components/TodoList";
import {Route, Routes} from "react-router-dom";
import React from "react";
import SingleTodo from "./components/routes/SingleTodo";

function App() {
    return (
        <div className="App">

            <Routes>
                <Route path='/' element={<TodoList/>}/>
                <Route path='/single-todo/:id' element={<SingleTodo/>}/>
            </Routes>
        </div>
    );
}

export default App;
