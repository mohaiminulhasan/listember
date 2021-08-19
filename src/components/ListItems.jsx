import { useEffect } from "react";

import { ListItem } from '../components';

export const ListItems = ({ items, setItems }) => {

    useEffect(() => {
        async function initCheck() {
            const uri = 'http://127.0.0.1:8000/list/items/';

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

            setItems(json);
        }

        initCheck();
    }, [])

    const result = items.map(item => <ListItem key={item.id} item={item} setItems={setItems} data={items} />);

    return (
        <>
        {result}
        </>
    );
}