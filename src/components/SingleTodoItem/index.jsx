import Button from "react-bootstrap/Button";
import EditButton from "./EditButton";
import InputGroup from 'react-bootstrap/InputGroup';
import './style.css';
import React, {useState} from 'react';
import SaveButton from "./saveButton";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Form from "react-bootstrap/Form";


const SingleTodoItem = ({title, description, id, status, removeItem, changeTodoStatus, inputHandler}) => {

    const [editInput, setInput] = useState({
        editTitle: false,
        editDescription: false
    });


    const formSubmitHandler = (inputName) => (values) => {
        inputHandler(inputName, values)

        const newState = {...editInput}

        if (inputName === 'title') newState.editTitle = !editInput.editTitle;
        else newState.editDescription = !editInput.editDescription;

        setInput(newState)
    }


    const isEdit = (inputName) => () => {

        const newState = {...editInput}
        newState[inputName] = !editInput[inputName]

        setInput(newState)
    }


    const renderTitle = () => {
        return (
            <div className="taskHeading inputWrapper">{title}
                <div>
                    <button className='editBtn' onClick={isEdit('editTitle')}>
                        <EditButton color='white'/>
                    </button>
                </div>
            </div>
        )
    }


    const renderEditTitle = () => {

        const formInitialValues = {
            title: title,
        }

        const validationSchema = Yup.object({
        title: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('This field is required')
            .trim(),
        })
        return (
            <Formik
                initialValues={formInitialValues}
                onSubmit={formSubmitHandler('title')}
                validationSchema={validationSchema}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      touched,
                      errors
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3"
                                    controlId="todoFormDescription">
                            <div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='taskHeading inputWrapper w-100'>
                                        <Form.Control as="textarea"
                                                      name='title'
                                                      className='editTitle editTodoTitle'
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.title}
                                        />
                                    </div>

                                    <div>
                                        <button type='submit' className='editBtn'>
                                            <SaveButton/>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    {touched.title && errors.title && <p className='validationError'>{errors.title}</p>}
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        )
    }


    const renderDescription = () => {
        return (
            <div className="taskDescription inputWrapper">{description}
                <div>
                    <button className='editBtn' onClick={isEdit('editDescription')}>
                        <EditButton/>
                    </button>
                </div>
            </div>
        )
    }

    const renderEditDescription = () => {
        const formInitialValues = {
            description: description
        }

        const validationSchema = Yup.object({
            description: Yup.string()
                .max(200, 'Must be 200 characters or less')
                .required('This field is required')
                .trim()
        })
        return (
            <Formik
                initialValues={formInitialValues}
                onSubmit={formSubmitHandler('description')}
                validationSchema={validationSchema}
            >
                 {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      touched,
                      errors
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3"
                                    controlId="todoFormDescription">

                            <div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className="taskDescription inputWrapper">
                                        <Form.Control as="textarea"
                                                      name='description'
                                                      className='editTodoDescription'
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.description}
                                        />
                                    </div>

                                    <div>
                                        <button type='submit' className='editBtn'>
                                            <SaveButton/>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    {touched.description && errors.description &&
                                        <p className='validationError'>{errors.description}</p>}
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        )
    }


    return (
        <div className="taskWrapper">

            {editInput.editTitle ? renderEditTitle() : renderTitle()}
            {editInput.editDescription ? renderEditDescription() : renderDescription()}

            <hr/>
            <InputGroup className="mb-3">
                <InputGroup.Checkbox onChange={changeTodoStatus(id)} checked={status}/>

                <span className='checkboxQuestion'>Completed?</span>
            </InputGroup>

            <hr/>
            <Button variant="danger" onClick={removeItem(id)}>Remove</Button>
        </div>
    )
}

export default SingleTodoItem;
