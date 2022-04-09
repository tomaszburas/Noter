import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { useEffect } from 'react';

interface Props {
    children: ReactElement;
    authorization: boolean;
    isAuth: boolean | null;
    setIsAuth: (value: boolean | null) => void;
}

export const ProtectedRoute = (props: Props): any => {
    useEffect(() => {
        (async () => {
            const res = await fetch('/api/auth');
            const data = await res.json();

            if (data.success) {
                props.setIsAuth(true);
            } else {
                props.setIsAuth(false);
            }
        })();
    }, []);

    if (props.isAuth === null) return <Loader />;

    if (!props.authorization) {
        return !props.isAuth ? props.children : <Navigate to="/notes" />;
    }

    if (props.authorization) {
        return props.isAuth ? props.children : <Navigate to="/sign-in" />;
    }
};
