import './Header.css';
import {Link, useNavigate} from "react-router-dom";
import logo from '../../assets/img/logo.png'

export const Header = props => {
    const navigate = useNavigate();

    const logoutHandler = async (e) => {
        e.preventDefault();

        const res = await fetch('/logout')
        const data = await res.json();

        if(data.success) {
            props.setAuth(false);
            navigate('/')
        }
    }

    return (
        <header>
            <Link to="/">
                <img src={logo} className="logo" alt="Noter" title="Noter"/>
            </Link>
            <div className="access__header">
                { props.auth
                    ? <>
                        <Link to="/notes">
                            <p className="access__header__text" style={{marginRight: '1.5rem'}} title='Notes'>Notes</p>
                        </Link>
                        <p className="access__header__text" onClick={logoutHandler} title='Logout'>Logout</p>
                    </>
                    : <>
                        <Link to="/sign-in">
                            <p className="access__header__text" style={{marginRight: '1.5rem'}} title='Sign In'>Sign In</p>
                        </Link>
                        <Link to="/sign-up">
                            <p className="access__header__text" title='Sign Up'>Sign Up</p>
                        </Link>
                    </>
                }
            </div>
        </header>
    );
}
