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

    let users = {
        friends: {
            name : 'abbey'
        },
        otherFriends: {
            name: 'josh'
        }
    };

    const expected = /*html*/`
        <ul>
        ${users.map(user => {
        console.log(return /*html*/`
        <li>${user.name}</li>
        `;   
    })})
        </ul>
    `;
    

    // act
    const todoType = new TodoType({ todo });
    const html = todoType.renderHTML();

    // assert
    assert.equal(html, expected);
});