import { useEffect } from "react";

export const useScrolling = () => {
    useEffect(() => {
        document.body.style.overflowY = "auto";

        return () => {
            document.body.style.overflowY = "hidden";
        }
    }, [])
}