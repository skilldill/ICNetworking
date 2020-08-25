import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavbarActions } from "store/navbar/navbar.actions";

export const useNavbar = (title: string) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(NavbarActions.changeTitle(title));
    }, []);

    return;
}