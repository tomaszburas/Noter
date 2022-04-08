import { NotesEntity } from 'types';
import { NoteElement } from './NoteElement/NoteElement';
import styles from './NotesList.module.css';

interface Props {
    notes: NotesEntity[] | [];
    deleteNote: (id: string) => void;
    editNote: (id: string, text: string) => void;
}

export const NotesList = (props: Props) => {
    return (
        <div className={styles.notesContainer}>
            <p>Notes List</p>
            {props.notes.length ? (
                props.notes.map((note) => {
                    return (
                        <NoteElement
                            key={note.id}
                            note={note}
                            deleteNote={props.deleteNote}
                            editNote={props.editNote}
                        />
                    );
                })
            ) : (
                <p className={styles.text}>No notes.</p>
            )}
        </div>
    );
};
