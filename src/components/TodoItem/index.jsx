import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import './style.css'
import {useNavigate} from 'react-router-dom'

const TodoItem = ({title, description, id, checked, removeItem, changeStatus}) => {

    const navigate = useNavigate();

    const redirect = () => {
        navigate('todo-items/' + id)
    }

    return (
        <Col xs={4}>
            <div className="taskWrapper">
                <div className="taskHeading" onClick={redirect}>{title}</div>
                <div className="taskDescription">{description}</div>

                <hr/>
                <InputGroup className="mb-3">
                    <InputGroup.Checkbox checked={checked} onChange={changeStatus(id)}/>
                    <span>Завершено ?</span>
                </InputGroup>

                <hr/>
                <Button variant="danger" onClick={removeItem(id)}>Удалить</Button>
            </div>

        </Col>
    )
}

export default TodoItem;
