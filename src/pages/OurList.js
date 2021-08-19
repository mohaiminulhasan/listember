import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom";
import { TopBar, ListForm, ListItems } from '../components';

export const OurList = () => {
    const [redirectOnCheck, setRedirectOnCheck] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function initCheck() {
            const uri = 'http://127.0.0.1:8000/init/';

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

            setRedirectOnCheck(json.result);
        }

        initCheck();
    }, [])

    const addItem = (text) => {        
        async function createItem() {
            const uri = 'http://127.0.0.1:8000/add/item/';

            let h = new Headers();
            h.append('Content-Type', 'application/json');
            h.append('Authorization', 'Token ' + localStorage.getItem('token'));

            let req = new Request(uri, {
                method: 'POST',
                headers: h,
                body: JSON.stringify({
                    'text': text
                }),
                mode: 'cors'
            });

            const response = await fetch(req);
            const json = await response.json();

            setItems([...items, json]);
        }

        createItem();
    }

    return (
        <>
        {redirectOnCheck === 'verify_email' && <Redirect to='/verify/email' />}
        {redirectOnCheck === 'invite' && <Redirect to='/invite' />}

        <TopBar/>

        <ListForm addItem={addItem}/>

        <ListItems items={items} setItems={setItems}/>

        {console.log(redirectOnCheck)}
        </>
    )
}