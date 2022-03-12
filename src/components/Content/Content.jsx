import {Route, Routes} from 'react-router-dom';
import moment from "moment";
import {v4 as uuid} from "uuid";
import {useState} from "react";
import {Note} from "./Note/Note";
import {NotFound} from "./NotFound/NotFound";
import './Content.css';
import {Home} from "./Home/Home";

const initialValue = () => {
    const value = localStorage.getItem('notes');
    return value ? JSON.parse(value) : [];
}

export const Content = () => {
    const [notes, setNotes] = useState(initialValue);

    const addNote = text => {
        const note = {
            id: uuid(),
            text: text,
            date: `${moment().format('L')} - ${moment().format('LT')}`
        }
        setNotes(prevState => [...prevState, note]);
    }

    const deleteNote = id => {
        const newNotes = [...notes];
        setNotes(newNotes.filter(notes => notes.id !== id));
    }

    return (
        <div className="content">
            <Routes>
                <Route path='/' element={
                    <Home notes={notes} addNote={text => addNote(text)} deleteNote={id => deleteNote(id)} />
                } />
                <Route path='/note/:id' element={
                    <Note notes={notes} deleteNote={id => deleteNote(id)} />
                } />
                <Route path='*' element={
                    <NotFound />
                } />
            </Routes>
        </div>
    );
}
