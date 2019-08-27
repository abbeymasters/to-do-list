import Component from '../Component.js';

class TodoForm extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=type]');
        const error = dom.querySelector('p.error');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const todoType = {
                name: input.value
            };

            error.textContent = '';

            onAdd(todoType)
                .then(() => {
                    form.reset();
                    document.activeElement.blur();
                })
                .catch(err => {
                    error.textContent = err;
                });
        });
    }


    renderHTML() {
        return /*html*/`
        <section class="form-section">
            <form class="to-do-form">
                <div id="button-area">
                    <input name="to-do-input" required>
                    <button>Add To-Do</button>
                </div>
            </form>
            <p class="error"></p>
        </section>
        `;
    }
}

export default TodoForm;