import { useEffect, useState } from "react";

export const InviteReceived = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadInvites() {
            const uri = 'http://127.0.0.1:8000/received/invites';

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

            setData(json);
        }

        loadInvites();
    }, [])

    const handleAccept = (id, sender_id) => {
        async function acceptInvite() {
            const uri = 'http://127.0.0.1:8000/accept/invite/';

            let h = new Headers();
            h.append('Content-Type', 'application/json');
            h.append('Authorization', 'Token ' + localStorage.getItem('token'));

            let req = new Request(uri, {
                method: 'POST',
                headers: h,
                body: JSON.stringify({
                    'sender_id': sender_id
                }),
                mode: 'cors'
            });

            const response = await fetch(req);
            const json = await response.json();

            if (json.result === 'OK') {
                const newData = data.filter(x => x.id !== id)
                setData(newData);
            }
        }

        acceptInvite();
    }

    const handleReject = (id, sender_id ) => {
        async function rejectInvite() {
            const uri = 'http://127.0.0.1:8000/reject/invite/';

            let h = new Headers();
            h.append('Content-Type', 'application/json');
            h.append('Authorization', 'Token ' + localStorage.getItem('token'));

            let req = new Request(uri, {
                method: 'DELETE',
                headers: h,
                body: JSON.stringify({
                    'sender_id': sender_id
                }),
                mode: 'cors'
            });

            const response = await fetch(req);

            if (response.status === 204) {
                const newData = data.filter(x => x.id !== id)
                setData(newData);
            }
        }

        rejectInvite();
    }

    let output = data.map(item => {
        return (
            <p key={item.id}>
                {item.sender.username} &nbsp;
                <button onClick={e => handleAccept(item.id, item.sender.id, e)}>Accept</button>
                <button onClick={e => handleReject(item.id, item.sender.id, e)}>Reject</button>
            </p>
        );
    });

    return (
        <>
        <h3>Received Invites</h3>
        {output}
        </> 
    );
}