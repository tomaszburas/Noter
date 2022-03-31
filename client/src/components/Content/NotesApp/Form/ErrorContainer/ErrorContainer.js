export const ErrorContainer = props => {
    return (
        <div className="error-container" style={{marginTop: props.edit && '0'}}>
            <p className="error-text">{props.errorText}</p>
        </div>
    )
}
