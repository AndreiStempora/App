import { Redirect, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { user } from '../../../services/user/user';

const ProtectedRoute = ({children, ...props}) => {
    const [isLoggedIn] = useAtom(user.loggedIn);

    return (
        <>
        {
            isLoggedIn?
                <Route {...props}>{children}</Route>:
                <Redirect to="/login"></Redirect>
        }
        </>
    )
}

export default ProtectedRoute