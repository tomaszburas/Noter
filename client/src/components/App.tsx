import { Header } from './Header/Header';
import { Content } from './Content/Content';
import { Footer } from './Footer/Footer';
import { useState } from 'react';
import './App.css';

export const App = () => {
    const [auth, setAuth] = useState(false);

    return (
        <>
            <Header setAuth={setAuth} auth={auth} />
            <Content setAuth={setAuth} auth={auth} />
            <Footer />
        </>
    );
};
