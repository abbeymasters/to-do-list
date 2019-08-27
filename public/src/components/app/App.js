import Component from '../Component.js';
import Header from '../app/Header.js';
import Footer from '../app/Footer.js';

class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());
    }

    renderHTML() {
        return /*html*/`
        <div>
            <main></main>
        </div>
        `;
    }
}

export default App;