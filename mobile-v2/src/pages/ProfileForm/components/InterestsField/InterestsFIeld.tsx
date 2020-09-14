import React, { FC, useState, useCallback, useEffect } from "react";
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
    const [showFieldTags, setShowFieldTags] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setCurrentValue(value);

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

    const handleSelectInterest = useCallback((interest: {name: string}) => {
        setSelectedInterests([...selectedInterests, interest]);
        setShowFieldTags(true);
        
        // CLEAR FIELDS AND SELECT
        handleClear();
    }, [showFieldTags, selectedInterests])

    const handleRemoveFromSelected = useCallback((index: number) => {
        const prepareSelectedInterests = [...selectedInterests];
        prepareSelectedInterests.splice(index, 1);
        setSelectedInterests(prepareSelectedInterests);
    }, [selectedInterests])

    const handleClickFieldTags = useCallback(() => {
        setShowFieldTags(false);

        // FOR AT ONCE SHOW KEYBOARD
        setInputFocus(true);
    }, [showFieldTags, inputFocus])

    const handleBlurInput = useCallback(() => {
        if (currentValue.length === 0) {
            setShowFieldTags(true);
        }
    }, [showFieldTags, currentValue]);

    return (
        <div className="interests-field">
            <h3>Мои интересы</h3>
            {(!!selectedInterests.length && showFieldTags) ? (
                <div 
                    className="selected-interests"
                    onClick={handleClickFieldTags}
                >
                    {selectedInterests.map((interest, i) => 
                        <div
                            key={i} 
                            className="selected-interest"
                        >
                            {interest.name}
                            <button onClick={(event) => {event.stopPropagation(); handleRemoveFromSelected(i)}}>
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
                        showClear={!!currentValue.length}
                        onBlur={handleBlurInput}
                        isFocus={inputFocus}
                    />
                    {!!foundIterests.length && (
                        <ul className="found-interests">
                            {foundIterests.map((interest, i) => 
                                // IF INTEREST ALREDY IN SELECTED INTERESTS, 
                                // THEN REMOVE FROM DROPDOWM
                                !selectedInterests.includes(interest) && (
                                <li 
                                    key={i}
                                    onClick={() => handleSelectInterest(interest)}
                                    className={cn({
                                        "found-interest": true,
                                        "first-found-interest": i === 0,
                                        "last-found-interest": i === (foundIterests.length - 1)
                                    })}
                                >{interest.name}</li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    )
}