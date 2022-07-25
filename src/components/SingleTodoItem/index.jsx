import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';


const SingleTodoItem = ({title, description, id, status, removeItem, changeTodoStatus}) => {

    return (
        <div className="taskWrapper">
            <div className="taskHeading gold">{title}</div>
            <div className="taskDescription">{description}</div>

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
