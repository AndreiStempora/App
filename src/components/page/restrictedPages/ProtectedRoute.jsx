import { Redirect, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { user } from '../../../services/user/user';

const ProtectedRoute = ({children, ...props}) => {
    const [isLoggedIn] = useAtom(user.loggedIn);

    return (
        <>
        {
            isLoggedIn?
                <Route {...props}></Route>:
                <Route render={() => <Redirect to="/login" />} />
        }
        </>
    )
}

export default ProtectedRoute