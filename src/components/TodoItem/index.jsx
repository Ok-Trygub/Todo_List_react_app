import Button from "react-bootstrap/Button";
import renderCheckbox from "./renderCheckbox";
import './style.css'
import {useNavigate} from 'react-router-dom'
import withLoader from "../../hoc/withLoader";

const TodoItem = ({title, description, id, checked, removeItem, changeStatus, isLoading}) => {

    const navigate = useNavigate();

    const redirect = () => {
        navigate('todo-items/' + id)
    }

    const StatusWithLoader = withLoader(renderCheckbox, isLoading);

    return (
        <div className="taskWrapper">
            <div className="taskHeading taskTitle" onClick={redirect}>{title}</div>
            <div className="taskDescription">{description}</div>

            <hr/>
            <StatusWithLoader checked={checked} id={id} changeStatus={changeStatus}/>
            <hr/>
            <Button variant="danger" onClick={removeItem(id)}>Remove</Button>
        </div>
    )
}

export default TodoItem;
