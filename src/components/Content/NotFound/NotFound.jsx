import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <>
            <Link className="link" to='/'><span className="note-go-back__btn">Go Home</span></Link>
            <div className="note-box">
                <p className="note-box__text">404: Page Not Found 🛑</p>
            </div>
        </>
    )
}
