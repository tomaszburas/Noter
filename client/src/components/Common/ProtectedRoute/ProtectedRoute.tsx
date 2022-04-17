import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setIsAuth } from '../../../redux/features/user/users-slice';

interface Props {
    children: ReactElement;
    authorization: boolean;
}

export const ProtectedRoute = ({ authorization, children }: Props): any => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((store: RootState) => store.user);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/auth');
            const data = await res.json();

            if (data.success) {
                dispatch(setIsAuth(true));
            } else {
                dispatch(setIsAuth(false));
            }
        })();
    }, []);

    if (isAuth === null) return <Loader />;

    if (!authorization) {
        return !isAuth ? children : <Navigate to="/notes" />;
    }

    if (authorization) {
        return isAuth ? children : <Navigate to="/sign-in" />;
    }
};
