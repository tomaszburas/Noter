import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavNote } from './NavNote/NavNote';
import { EditNote } from './EditNote/EditNote';
import styles from './Note.module.css';
import { NoteRecordEntity } from 'types';
import { Loader } from '../../Common/Loader/Loader';

interface Props {
    notes: NoteRecordEntity[] | [];
    deleteNote: (id: string) => void;
    editNote: (id: string, text: string) => void;
    auth: boolean;
}

export const Note = (props: Props) => {
    const [edit, setEdit] = useState(false);
    const [note, setNote] = useState<NoteRecordEntity | null>(null);
    const [noteText, setNoteText] = useState('');
    const [checkAuth, setCheckAuth] = useState(false);

    const navigate = useNavigate();
    const id = useParams().id as string;

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/notes/${id}`);

            res.status === 401 && navigate('/sign-in');
            setCheckAuth(true);

            const data = await res.json();

            if (data.success) {
                data.note.date = `${moment(data.createdAt).format(
                    'L'
                )} - ${moment(data.createdAt).format('LT')}`;
                setNote(data.note);
                setNoteText(data.note.text);
            }
        })();
    }, [id]);

    if (!checkAuth) return <Loader />;

    return (
        <>
            {note && props.auth ? (
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
                    <div className={styles.noteBox}>
                        <p className={styles.noteBoxText}>
                            There is no such note
                        </p>
                    </div>
                </>
            )}
        </>
    );
};
