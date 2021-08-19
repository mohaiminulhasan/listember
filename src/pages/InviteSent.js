import { useState, useEffect } from "react";

export const InviteSent = () => {
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function checkSentInvite() {
            const uri = 'http://127.0.0.1:8000/check/sent/invite';

            let h = new Headers();
            h.append('Content-Type', 'application/json');
            h.append('Authorization', 'Token ' + localStorage.getItem('token'));

            let req = new Request(uri, {
                method: 'GET',
                headers: h,
                mode: 'cors'
            });

            const response = await fetch(req);
            const json = await response.json();

            setResult(json.result);
        }

        checkSentInvite();
    }, [])

    const submitEmail = async (e) => {
        e.preventDefault();

        const uri = 'http://127.0.0.1:8000/send/invite/';

        let h = new Headers();
        h.append('Content-Type', 'application/json');
        h.append('Authorization', 'Token ' + localStorage.getItem('token'));

        let req = new Request(uri, {
            method: 'POST',
            headers: h,
            body: JSON.stringify({
                'email': email
            }),
            mode: 'cors'
        });

        const response = await fetch(req);
        const json = await response.json();

        if (json.error === 1) {
            setError(json.result);
        } else {
            setResult(`You've invited ${email}`)
        }
    }

    const cancelInvite = async () => {
        const uri = 'http://127.0.0.1:8000/delete/invite/';

        let h = new Headers();
        h.append('Content-Type', 'application/json');
        h.append('Authorization', 'Token ' + localStorage.getItem('token'));

        let req = new Request(uri, {
            method: 'DELETE',
            headers: h,
            mode: 'cors'
        });

        const response = await fetch(req);

        if (response.status === 204) {
            setResult('not_found');
            setEmail('');
            setError('');
        }
    }

    if (result === 'not_found') {
        return (
            <div>
                <h3>Invite Partner</h3>
                <em>{error}</em>
                <form onSubmit={submitEmail}>
                    <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter email' />
                    <button type='submit'>Invite</button>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Invite Pending</h3>
                <p>{result}</p>

                <button onClick={cancelInvite}>Cancel</button>
            </div>
        );
    }
}