import React from 'react';
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import TodoItem from "../TodoItem";
import Row from "react-bootstrap/Row";
import Storage from "../../utils/Storage";


const SingleTodo = () => {
    const {id} = useParams();

    const data = Storage.getItems().find(item => item.id === +id);

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <TodoItem
                        title={data.title}
                        description={data.description}
                    />
                </Row>
            </Container>
        </div>
    );
};

export default SingleTodo;
