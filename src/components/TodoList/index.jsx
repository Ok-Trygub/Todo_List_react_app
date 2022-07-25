import React, {useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoForm from "../TodoForm";
import TodoItem from "../TodoItem";
import Footer from "../Footer";
import Storage from "../../utils/Storage";
import withLoader from "../hoc/withLoader";
import changeStatus from "../../utils/ChangeStatus";
import Header from "../Header";
import './style.css'


const TodoList = () => {
    const [todoItems, setTodoItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        const fetchData = async () => {
            let dataFromStorage = [];

            try {
                dataFromStorage = await Storage.getItems()
            } catch (e) {
                console.log(e)
            }
            if (Array.isArray(dataFromStorage) && dataFromStorage.length) {
                setTodoItems(dataFromStorage)
            }
            setIsLoading(false);
        }
        fetchData();
    }, [])


    const createTodoItem = async (todoItem) => {
        setIsLoading(true);

        const newState = await Storage.setItem(todoItem);

        setTodoItems(newState);
        setIsLoading(false);
    }


    const changeTodoStatus = (id) => async (event) => {
        const newState = await changeStatus(id, event)
        setTodoItems(newState);
    }

    const removeTodoItem = (id) => async () => {
        const newState = await Storage.removeItem(id);
        setTodoItems(newState);
    }

    const removeAllTodos = async (todoItem) => {
        await Storage.clearStorage();
        setTodoItems([]);
    }

    const renderTodos = () => {
        return (
            <Row className='todosWrapper'>
                {todoItems.map(
                    ({title, description, id, completed}) => (
                        <Col xs={4} key={id}>
                            <TodoItem
                                id={id}
                                title={title}
                                description={description}
                                removeItem={removeTodoItem}
                                changeStatus={changeTodoStatus}
                                checked={completed}
                            />
                        </Col>
                    ))}
            </Row>
        )
    }

    const FormWithLoader = withLoader(TodoForm, isLoading);
    const TodoWithLoader = withLoader(renderTodos, isLoading);

    return (
        <>
            <Header/>
            <main>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <FormWithLoader handleSubmit={createTodoItem} removeAll={removeAllTodos}/>
                        </Col>
                        <Col xs={8}>
                            <TodoWithLoader/>
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer/>
        </>
    )
}

export default TodoList;
