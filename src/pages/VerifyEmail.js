import { useState } from "react";
import { Redirect } from "react-router-dom";

export const VerifyEmail = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [verified, setVerified] = useState(false);

    const submitVerficationCode = async (e) => {
        e.preventDefault();

        const uri = 'http://127.0.0.1:8000/verify/email/';

        let h = new Headers();
        h.append('Content-Type', 'application/json')
        h.append('Authorization', `Token ${localStorage.getItem('token')}`);

        let req = new Request(uri, {
            method: 'PATCH',
            headers: h,
            body: JSON.stringify({
                code: code
            }),
            mode: 'cors'
        });

        const response = await fetch(req);
        const json = await response.json();

        if (json.result === 'OK') {
            setVerified(true);
        } else {
            setError(json.result);
        }
    }

    return (
        <>
        {verified && <Redirect to='/home'/>}

        <em>{error}</em>

        <form onSubmit={submitVerficationCode}>
            <input type='text' name='code' value={code} onChange={e => setCode(e.target.value)} placeholder='Enter code here...' />
            <button type='submit'>Verify</button>
        </form>
        </>
    );
}