import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Container from "react-bootstrap/Container";
import SingleTodoItem from "../SingleTodoItem/SingleTodoItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Storage from "../../utils/Storage";
import changeStatus from "../../utils/ChangeStatus";


const SingleTodo = () => {
    const {id} = useParams();
    const [singleItem, setSingleItem] = useState({});

    const navigate = useNavigate();

    const redirect = () => {
        navigate('/')
    }

    useEffect(() => {

        const fetchData = async () => {
            const dataFromStorage = await Storage.getItems();
            const item = dataFromStorage.find(item => item.id === +id)

            setSingleItem(item);
        }
        fetchData();
    }, [])

    const changeTodoStatus = (id) => async (event) => {

        const newState = await changeStatus(id, event)
        setSingleItem(newState[0]);
    }

    const removeTodoItem = (id) => async () => {
        await Storage.removeItem(id);
        setSingleItem({});

        redirect();
    }

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col xs={4}>
                        <SingleTodoItem
                            title={singleItem.title}
                            id={singleItem.id}
                            description={singleItem.description}
                            status={singleItem.completed}
                            changeTodoStatus={changeTodoStatus}
                            removeItem={removeTodoItem}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SingleTodo;
