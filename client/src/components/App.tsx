import { Header } from './Header/Header';
import { Content } from './Content/Content';
import { Footer } from './Footer/Footer';
import { useState } from 'react';
import './App.css';

export const App = () => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    return (
        <>
            <Header isAuth={isAuth} setIsAuth={setIsAuth} />
            <Content isAuth={isAuth} setIsAuth={setIsAuth} />
            <Footer />
        </>
    );
};
