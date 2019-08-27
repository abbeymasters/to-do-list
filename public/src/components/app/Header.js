import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
        <header>
            <div id="title-images">
                <img id="title" src="/assets/tofreakindo.png">
                <img id="girl" src="/assets/girl.png">
            </div>
            <h1>Your Girl Boss To-Do List</h1>
            <p>Rackin' up those to-dos with tons more on the way? Use this to-do list tool to keep track of what's going on in your busy life.</p>
        </header>
        `;
    }
}

export default Header;