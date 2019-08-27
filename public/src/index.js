import TodoListApp from './components/app/TodoListApp.js';

const listApp = new TodoListApp();
document.body.prepend(listApp.renderDOM());
