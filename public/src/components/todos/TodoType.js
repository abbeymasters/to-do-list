import Component from '../Component.js';

class TodoType extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const inactivebutton = dom.querySelector('.activate-button');
        inactivebutton.addEventListener('click', () => {
            todo.inactive = !todo.inactive;
            window.location.reload();
            onUpdate(todo);
        });

        const removeButton = dom.querySelector('#x');
        removeButton.addEventListener('click', () => {
            if(confirm(`Are you sure you want to remove "${todo.name}"?`)) {
                onRemove(todo);
            }
        });
    }

    renderHTML() {
        const todo = this.props.todo;
        return /*html*/`
            <li>
                <span class="${todo.inactive ? 'inactive' : ''}">${todo.name}</span>
                <div>
                    <button class="activate-button">
                        Mark ${todo.inactive ? 'Not Complete' : 'Complete'}
                    </button>
                    <button id="x">
                        X
                    </button>
                </div>
            </li>
            `;
    }
}

export default TodoType;