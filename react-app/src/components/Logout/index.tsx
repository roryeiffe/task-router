import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Logout = () => {
    // dispatch the logout action:
    const dispatch = useDispatch();
    dispatch({type: 'LOGOUT'});
    // redirect to main page:
    return (
        <div>
            <Navigate to = '/'/>
        </div>
    )
}

export default Logout;