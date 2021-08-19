export const ListItem = ({ item, setItems, data }) => {
    const handleDelete = () => {
        async function deleteItem() {
            const uri = 'http://127.0.0.1:8000/delete/listitem/' + item.id + '/';

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
                const newData = data.filter(x => x.id !== item.id)
                setItems(newData)
            }
        }

        deleteItem();
    }

    return (
        <div>
            <span>{ item.text }</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}