import React, { FC, useCallback, useEffect, useMemo } from "react";

import "./style.scss";
import { SmallCrossSVG } from "assets/icons";

interface InterestsFieldProps {
    interests: any[],
    onClick: () => void;
    onRemove: (id: number) => void;
}

export const InterestsField: FC<InterestsFieldProps> = (props) => {
    const { interests, onClick, onRemove } = props;

    // TEST
    useEffect(() => {
        console.log(interests);
    }, [interests])

    const handleRemove = (id: number) => (event: any) => {
        event.stopPropagation();
        onRemove(id);
    }

    const interestsList = useMemo(() => !!interests.length ? (
        interests.map((interest: any, i: number) => 
            <div key={i} className="interest">
                <span>{interest.name}</span>
                <img src={SmallCrossSVG} alt="" onClick={handleRemove(interest.id)} />
            </div>
        )
    ) : (
        <span className="placeholder">Интересы</span>
    ), [interests])

    return (
        <div className="selected-interests-field" onClick={onClick}>
            {interestsList}
        </div>
    )
}