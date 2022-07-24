import TodoList from "./components/TodoList";
import {Route, Routes} from "react-router-dom";
import React from "react";
import SingleTodo from "./components/routes/SingleTodo";


function App() {
    return (
        <>
                <Routes>
                    <Route path='/' element={<TodoList/>}/>
                    <Route path='/todo-items/:id' element={<SingleTodo/>}/>
                </Routes>
        </>
    );
}

export default App;
