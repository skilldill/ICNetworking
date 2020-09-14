import React, { FC } from "react";

import "./style.scss";

interface InterestsFieldProps {
    interests: { name: string }[]
} 

export const InterestsField: FC<InterestsFieldProps> = (props) => {
    const { interests } = props;
    
    return (
        <div className="interests-field">
            <h3>Мои интересы</h3>
            <div className="interests-items">
                {!!interests.length && interests.map((interest, i) => 
                    <div key={i} className="interest">{interest.name}</div>
                )}
            </div>
        </div>
    )
}