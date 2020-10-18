import { FilterTypeNames } from "shared/constants";

export interface ColleguesState {
  collegues: any[],
  loading: boolean,
  page: number,
  
  filter: {
    type: FilterTypeNames,
    value?: string
  }
}