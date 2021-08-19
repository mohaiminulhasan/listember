import { useRouteMatch, Link, Route, Switch } from "react-router-dom";
import { InviteSent, InviteReceived } from './index';
import { TopBar } from '../components';

export const Invite = () => {
    let { path, url } = useRouteMatch();

    return (
        <>
        <TopBar/>

        <Link to={`${url}/sent`}>Sent Invite</Link>
        <Link to={`${url}/received`}>Received Invites</Link>

        <Switch>
            <Route path={`${path}/sent`}>
                <InviteSent/>
            </Route>
            <Route path={`${path}/received`}>
                <InviteReceived/>
            </Route>
        </Switch>
        </>
    );
}