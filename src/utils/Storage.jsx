import React from "react";

class Storage extends React.Component {
    #dbName = 'todoForm';
    id = 1;
    delay = 1200;

    constructor(props) {
        super(props);

        try {
            this.#getId();
        } catch (e) {
            console.log(e)
        }
    }

    async #getId() {
        try {
            const data = await this.getItems();
            if (!data) return;

            this.id = data.at(0).id + 1;
        } catch (e) {
            console.log(e);
        }
    }

    getCurrentItem(id, todos) {
        const todoItem = todos.findIndex(todoItem => {
            return todoItem.id === id
        })
        return todoItem;
    }

    getItems() {
        return new Promise(resolve => {
            setTimeout(
                () => {
                    resolve(
                        JSON.parse(localStorage.getItem(this.#dbName))
                    )
                }, this.delay
            )
        })
    }

    async setItem(todoItem) {
        const localTodoItem = {...todoItem};

        if (typeof localTodoItem !== 'object') throw new Error('should be an object data type!');

        const existingItems = await this.getItems();

        const dataToSave = existingItems ? existingItems : [];

        const currentTodo = {
            id: this.id,
            completed: false,
            ...localTodoItem
        }

        dataToSave.unshift(currentTodo);

        await this.saveData(dataToSave);

        this.id += 1;

        return dataToSave;
    }

    async saveData(todoArr) {
        await localStorage.setItem(
            this.#dbName,
            JSON.stringify(
                todoArr)
        );
    }

    async changeItemStatus(id, status) {
        const data = await this.getItems();

        let todosArr = [...data];

        const currentItem = this.getCurrentItem(id, data)
        todosArr[currentItem].completed = status;

       await this.saveData(todosArr);
        return todosArr;
    }


    async changeItemData(todoItem) {
        const data = await this.getItems();

        let todosArr = [...data];
        const currentItem = this.getCurrentItem(todoItem.id, data)

        todosArr[currentItem].title = todoItem.title;
        todosArr[currentItem].description = todoItem.description;

        await this.saveData(todosArr);
        return todosArr;
    }


    async removeItem(id) {
        const data = await this.getItems();

        let todosArr = [...data];

        const currentItemIndex = todosArr.findIndex(todoItem => {
            return todoItem.id === id
        });

        todosArr.splice(currentItemIndex, 1);
        await this.saveData(todosArr);

        return todosArr;
    }

   async clearStorage() {
        await localStorage.removeItem(this.#dbName);
        this.id = 1;
    }
}

export default new Storage();
