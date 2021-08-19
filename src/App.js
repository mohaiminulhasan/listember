import './App.css';

import { useContext } from 'react';
import { Login, OurList, VerifyEmail, Invite } from './pages';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

export const AuthenticatedRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route {...rest} render={() => 
      authContext.isAuthenticated() ? (
        children
      ) : (
        <Redirect to="/" />
      )
    } />
  );
}

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login/>
      </Route>
      <AuthenticatedRoute path="/home">
        <OurList/>
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/verify/email">
        <VerifyEmail/>
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/invite">
        <Invite/>
      </AuthenticatedRoute>
    </Switch>
  );
}

export default App;
