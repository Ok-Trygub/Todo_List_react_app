import Storage from "./Storage";

const changeStatus = async (id, event) => {
    const target = event.target;

    const status = target.type === 'checkbox' ? target.checked : target.value;
    const newState = await Storage.changeItemStatus(id, status);

    return newState
}

export default changeStatus;
