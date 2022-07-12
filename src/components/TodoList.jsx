import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import _ from 'lodash';
import TodoItem from "./TodoItem";

const TodoList = () => {

    const dbKey = 'taskList';
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');
    const [isCompleted, setCompleted] = useState(false);
    const [todos, setTodos] = useState([]);

    function handleChange(event) {
        const {target} = event;

        if (target.name === 'title') setCurrentTitle(target.value);
        if (target.name === 'description') setCurrentDescription(target.value);

        console.log(currentTitle)
    }

    function addTask(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!currentTitle.length || !currentDescription.length) return;

        const uniqueId = _.uniqueId();
        if (uniqueId === 0) throw new Error('ID cannot be 0');

        let data = {
            itemId: uniqueId,
            title: currentTitle,
            description: currentDescription,
            isCompleted: isCompleted
        }

        setData(data);

        setTodos([data, ...todos]);
        setCurrentTitle('');
        setCurrentDescription('');
    }

    function setData(todoItemData) {
        if (!hasItem()) {
            setItem([todoItemData]);
            return;
        }

        const storageData = JSON.parse(
            localStorage.getItem(dbKey)
        )

        const data = [todoItemData, ...storageData];
        setItem(data);
    }

    function hasItem() {
        let data = localStorage.getItem(dbKey);
        if (!data) return false;

        return true;
    }

    function setItem(data) {
        return localStorage.setItem(
            dbKey,
            JSON.stringify(data)
        );
    }

    const clearForm = () => {
        setCurrentTitle('');
        setCurrentDescription('');
    }

    const removeItemHandler = (id) => (event) => {
        event.stopPropagation();

        let todosArr = [...todos];

        const currentItemIndex = todos.findIndex(todoItem => {
            return todoItem.itemId === id
        });

        todosArr.splice(currentItemIndex, 1);

        setTodos(todosArr);

        if (!todosArr.length) localStorage.clear();
        else setItem(todosArr);
    }

    const changeCompleteStatus = (id) => (event) => {
        const {target} = event;

        let todosArr = [...todos];

        const currentItem = todos.findIndex(todoItem => {
            return todoItem.itemId === id
        });

        todosArr[currentItem].isCompleted = target.checked;

        setTodos(todosArr);
        setItem(todosArr);
    }

    const removeAllTodos = () => {
        localStorage.clear();
        setTodos([]);
    }

    useEffect(() => {
        const data = JSON.parse(
            localStorage.getItem(dbKey)
        );
        if (!data) return;

        setTodos(data);
    }, []);

    const renderItem = () => {
        if (!todos) return null;

        return todos.map(item => {
            return <TodoItem task={item} key={item.itemId}
                             onRemove={removeItemHandler}
                             changeStatus={changeCompleteStatus}
            />
        })
    }

    return (
        <main>
            <h1 className="text-center mt-5 mb-5">TODO LIST</h1>
            <div className="container">
                <div className="row">

                    <div className="col-4">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Task title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Title"
                                    required
                                    value={currentTitle}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Task body</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    placeholder="Task body"
                                    cols="30"
                                    rows="10"
                                    required
                                    value={currentDescription}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="d-flex justify-content-between">
                                <div>
                                    <Button variant="primary" onClick={addTask}>Create Task!</Button>
                                    <Button variant="warning" onClick={clearForm}>Очистить</Button>
                                </div>

                                <Button variant="danger" onClick={removeAllTodos}>Удалить все</Button>
                            </div>

                        </form>
                    </div>

                    <div className="col-8">
                        <div className="row" id="todoItems">
                            {renderItem()}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default TodoList;

