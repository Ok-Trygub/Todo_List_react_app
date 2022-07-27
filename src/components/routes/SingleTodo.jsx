import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Header from "../Header";
import Footer from "../Footer";
import SingleTodoItem from "../SingleTodoItem";
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


    const editTodo = async (inputName, newValue) => {

        const localInput = {...singleItem};

        localInput[inputName] = newValue[inputName];
        setSingleItem(localInput);

        await Storage.changeItemData(localInput);
    }


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
        <>
            <Header redirect={redirect}/>
            <main>
                <Container>
                    <Row className='d-flex justify-content-center'>
                        <h1
                            style={{
                                color: 'white',
                                marginBottom: '24px',
                                textAlign: 'center'
                            }}
                        >Task №{singleItem.id}:</h1>
                        <Col xs={4}>
                            <SingleTodoItem
                                title={singleItem.title}
                                id={singleItem.id}
                                description={singleItem.description}
                                status={singleItem.completed}
                                changeTodoStatus={changeTodoStatus}
                                removeItem={removeTodoItem}
                                inputHandler={editTodo}
                            />
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer/>
        </>
    );
};

export default SingleTodo;
