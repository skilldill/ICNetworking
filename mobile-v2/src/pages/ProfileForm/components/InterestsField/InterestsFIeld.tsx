import React, { FC, useState, useCallback } from "react";

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

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setCurrentValue(value);

        // TEST
        const prepareFoundInterests = INTERESTS_MOCK.filter((interest) => interest.name.includes(value));
        setFoundInterests(prepareFoundInterests);
    }, [currentValue])

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
                        onClear={() => { setCurrentValue("") }}
                    />
                    {!!foundIterests.length && (
                        <ul className="found-interests">

                        </ul>
                    )}
                </>
            )}
        </div>
    )
}