import {Button} from "react-bootstrap";

const TodoItem = (props) => {

    return (
        <div className="col-4">
            <div className="taskWrapper">
                <div className="taskHeading">{props.task.title}</div>
                <div className="taskDescription">{props.task.description}</div>
                <hr/>

                <label className="completed form-check">
                    <input type="checkbox" className="form-check-input" onChange={props.changeStatus(props.task.itemId)}
                           checked={props.task.isCompleted}/>
                    <span>Завершено ?</span>
                </label>

                <hr/>
                {/*<button className="btn btn-danger delete-btn" >Удалить*/}
                {/*</button>*/}
                <Button variant="danger" onClick={props.onRemove(props.task.itemId)}>Удалить</Button>
            </div>
        </div>
    )
}

export default TodoItem;
