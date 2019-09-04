import Component from '../Component.js';

class SignUp extends Component {

    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`

            <form class="auth-form standard">
                <h2>Sign Up!</h2>
                <p>
                    <label for="name">Name:</label>
                    <input id="signup-name" name="name" required placeholder="Name">
                </p>
                <p>
                    <label for="email">Email:</label>
                    <input id="signup-email" type="email" name="email" required placeholder="youremail@gmail.com">
                </p>
                <p>
                    <label for="password">Password:</label>
                    <input id="signup-password" type="password" name="password" required>
                </p>
                <p>
                    <button class="sign-up">Sign Up</button>
                </p>
            </form>

        `;
    }
}

export default SignUp;