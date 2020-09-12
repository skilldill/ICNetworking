import React, { FC, useState, useCallback } from "react";
import cn from "classnames";

import "./style.scss";
import { Input } from "shared/components";

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
    const [selectedInterests, setSelectedInterests] = useState([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setCurrentValue(value);

        // TEST
        if (value === "") {
            return setFoundInterests([]);
        }
        
        const prepareFoundInterests = INTERESTS_MOCK.filter((interest) => interest.name.toLowerCase().includes(value));
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
                <div></div>
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