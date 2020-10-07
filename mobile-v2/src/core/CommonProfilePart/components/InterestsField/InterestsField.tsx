import React, { FC, useEffect, useState } from "react";
import { PartBlock } from "shared/components";

import "./style.scss";

interface InterestsFieldProps {
    profile: any
} 

export const InterestsField: FC<InterestsFieldProps> = (props) => {
    const { profile } = props;
    const [interests, setIntersts] = useState<{ name: string, id: number }[]>([]);

    useEffect(() => {
        // CRUTCH FOR PREPARE INTERESTS
        const { interests, interest_names } = profile;
        if (!!interests && !!interest_names) {
            const preparedInterests = interests.map((interestId: number, i: number) => ({ id: interestId, name: interest_names[i] }));
            setIntersts(preparedInterests);
        }
    }, [profile])

    return (
        <PartBlock title="Мои интересы" className="interests-field">
            <div className="interests-items">
                {!!interests.length && interests.map((interest, i) => 
                    <div key={i} className="interest">{interest.name}</div>
                )}
            </div>
        </PartBlock>
    )
}