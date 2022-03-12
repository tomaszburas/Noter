import './Header.css';
import {Link} from "react-router-dom";
import logo from '../../assets/img/logo.png'

export const Header = () => {
    return (
        <header>
            <Link to="/">
                <img src={logo} className="logo" alt="Noter" title="Noter"/>
            </Link>
        </header>
    );
}
