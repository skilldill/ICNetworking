import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import { PartBlock } from "shared/components";
import { matchesModule } from "store/matches";
import { ProfileAvatarSVG } from "assets/icons";

export const Participants = () => {
    const { matches, selectedIds } = useSelector(matchesModule.selector);
    const selectedCollegues = useMemo(() => matches.filter((match) => selectedIds.includes(match.id)), [selectedIds, matches]);
    
    return (
        <PartBlock className="participants">
            {selectedCollegues.map((member, i) => 
                <div className="member" key={i}>
                    <div className="circle">
                        {!!member.avatars.length ? (
                            <img className="avatar" src={member.avatars[member.avatars.length - 1].picture} alt={member.name} />
                        ): (
                            <img className="avatar-mock" src={ProfileAvatarSVG} alt={member.name} />
                        )}
                    </div>
                    <p>{member.firstName}</p>
                </div>
            )}
        </PartBlock>
    )
}