export const Textarea = props => {
    return (
        <textarea
            className="textarea"
            onChange={e => props.setNote(e.target.value)}
            value={props.note}
            placeholder="Note text..."
        />
    )
}
