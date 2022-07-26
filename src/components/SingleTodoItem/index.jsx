import Button from "react-bootstrap/Button";
import EditButton from "./EditButton";
import InputGroup from 'react-bootstrap/InputGroup';
import './style.css';
import React, {useState} from 'react';
import SaveButton from "./saveButton";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Form from "react-bootstrap/Form";

import Storage from "../../utils/Storage";


const SingleTodoItem = ({title, description, id, status, removeItem, changeTodoStatus, inputHandler}) => {

    // const [editInput, setInput] = useState({
    //     editTitle: false,
    //     editDescription: false
    // });


    const formSubmitHandler = (values) => {
        let newValue = values;

        console.log(values)

        inputHandler(values)



        Storage.changeItemData(newValue, id);
        //
        // const newState = {...editInput}
        // newState[title] = !editInput[title]
    }





    // const isEdit = (inputName) => () => {
    //     console.log(editInput)
    //
    //     const newState = {...editInput}
    //     newState[inputName] = !editInput[inputName]
    //
    //     setInput(newState)
    // }

    const validationSchema = Yup.object({
        title: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('This field is required')
            .trim(),

        // description: Yup.string()
        //     .max(200, 'Must be 200 characters or less')
        //     .required('This field is required')
        //     .trim()
    })


    const renderTitle = () => {
        return (
            <div className="taskHeading inputWrapper">{title}
                <div>
                    <button className='editBtn' onClick={isEdit('title')}>
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
        return (

            <Formik
                initialValues={formInitialValues}
                onSubmit={formSubmitHandler}
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
                        <Form.Group className="mb-3 d-flex justify-content-between align-items-center"
                                    controlId="todoFormDescription">
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
                                <button type='submit' className='editBtn' onClick={isEdit('title')}>
                                    <SaveButton/>
                                </button>
                            </div>
                            {touched.title && errors.title && <p className='validationError'>{errors.title}</p>}
                        </Form.Group>
                    </Form>
                )}
            </Formik>


        )
    }

    // const renderDescription = () => {
    //     return (
    //         <div className="taskDescription inputWrapper">{description}
    //             <div>
    //                 <button className='editBtn' onClick={isEdit('description')}>
    //                     <EditButton/>
    //                 </button>
    //             </div>
    //         </div>
    //     )
    // }
    //
    // const renderEditDescription = () => {
    //     return (
    //         <div className="taskDescription inputWrapper">
    //                   <textarea
    //                       type="text"
    //                       className='editDescription'
    //                       value={inputData['description']}
    //                       onChange={editTodoData('description')}
    //                   />
    //             <div>
    //                 <button className='editBtn' onClick={isEdit('description')}>
    //                     <SaveButton/>
    //                 </button>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="taskWrapper">

       renderTitle()
            {editInput.description ? renderEditDescription() : renderDescription()}

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









// const SingleTodoItem = ({title, description, id, status, removeItem, changeTodoStatus, inputHandler}) => {
//     const [editInput, setInput] = useState({
//         title: false,
//         description: false
//     });
//     const [inputData, setInputData] = useState('');
//
//
//     const editTodoData = inputName => ({target}) => {
//         let newValue = target.value;
//         setInputData(newValue);
//
//         inputHandler(inputName, newValue)
//     }
//
//     const isEdit = (inputName) => () => {
//         const newState = {...editInput}
//         newState[inputName] = !editInput[inputName]
//
//         setInput(newState)
//     }
//
//
//     const renderTitle = () => {
//         return (
//             <div className="taskHeading inputWrapper">{title}
//                 <div>
//                     <button className='editBtn' onClick={isEdit('title')}>
//                         <EditButton color='white'/>
//                     </button>
//                 </div>
//             </div>
//         )
//     }
//
//     const renderEditTitle = () => {
//         return (
//             <div className='d-flex justify-content-between align-items-center'>
//                 <div className="taskHeading inputWrapper w-100">
//                 <textarea
//                     type="text"
//                     value={inputData['title']}
//                     className='editTitle'
//                     onChange={editTodoData('title')}
//                 />
//                 </div>
//
//                 <div>
//                     <button className='editBtn' onClick={isEdit('title')}>
//                         <SaveButton/>
//                     </button>
//                 </div>
//             </div>
//         )
//     }
//
//     const renderDescription = () => {
//         return (
//             <div className="taskDescription inputWrapper">{description}
//                 <div>
//                     <button className='editBtn' onClick={isEdit('description')}>
//                         <EditButton/>
//                     </button>
//                 </div>
//             </div>
//         )
//     }
//
//     const renderEditDescription = () => {
//         return (
//             <div className="taskDescription inputWrapper">
//                       <textarea
//                           type="text"
//                           className='editDescription'
//                           value={inputData['description']}
//                           onChange={editTodoData('description')}
//                       />
//                 <div>
//                     <button className='editBtn' onClick={isEdit('description')}>
//                         <SaveButton/>
//                     </button>
//                 </div>
//             </div>
//         )
//     }
//
//     return (
//         <div className="taskWrapper">
//
//             {editInput.title ? renderEditTitle() : renderTitle()}
//             {editInput.description ? renderEditDescription() : renderDescription()}
//
//             <hr/>
//             <InputGroup className="mb-3">
//                 <InputGroup.Checkbox onChange={changeTodoStatus(id)} checked={status}/>
//
//                 <span className='checkboxQuestion'>Completed?</span>
//             </InputGroup>
//
//             <hr/>
//             <Button variant="danger" onClick={removeItem(id)}>Remove</Button>
//         </div>
//     )
// }
//
// export default SingleTodoItem;
