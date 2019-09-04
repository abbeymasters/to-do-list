import TodoType from '../src/components/todos/TodoType.js';

const test = QUnit.test;

QUnit.module('Todo Type');

test('todo to render', assert => {
    // arrange
    
    const todo = {
        id: 2,
        name: 'Dishes',
        inactive: false
    };

    const expected = /*html*/`
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

    // act
    const todoType = new TodoType({ todo });
    const html = todoType.renderHTML();

    // assert
    assert.equal(html, expected);
});