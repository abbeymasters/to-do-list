import Component from '../Component.js';
import Header from './Header.js';
import Footer from './Footer.js';
import TodoTypeList from '../todos/TodoTypeList.js';
import TodoForm from '../todos/TodoForm.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../../services/todos-api.js';

class TodoListApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());

        const main = dom.querySelector('main');

        const todoForm = new TodoForm({
            onAdd: todo => {
                return addTodo(todo)
                    .then(saved => {
                        const todos = this.state.todos;
                        todos.push(saved);
                        todoList.update({ todos });
                    });
            }
        });
        main.appendChild(todoForm.renderDOM());

        const todoList = new TodoTypeList({
            todos: [],
            onUpdate: todo => {
                return updateTodo(todo)
                    .then(updated => {
                        const todos = this.state.todos;

                        const index = todos.indexOf(todo);
                        todos.splice(index, 1, updated);

                        todoList.update({ todos });
                    });
            },
            onRemove: todo => {
                return removeTodo(todo.id)
                    .then(() => {
                        const todos = this.state.todos;

                        const index = todos.indexOf(todo);
                        todos.splice(index, 1);

                        todoList.update({ todos });
                    });
            }
        });
        main.appendChild(todoList.renderDOM());

        getTodos({ showAll: true })
            .then(todos => {
                this.state.todos = todos;
                todoList.update({ todos });
            })
            .catch(err => {
                // eslint-disable-next-line no-console
                console.log(err);
            });
    }

    renderHTML() {
        return /*html*/`
        <div>
            <main>
            </main>
        </div>
        `;
    }
}

export default TodoListApp;