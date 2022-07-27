import InputGroup from "react-bootstrap/InputGroup";

const renderCheckbox = ({checked, changeStatus, id}) => {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Checkbox checked={checked} onChange={changeStatus(id)}/>
            <span className='checkboxQuestion'>Completed?</span>
        </InputGroup>
    )
}

export default renderCheckbox;
