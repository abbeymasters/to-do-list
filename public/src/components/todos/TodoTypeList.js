import Component from '../Component.js';
import TodoType from '../todos/TodoType.js';

class TodoTypeList extends Component {

    onRender(list) {
        const todos = this.props.todos;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        todos.forEach(todo => {
            const todoType = new TodoType({ todo, onUpdate, onRemove });
            list.appendChild(todoType.renderDOM());
        });
    }

    renderHTML() {
        return /*html*/`
            <ul id="todo-list-items"></ul>
        `;
    }
}

export default TodoTypeList;