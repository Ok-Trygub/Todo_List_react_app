import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Formik} from 'formik';
import * as Yup from 'yup';
import './style.css'

const formInitialValues = {
    title: '',
    description: ''
}

const TodoForm = (props) => {

    const formSubmitHandler = (values, actions) => {
        props.handleSubmit(values);
        actions.resetForm();
    }

    const validationSchema = Yup.object({
        title: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('This field is required')
            .trim(),

        description: Yup.string()
            .max(200, 'Must be 200 characters or less')
            .required('This field is required')
            .trim()
    })

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
                  handleReset,
                  touched,
                  errors
              }) => (

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="todoFormTitle">
                        <Form.Label className='fieldName' >Task title:</Form.Label>
                        <Form.Control
                            name='title'
                            type="text"
                            className='fieldInput'
                            placeholder=" "
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        {touched.title && errors.title && <p className='validationError'>{errors.title}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="todoFormDescription">
                        <Form.Label className='fieldName'>Task description:</Form.Label>
                        <Form.Control as="textarea"
                                      name='description'
                                      className='fieldInput'
                                      placeholder=" "
                                      style={{height: '200px'}}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.description}
                        />
                        {touched.description && errors.description && <p className='validationError'>{errors.description}</p>}
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <div>
                            <Button type='submit' style={{marginRight: '10px'}}>Create task</Button>
                            <Button variant="warning" type='reset' onClick={handleReset}>Clear Form</Button>
                        </div>

                        <Button variant="danger" onClick={props.removeAll}>Remove All</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
};

export default TodoForm;
