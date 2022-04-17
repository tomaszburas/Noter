import { Route, Routes } from 'react-router-dom';
import { Note } from './Note/Note';
import { NotFound } from './NotFound/NotFound';
import { NotesPage } from './NotesPage/NotesPage';
import { SignIn } from './Access/SignIn/SignIn';
import { SignUp } from './Access/SignUp/SignUp';
import { Home } from './Home/Home';
import styles from './Content.module.css';
import { ProtectedRoute } from '../Common/ProtectedRoute/ProtectedRoute';

export const Content = () => {
    return (
        <div className={styles.content}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute authorization={true}>
                            <NotesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notes/:id"
                    element={
                        <ProtectedRoute authorization={true}>
                            <Note />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <ProtectedRoute authorization={false}>
                            <SignIn />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <ProtectedRoute authorization={false}>
                            <SignUp />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};
