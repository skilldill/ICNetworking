import React, { useMemo } from "react";

import "./style.scss";
import { RemovebaleItem } from "./components";
import { useSelector } from "react-redux";
import { matchesModule } from "store/matches";

export const RemovebaleList = () => {
    const { matches, selectedIds } = useSelector(matchesModule.selector);
    const selectedMembers = useMemo(() => matches.filter((match) => selectedIds.includes(match.id)), [selectedIds, matches]);

    return (
        <div className="removebale-list">
            {selectedMembers.map((member, i) => 
                <RemovebaleItem key={i} member={member} onRemove={() => {}} />
            )}
        </div>
    )
}