import React, { FC, useEffect, useState, useMemo } from "react";
import cn from "classnames";

import "./style.scss";

interface CollegueModalProps {
    collegue: any;
}

export const CollegueModal: FC<CollegueModalProps> = (props) => {
    const { collegue } = props;

    // FOR ANIMATION COLLEGUE CHANGE
    const [currentCollegue, setCurrentCollegue] = useState<any>(null);
    const [hideInfo, setHideInfo] = useState(false);

    useEffect(() => {
        if (!currentCollegue) {
            setCurrentCollegue(collegue);
        } else {
            const hidePromise = new Promise<NodeJS.Timeout>((resolve) => {
                setHideInfo(true);

                const timeout = setTimeout(() => {
                    resolve(timeout);
                }, 300);
            })

            hidePromise
                .then((timeout) => {
                    clearTimeout(timeout);
                    setCurrentCollegue(collegue);
                    setHideInfo(false);
                })
            
        }
    }, [collegue]);

    const topInfoClasses = useMemo(() => cn({
        'top-info': true,
        'top-info-hide': hideInfo
    }), [hideInfo]);

    return (
        <div className="modal-control">
            <div className="top">
                <div></div>
            </div>
            <div className="collegue-info">
                { !!currentCollegue && (
                    <div className={topInfoClasses}>
                        <h3 className="name">{currentCollegue.name}</h3>
                        <span className="position">{currentCollegue.position}</span>
                    </div>
                )}
            </div>
        </div>
    )
}