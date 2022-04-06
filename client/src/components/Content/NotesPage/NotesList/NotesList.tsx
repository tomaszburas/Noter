import React from 'react';
import { NoteRecordEntity } from 'types';
import { NoteElement } from './NoteElement/NoteElement';
import styles from './NotesList.module.css';

interface Props {
    notes: NoteRecordEntity[] | [];
    deleteNote: (id: string) => void;
    editNote: (id: string, text: string) => void;
}

export const NotesList = (props: Props) => {
    return (
        <div className={styles.notes__container}>
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
