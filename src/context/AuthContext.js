import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');
    const userInfo = localStorage.getItem('userInfo');
    // console.log(token, expiresAt, userInfo);

    const [authState, setAuthState] = useState({
                token,
                expiresAt,
                userInfo: userInfo ? JSON.parse(userInfo) : {}
            })
    
    const setAuthInfo = ({ token, expiresAt, userInfo }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('expiresAt', expiresAt);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        setAuthState({
            token,
            expiresAt,
            userInfo
        });
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('expiresAt');

        setAuthState({
            token: null,
            expiresAt: null,
            userInfo: {}
        })

        history.push('/');
    }

    const isAuthenticated = () => {
        if (!authState.token || !authState.expiresAt) {
            return false;
        }
        console.log('expires at:', authState.expiresAt);

        return new Date().getTime() / 1000 < authState.expiresAt;
    }

    return (
        <Provider value={{
            isAuthenticated,
            authState,
            setAuthState: authInfo => setAuthInfo(authInfo),
            logout
        }}>
            { children }
        </Provider>
    );
}

export { AuthContext, AuthProvider };