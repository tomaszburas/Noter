import '../Access.css'
import {useEffect, useState} from "react";
import {ErrorContainer} from "../../NotesApp/Form/ErrorContainer/ErrorContainer";
import {useNavigate} from "react-router-dom";
import Loader from "react-spinners/GridLoader";

export const SignUp = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        props.auth && navigate('/notes')
    }, [props.auth, navigate])

    const submitForm = async (e) => {
        e.preventDefault();
        setError(false);

        const res = await fetch('/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username.trim(),
                password: password.trim(),
                repeatPassword: repeatPassword.trim()
            })
        })

        const data = await res.json();

        if ((res.status === 400) || (res.status === 500)) {
            setError(true);
            setErrorText(data.message);
        }

        if (res.status === 200) {
            navigate('/sign-in')
        }
    }

    return (
        <>
            {
                !props.auth ?
                    <div className="access__container">
                        <p className="access__title">Sign Up</p>
                        <form className="access__box" onSubmit={submitForm}>
                            <label className="access__label__text">
                                <span className="label__text">Login:</span>
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            </label>
                            <label className="access__label__text">
                                <span className="label__text">Password:</span>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </label>
                            <label className="access__label__text">
                                <span className="label__text">Repeat password:</span>
                                <input type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
                            </label>
                            {error && <ErrorContainer errorText={errorText} edit={true}/>}
                            <div className="button__container">
                                <button type="submit" className="access__btn" title="Sign up">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    :   <Loader
                        css={{position: 'absolute', top: '50%', right: '50%'}}
                        color='#19535f'
                    />
            }
        </>
    )
}
