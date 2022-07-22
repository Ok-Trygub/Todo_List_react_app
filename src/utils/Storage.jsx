import React from "react";

class Storage extends React.Component {
    #dbName = 'todoForm';
    id = 1;

    constructor(props) {
        super(props);
        this.#getId();
    }

    #getId() {
        const data = this.getItems();
        if (!data) return;

        this.id = this.getItems().at(0).id + 1;
    }

    getCurrentItem(id, todos) {
        const todoItem = todos.findIndex(todoItem => {
            return todoItem.id === id
        })
        return todoItem;
    }

    getItems() {
        return JSON.parse(localStorage.getItem(this.#dbName));
    }

    setItem(todoItem) {
        const localTodoItem = {...todoItem};

        if (typeof localTodoItem !== 'object') throw new Error('should be an object data type!');

        const existingItems = this.getItems();

        const dataToSave = existingItems ? existingItems : [];

        const currentTodo = {
            id: this.id,
            completed: false,
            ...localTodoItem
        }

        dataToSave.unshift(currentTodo);

        this.saveData(dataToSave);

        this.id += 1;

        return dataToSave;
    }

    saveData(todoArr) {
        localStorage.setItem(
            this.#dbName,
            JSON.stringify(
                todoArr)
        );
    }

    changeItemStatus(id, status) {
        const data = this.getItems();

        let todosArr = [...data];

        const currentItem = this.getCurrentItem(id, data)

        todosArr[currentItem].completed = status;
        console.log(todosArr[currentItem])

        this.saveData(todosArr);
        return todosArr;
    }

    removeItem(id) {
        const data = this.getItems();
        console.log(data)

        let todosArr = [...data];

        const currentItemIndex = todosArr.findIndex(todoItem => {
            return todoItem.id === id
        });

        todosArr.splice(currentItemIndex, 1);

        this.saveData(todosArr);

        return todosArr;
    }


    clearStorage() {
        localStorage.clear();
        this.id = 1;
    }
}

export default new Storage();
