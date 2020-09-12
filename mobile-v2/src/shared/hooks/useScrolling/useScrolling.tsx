import { useEffect } from "react";

export const useScrolling = (watchParams?: any) => {
    const watchedParams = !!watchParams ? [watchParams] : [];
    useEffect(() => {
        document.body.style.overflowY = "auto";

        return () => {
            document.body.style.overflowY = "hidden";
        }
    }, [watchedParams])
}