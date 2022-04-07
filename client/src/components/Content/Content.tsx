import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Note } from './Note/Note';
import { NotFound } from './NotFound/NotFound';
import { NotesPage } from './NotesPage/NotesPage';
import { SignIn } from './Access/SignIn/SignIn';
import { SignUp } from './Access/SignUp/SignUp';
import { Home } from './Home/Home';
import styles from './Content.module.css';
import { NoteRecordEntity } from 'types';
import { Loader } from '../Common/Loader/Loader';

interface Props {
    auth: boolean;
    setAuth: (value: boolean) => void;
}

export const Content = (props: Props) => {
    const [notes, setNotes] = useState<NoteRecordEntity[] | []>([]);
    const [checkAuth, setCheckAuth] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/notes');

            res.status === 401 ? props.setAuth(false) : props.setAuth(true);
            setCheckAuth(true);

            const data = await res.json();

            if (data.notes.length) {
                data.notes.map(
                    (note: NoteRecordEntity) =>
                        (note.date = `${moment(note.createdAt).format(
                            'L'
                        )} - ${moment(note.createdAt).format('LT')}`)
                );
            }

            setNotes(data.notes);
        })();
    }, [props.auth]);

    const addNote = async (text: string) => {
        const note = { text };

        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });

        const data = await res.json();
        data.noteObj.date = `${moment(data.createdAt).format('L')} - ${moment(
            data.createdAt
        ).format('LT')}`;

        setNotes((prevState) => [data.noteObj, ...prevState]);
    };

    const deleteNote = async (id: string) => {
        setNotes((prevState) => prevState.filter((notes) => notes.id !== id));

        await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        });
    };

    const editNote = async (id: string, text: string) => {
        const newNotes = notes.map((note) => {
            if (note.id === id) {
                note.text = text;
                return note;
            } else {
                return note;
            }
        });
        setNotes(newNotes);

        await fetch(`/api/notes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, text }),
        });
    };

    if (!checkAuth) return <Loader />;

    return (
        <div className={styles.content}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/notes"
                    element={
                        <NotesPage
                            notes={notes}
                            setNotes={setNotes}
                            addNote={addNote}
                            deleteNote={deleteNote}
                            editNote={editNote}
                            auth={props.auth}
                        />
                    }
                />
                <Route
                    path="/notes/:id"
                    element={
                        <Note
                            notes={notes}
                            deleteNote={deleteNote}
                            editNote={editNote}
                            auth={props.auth}
                        />
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <SignIn auth={props.auth} setAuth={props.setAuth} />
                    }
                />
                <Route path="/sign-up" element={<SignUp auth={props.auth} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};
