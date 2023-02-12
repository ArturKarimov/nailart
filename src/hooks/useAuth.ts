import {Cookie} from "../utils/cookie";
import {useAppDispatch} from "./redux";
import {setIsAuth} from "../services/user/user-slice";

export const useAuth = () => {
    const dispatch = useAppDispatch();

    if (Cookie.getCookie("token")) {
        dispatch(setIsAuth(true))
    }
}