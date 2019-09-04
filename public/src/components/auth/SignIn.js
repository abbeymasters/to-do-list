import Component from '../Component.js';

class SignIn extends Component {

    onRender(form) {
        const onSignIn = this.props.onSignIn;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const credentials = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            onSignIn(credentials);
        });
    }

    renderHTML() {
        return /*html*/`

            <form class="auth-form standard">
                <h2>Sign In!</h2>
                <p>
                    <label for="name">Name:</label>
                    <input id="name" name="name" required placeholder="Name">
                </p>
                <p>
                    <label for="email">Email:</label>
                    <input id="email" type="email" name="email" required placeholder="youremail@gmail.com">
                </p>
                <p>
                    <label for="password">Password:</label>
                    <input id="password" type="password" name="password" required>
                </p>
                <p>
                    <button class="sign-up">Sign In</button>
                </p>
            </form>

        `;
    }
}

export default SignIn;