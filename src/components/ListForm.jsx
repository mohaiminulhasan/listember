import { useState } from "react";

export const ListForm = ({ addItem }) => {
    const [text, setText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        
        console.log(text);
        addItem(text);
        setText('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' name='newListItem' value={text} onChange={e => setText(e.target.value)} required />
            <button type='submit'>Submit</button>
        </form>
    );
}