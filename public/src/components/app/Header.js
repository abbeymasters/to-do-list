import Component from '../Component.js';
import store from '../../services/store.js';

class Header extends Component {

    onRender(dom) {
        if(store.hasToken()) {
            const button = dom.querySelector('.log-out');
            button.classList.remove('hidden');

            button.addEventListener('click', () => {
                store.removeToken();
                location = './';
            });
        }
    }

    renderHTML() {
        return /*html*/`
        <header>
            <div id="title-images">
                <img id="title" src="/assets/tofreakindo.png">
                <img id="girl" src="/assets/girl.png">
            </div>
            <h1>Your Girl Boss To-Do List</h1>
            <p>Rackin' up those to-dos with tons more on the way? Use this to-do list tool to keep track of what's going on in your busy life.</p>
            <button class="log-out hidden">Log Out</button>
        </header>
        `;
    }
}

export default Header;