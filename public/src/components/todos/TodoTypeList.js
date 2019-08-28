import Component from '../Component.js';
import TodoType from './TodoType.js';

class TodoTypeList extends Component {

    onRender(todoList) {
        const todos = this.props.todos;
        console.log(todos);
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        todos.forEach(todo => {
            const todoType = new TodoType({ todo, onUpdate, onRemove });
            todoList.appendChild(todoType.renderDOM());
        });
    }

    renderHTML() {
        console.log('list');
        return /*html*/`
            <ul id="todo-list-items"></ul>
        `;
    }
}

export default TodoTypeList;