import React, { FC, useCallback, useMemo } from "react";

import "./style.scss";
import { Input, PartBlock } from "../";

interface SuggestListProps {
  options: any[]
  onSelect?: (value: any) => void,
  onSearch?: (value: string) => void
}

export const SuggestList: FC<SuggestListProps> = (props) => {
  const { options, onSelect, onSearch } = props;

  const handleSelect = useCallback((value: any) => {
    !!onSelect && onSelect(value);
  }, [onSelect])

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    
    if (value.length > 2) {
      !!onSearch && onSearch(value);
    }
  }, [onSearch])

  const optionsList = useMemo(() => !!options.length ? (
    options.map((item: any, i: number) => ( 
      <PartBlock key={i}>
        
      </PartBlock>
    ))) : (
      <div></div>
    ), [options])

  return (
    <div className="suggest-list">
      <div className="search">
        <Input />
      </div>
      <div className="list-items">
        {optionsList}
      </div>
    </div>
  )
}