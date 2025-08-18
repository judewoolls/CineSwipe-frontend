import '../css/LoginForm.css';
import { useState } from 'react';


function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    function submit(event) {
        event.preventDefault();
        // Handle login logic here
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        console.log('Username:', username);
        console.log('Password:', password);
    }

    return <div className="login-form">
        <h1>CineSwipe</h1>
        <h2>Login</h2>
        <form onSubmit={submit}> 
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
}

export default LoginForm;