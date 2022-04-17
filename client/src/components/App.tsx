import { Header } from './Header/Header';
import { Content } from './Content/Content';
import { Footer } from './Footer/Footer';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import './App.css';

export const App = () => {
    return (
        <>
            <Provider store={store}>
                <Header />
                <Content />
                <Footer />
            </Provider>
        </>
    );
};
