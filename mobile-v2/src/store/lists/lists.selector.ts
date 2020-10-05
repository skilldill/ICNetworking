import { ListsState } from "./lists.model";

export const listsSelector = (state: any): ListsState => state.lists;