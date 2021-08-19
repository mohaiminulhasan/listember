import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from '../context/AuthContext';

export const TopBar = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext);

    const handleClick = e => {
        e.preventDefault();

        authContext.logout();
        history.push('/')
    }

    return (
        <div>
            <button onClick={handleClick}>Logout</button>
            <hr/>
        </div>
    );
}