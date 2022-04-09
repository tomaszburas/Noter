import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import format from 'date-fns/format';
import { Note } from './Note/Note';
import { NotFound } from './NotFound/NotFound';
import { NotesPage } from './NotesPage/NotesPage';
import { SignIn } from './Access/SignIn/SignIn';
import { SignUp } from './Access/SignUp/SignUp';
import { Home } from './Home/Home';
import styles from './Content.module.css';
import { NotesEntity } from 'types';
import { ProtectedRoute } from '../Common/ProtectedRoute/ProtectedRoute';

interface Props {
    isAuth: boolean | null;
    setIsAuth: (value: boolean | null) => void;
}

export const Content = (props: Props) => {
    const [notes, setNotes] = useState<NotesEntity[] | []>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/notes');

            const data = await res.json();

            if (data.success && data.notes.length) {
                const newNotes = data.notes.map((note: NotesEntity) => ({
                    ...note,
                    date: `${format(
                        new Date(note.createdAt),
                        'd.MM.yyyy'
                    )} - ${format(new Date(note.createdAt), 'hh:mm')}`,
                }));

                setNotes(newNotes);
            }
        })();
    }, [props.isAuth]);

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

        const newNote = {
            ...data.noteObj,
            date: `${format(
                new Date(data.noteObj.createdAt),
                'd.MM.yyyy'
            )} - ${format(new Date(data.noteObj.createdAt), 'hh:mm')}`,
        };

        setNotes((prevState) => [newNote, ...prevState]);
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

    return (
        <div className={styles.content}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute
                            authorization={true}
                            isAuth={props.isAuth}
                            setIsAuth={props.setIsAuth}>
                            <NotesPage
                                notes={notes}
                                setNotes={setNotes}
                                addNote={addNote}
                                deleteNote={deleteNote}
                                editNote={editNote}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notes/:id"
                    element={
                        <ProtectedRoute
                            authorization={true}
                            isAuth={props.isAuth}
                            setIsAuth={props.setIsAuth}>
                            <Note
                                notes={notes}
                                deleteNote={deleteNote}
                                editNote={editNote}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <ProtectedRoute
                            authorization={false}
                            isAuth={props.isAuth}
                            setIsAuth={props.setIsAuth}>
                            <SignIn setIsAuth={props.setIsAuth} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <ProtectedRoute
                            authorization={false}
                            isAuth={props.isAuth}
                            setIsAuth={props.setIsAuth}>
                            <SignUp />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};
