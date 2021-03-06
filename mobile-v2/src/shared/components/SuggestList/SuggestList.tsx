import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

import "./style.scss";
import { Input, PartBlock } from "../";
import { PlusSVG, SearchInputSVG } from "assets/icons";
import { Scrollable } from "core/Scrollable";
import { SelectList } from "../SelectList";

interface SuggestListProps {
  options: any[],
  focused?: boolean,
  onSelect?: (value: any) => void,
  onSearch?: (value: string) => void,
  normalize?: (value: {[key: string]: any}) => { name: string, value: any }[]
}

export const SuggestList: FC<SuggestListProps> = (props) => {
  const { options, focused, onSelect, onSearch, normalize } = props;

  const [searchValue, setSearchValue] = useState("");
  const [normalizedOptions, setNormalizedOptions] = useState<any[]>([]);

  useEffect(() => {
    if (!!normalize) {
      setNormalizedOptions(options.map(normalize));
    } else {
      setNormalizedOptions(options);
    }
  }, [normalize, options])

  const handleSelect = useCallback((value: any) => {
    !!onSelect && onSelect(value);
  }, [onSelect])

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchValue(value);

    !!onSearch && onSearch(value);
  }, [onSearch])

  const optionsList = useMemo(() => !!options.length ? (
    normalizedOptions.map((item: any, i: number) => ( 
      <PartBlock key={i}>
        <button className="btn-plus-circle" onClick={() => handleSelect(item)}>
          <img src={PlusSVG} alt="Добавить" />
        </button>
        <span>{item.name}</span>
      </PartBlock>
    ))) : (
      <div />
    ), [normalizedOptions])

  return (
    <div className="suggest-list">
      <PartBlock className="part-block-search">
        {/* <img className="search-icon" src={SearchInputSVG} alt="поиск"/> */}
        <Input 
          isFocus={focused} 
          onChange={handleSearch} 
          onClear={() => setSearchValue("")}
          value={searchValue}
          showClear 
        />
      </PartBlock>
      <SelectList options={normalizedOptions} onSelect={handleSelect} />
    </div>
  )
}