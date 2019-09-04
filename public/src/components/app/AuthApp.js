import Component from '../Component.js';
import Header from '../app/Header.js';
import Footer from '../app/Footer.js';
import SignIn from '../auth/SignIn.js';
import SignUp from '../auth/SignUp.js';
import { signUp as userSignUp, signIn as userSignIn } from '../../services/todos-api.js';
import store from '../../services/store.js';


function success(user) {
    store.setToken(user.token);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './index.html';
}

class AuthApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());

        const errors = dom.querySelector('.errors');
        const signUpContainer = dom.querySelector('#signup-container');
        const signInContainer = dom.querySelector('#signin-container');

        const signUp = new SignUp({
            onSignUp: newUser => {
                errors.textContent = '';

                return userSignUp(newUser)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        errors.textContent = err;
                    });
            }
        });
        signUpContainer.appendChild(signUp.renderDOM());

        const signIn = new SignIn({
            onSignIn: credentials => {
                errors.textContent = '';

                return userSignIn(credentials)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        errors.textContent = err;
                    });
            }
        });
        signInContainer.appendChild(signIn.renderDOM());

        const switchToSignIn = dom.querySelector('#signin-button');
        switchToSignIn.addEventListener('click', () => {
            signInContainer.classList.remove('hidden');
            signUpContainer.classList.add('hidden');
        });

        const switchToSignUp = dom.querySelector('#signup-button');
        switchToSignUp.addEventListener('click', () => {
            signUpContainer.classList.remove('hidden');
            signInContainer.classList.add('hidden');
        });

    }

    renderHTML() {
        return /*html*/`
        <div>
            <main>
            <section class="hidden" id="signup-container">
                <p class="switch">
                <button id="signin-button">Already a User?</button>
                </p>
            </section>
            <section id="signin-container">
                <p class="switch">
                <button id="signup-button">Need to create an Account?</button>
                </p>
            </section>
                <p class="errors"></p>
            </main>
        </div>
        `;
    }
}

export default AuthApp;