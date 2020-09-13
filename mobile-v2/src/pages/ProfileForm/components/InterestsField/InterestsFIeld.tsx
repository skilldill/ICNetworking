import React, { FC, useState, useCallback } from "react";
import cn from "classnames";

import "./style.scss";
import { Input } from "shared/components";
import { SmallBlueCrossSVG } from "assets/icons";

const INTERESTS_MOCK = [
    { name: "Футбол" },
    { name: "Фудблогинг" },
    { name: "Спорт" },
    { name: "Сабли" },
    { name: "Сальса" },
    { name: "Фехтование" }
]

export const InterestsField: FC = (props) => {
    const [currentValue, setCurrentValue] = useState("");
    const [foundIterests, setFoundInterests] = useState<{name: string}[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<{name: string}[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setCurrentValue(value);

        // TEST
        if (value === "") {
            return setFoundInterests([]);
        }

        const prepareFoundInterests = INTERESTS_MOCK.filter((interest) => interest.name.toLowerCase().includes(value.toLowerCase()));
        return setFoundInterests(prepareFoundInterests);
    }

    const handleClear = useCallback(() => {
        setCurrentValue("");
        setFoundInterests([]);
    }, [currentValue, foundIterests])

    return (
        <div className="interests-field">
            <h3>Мои интересы</h3>
            {!!selectedInterests.length ? (
                <div className="selected-interests">
                    {selectedInterests.map((interest, i) => 
                        <div
                            key={i} 
                            className="selected-interest"
                        >
                            {interest.name}
                            <button>
                                <img src={SmallBlueCrossSVG} alt="clear"/>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Input 
                        placeholder="Введите интересы" 
                        value={currentValue}
                        onChange={handleChange}
                        onClear={handleClear}
                    />
                    {!!foundIterests.length && (
                        <ul className="found-interests">
                            {foundIterests.map((interest, i) => 
                                <li 
                                    key={i}
                                    onClick={() => setSelectedInterests([...selectedInterests, interest])}
                                    className={cn({
                                        "found-interest": true,
                                        "first-found-interest": i === 0,
                                        "last-found-interest": i === (foundIterests.length - 1)
                                    })}
                                >{interest.name}</li>
                            )}
                        </ul>
                    )}
                </>
            )}
        </div>
    )
}