import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Formik,} from 'formik';
import Storage from "../utils/Storage";

const formInitialValues = {
    title: '',
    description: ''
}

const TodoForm = (props) => {

    const formSubmitHandler = (values, actions) => {
        props.handleSubmit(values);
        actions.resetForm();
    }

    return (
        <Formik
            initialValues={formInitialValues}
            onSubmit={formSubmitHandler}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
              }) => (

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="todoFormTitle">
                        <Form.Label>Task title</Form.Label>
                        <Form.Control
                            name='title'
                            type="text"
                            placeholder="Title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="todoFormDescription">
                        <Form.Label>Task description</Form.Label>
                        <Form.Control as="textarea"
                                      name='description'
                                      placeholder="Task description"
                                      style={{height: '200px'}}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.description}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <div>
                            <Button type='submit' style={{marginRight: '10px'}}>Create Task!</Button>
                            <Button variant="warning" type='reset' onClick={handleReset}>Очистить</Button>
                        </div>

                        <Button variant="danger" onClick={props.removeAll}>Удалить все</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default TodoForm;
