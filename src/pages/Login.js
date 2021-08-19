import { useState, useContext } from "react";
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { userService } from '../utils/user.service';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authContext = useContext(AuthContext);

    const [loginSuccess, setLoginSuccess] = useState();
    const [loginError, setLoginError] = useState();
    const [loginLoading, setLoginLoading] = useState(false);
    const [redirectOnLogin, setRedirectOnLogin] = useState(false);

    const submitCredentials = async (e) => {
        e.preventDefault();

        try {
            setLoginLoading(true);
            const json = await userService.login(username, password);
            if (json.non_field_errors) {
                throw new Error(json.non_field_errors[0]);
            }
            authContext.setAuthState(json);
            setLoginSuccess(json.message);
            setLoginError('');
            setTimeout(() => {
                setRedirectOnLogin(true);
            }, 700);
        } catch (error) {
            setLoginLoading(false);
            setLoginError(error.message);
            setLoginSuccess(null);
        }
    }

    const textboxStyle = 'border-2 rounded border-indigo-600 my-1 px-1 w-full';

    return (
        <div>
            <div>
            {redirectOnLogin && <Redirect to='/home' />}
            <p className="font-bold text-indigo-600">Sign In with your credentials</p>

            <em>{ loginSuccess }</em>
            <em>{ loginError }</em>

            <form onSubmit={submitCredentials}>
                <input className={textboxStyle} type='text' onChange={(e) => setUsername(e.target.value)} value={username} name='username' placeholder='Username' required autoFocus /> <br/>
                <input className={textboxStyle} type='password' onChange={(e) => setPassword(e.target.value)} value={password} name='password' placeholder='Password' required /> <br/>

                <div className="text-right">
                    <button className="bg-white text-indigo-600 font-bold px-4 py-1 rounded border-2 border-indigo-300 hover:shadow-md" type='submit' disabled={loginLoading}>Login</button>
                </div>
            </form>
            </div>
        </div>
    );
}
