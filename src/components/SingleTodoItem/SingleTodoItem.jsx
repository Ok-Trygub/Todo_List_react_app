import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';


const SingleTodoItem = ({title, description, id, status, removeItem, changeTodoStatus}) => {

    return (
        <div className="taskWrapper">
            <div className="taskHeading">{title}</div>
            <div className="taskDescription">{description}</div>

            <hr/>
            <InputGroup className="mb-3">
                <InputGroup.Checkbox onChange={changeTodoStatus(id)} checked={status}/>
                <span>Завершено ?</span>
            </InputGroup>

            <hr/>
            <Button variant="danger" onClick={removeItem(id)}>Удалить</Button>
        </div>
    )
}

export default SingleTodoItem;
