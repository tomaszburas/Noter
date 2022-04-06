import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './Header/Header';
import { Content } from './Content/Content';
import { Footer } from './Footer/Footer';
import { useState } from 'react';
import './App.css';

export const App = () => {
    const [auth, setAuth] = useState<boolean>(false);

    return (
        <Router>
            <Header setAuth={setAuth} auth={auth} />
            <Content setAuth={setAuth} auth={auth} />
            <Footer />
        </Router>
    );
};
