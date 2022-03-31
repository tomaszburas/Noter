import {Route, Routes} from 'react-router-dom';
import {useEffect, useState} from "react";
import moment from "moment";

import {Note} from "./Note/Note";
import {NotFound} from "./NotFound/NotFound";
import './Content.css';
import {NotesApp} from "./NotesApp/NotesApp";
import {SignIn} from "./Access/SignIn/SignIn";
import {SignUp} from "./Access/SignUp/SignUp";
import {Home} from "./Home/Home";

export const Content = props => {
    const [notes, setNotes] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        (async() => {
            const res = await fetch('/notes', {
                method: 'GET',
                headers: {'Authorization': token}
            })

            res.status === 401 ? props.setAuth(false) : props.setAuth(true);

            const data = await res.json();

            if (data.notes.length) {
                data.notes.map(note => note.date = `${moment(note.createdAt).format('L')} - ${moment(note.createdAt).format('LT')}`);
            }

            setNotes(data.notes);
        })()
    },[props.auth])

    const addNote = async (text) => {
        const note = {
            note: text,
        }

        const res = await fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(note)
        })

        const data = await res.json();
        data.noteObj.date = `${moment(data.createdAt).format('L')} - ${moment(data.createdAt).format('LT')}`;

        setNotes(prevState => ([data.noteObj, ...prevState]));
    }

    const deleteNote = async (id) => {
        setNotes(prevState => prevState.filter(notes => notes.id !== id));

        await fetch(`/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
            }
        })
    }

    const editNote = async (id, text) => {

        const newNotes = notes.map(note => {
            if (note.id === id) {
                note.note = text;
                return note;
            } else {
                return note
            }
        });
        setNotes(newNotes);

        await fetch(`/notes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({id, note: text})
        })
    }

    return (
        <div className="content">
            <Routes>
                <Route path='/' element={
                    <Home />
                } />
                <Route path='/notes' element={
                    <NotesApp notes={notes}
                              addNote={addNote}
                              deleteNote={deleteNote}
                              editNote={editNote}
                              auth={props.auth}
                    />
                } />
                <Route path='/sign-in' element={
                    <SignIn auth={props.auth} setAuth={props.setAuth} />
                } />
                <Route path='/sign-up' element={
                    <SignUp auth={props.auth} />
                } />
                <Route path='/notes/:id' element={
                    <Note notes={notes}
                          deleteNote={deleteNote}
                          editNote={editNote}
                          auth={props.auth}
                          token={token}
                    />
                } />
                <Route path='*' element={
                    <NotFound />
                } />
            </Routes>
        </div>
    );
}
