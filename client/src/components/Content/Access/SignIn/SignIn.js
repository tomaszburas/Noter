import '../Access.css'
import {ErrorContainer} from "../../NotesApp/Form/ErrorContainer/ErrorContainer";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "react-spinners/GridLoader";

export const SignIn = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        err: false,
        text: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        props.auth && navigate('/notes')
    }, [props.auth, navigate])

    const submitForm = async (e) => {
        e.preventDefault();
        setError({err: false, text: ''});

        const res = await fetch('/sign-in', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username.trim(),
                password: password.trim(),
            })
        })

        const data = await res.json();

        if (data.success) {
            props.setAuth(true);
            navigate('/notes')
        } else {
            setError({err: true, text: data.message});
        }
    }

    return (
        <>
            {
                !props.auth ?
                    <div className="access__container">
                        <p className="access__title">Sign In</p>
                        <form className="access__box" onSubmit={submitForm}>
                            <label className="access__label__text">
                                <span className="label__text">Login:</span>
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                            </label>
                            <label className="access__label__text">
                                <span className="label__text">Password:</span>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </label>
                            {error.err && <ErrorContainer errorText={error.text} edit={true}/>}
                            <div className="button__container">
                                <button type="submit" className="access__btn" title="Sign in">Sign In</button>
                            </div>
                        </form>
                    </div>
                    : <Loader
                        css={{position: 'absolute', top: '50%', right: '50%'}}
                        color='#19535f'
                    />
            }
        </>
    )
}
