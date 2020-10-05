import React, { FC, useEffect, useMemo } from "react";
import "./style.scss";

interface InterestsFieldProps {
    interests: any[],
    onClick: () => void;
}

export const InterestsField: FC<InterestsFieldProps> = (props) => {
    const { interests, onClick } = props;

    // TEST
    useEffect(() => {
        console.log(interests);
    }, [interests])

    const interestsList = useMemo(() => !!interests.length ? (
        interests.map((interest: any, i: number) => <div key={i} className="interest">{interest.name}</div>)
    ) : (
        <span className="placeholder">Интересы</span>
    ), [interests])

    return (
        <div className="selected-interests-field" onClick={onClick}>
            {interestsList}
        </div>
    )
}