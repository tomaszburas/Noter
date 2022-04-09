import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavNote } from './NavNote/NavNote';
import { EditNote } from './EditNote/EditNote';
import styles from './Note.module.css';
import { NotesEntity } from 'types';
import { Loader } from '../../Common/Loader/Loader';
import format from 'date-fns/format';

interface Props {
    notes: NotesEntity[] | [];
    deleteNote: (id: string) => void;
    editNote: (id: string, text: string) => void;
}

export const Note = (props: Props) => {
    const [edit, setEdit] = useState(false);
    const [note, setNote] = useState<NotesEntity | null>(null);
    const [checkNote, setCheckNote] = useState(false);
    const [noteText, setNoteText] = useState('');

    const id = useParams().id as string;

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/notes/${id}`);

            const data = await res.json();

            setCheckNote(true);
            if (data.success) {
                const newNote = {
                    ...data.note,
                    date: `${format(
                        new Date(data.note.createdAt),
                        'd.MM.yyyy'
                    )} - ${format(new Date(data.note.createdAt), 'hh:mm')}`,
                };

                setNote(newNote);
                setNoteText(data.note.text);
            }
        })();
    }, [id]);

    if (!checkNote) {
        return <Loader />;
    }

    return (
        <>
            {note ? (
                <>
                    <NavNote
                        noteId={id}
                        setEdit={setEdit}
                        deleteNote={props.deleteNote}
                    />
                    <div className={styles.noteContainer}>
                        <p>Note</p>
                        <div className={styles.noteContent}>
                            {!edit ? (
                                <>
                                    <ReactMarkdown>{noteText}</ReactMarkdown>
                                    <p className={styles.noteDate}>
                                        {note.date}
                                    </p>
                                </>
                            ) : (
                                <EditNote
                                    noteId={id}
                                    noteDate={note.date}
                                    noteText={noteText}
                                    setNoteText={setNoteText}
                                    setEdit={setEdit}
                                    editNote={props.editNote}
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Link className={styles.link} to="/notes">
                        <span className={styles.backBtn} title="Go back">
                            Go Back
                        </span>
                    </Link>
                    <div className={styles.noteContainer}>
                        <p className={styles.noteBoxText}>
                            There is no such note
                        </p>
                    </div>
                </>
            )}
        </>
    );
};
