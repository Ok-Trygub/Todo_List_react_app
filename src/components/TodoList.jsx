import React, {useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem/index";
import Storage from "../utils/Storage";


const TodoList = () => {
    const [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
        const data = Storage.getItems() || []

        setTodoItems(data);
    }, [])

    const createTodoItem = (todoItem) => {
        const newState = Storage.setItem(todoItem);

        setTodoItems(newState);
    }

    const changeStatus = (id) => (event) => {
        const status = event.target.checked;

        const newState = Storage.changeItemStatus(id, status);
        console.log(newState)
        setTodoItems(newState);
    }

    const removeTodoItem = (id) => () => {
        const newState = Storage.removeItem(id);
        setTodoItems(newState);
    }

    const removeAllTodos = (todoItem) => {
        Storage.clearStorage();
        setTodoItems([]);
    }

    return (
        <main>
            <h1 className="text-center mt-5 mb-5">TODO LIST</h1>
            <Container>
                <Row>
                    <Col xs={4}>
                        <TodoForm handleSubmit={createTodoItem} removeAll={removeAllTodos}/>
                    </Col>

                    <Col xs={8}>
                        <Row>
                            {todoItems.map(
                                ({title, description, id, completed}, index) => (
                                    <TodoItem
                                        key={index}
                                        id={id}
                                        title={title}
                                        description={description}
                                        removeItem={removeTodoItem}
                                        changeStatus={changeStatus}
                                        checked={completed}
                                    />
                                ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default TodoList;
