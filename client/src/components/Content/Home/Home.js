import './Home.css'
import homeImg from '../../../assets/img/home-img.svg';
import {Link} from "react-router-dom";

export const Home = () => {
    return (
        <div className="home__container">
            <p className="home__title">Notes application that can use the markdown format.</p>
            <img className="home__img" src={homeImg} alt="home img"/>
            <Link to='/notes'>
                <button className="home__btn" title="Start now">Start now 📄</button>
            </Link>
        </div>
    )
}
