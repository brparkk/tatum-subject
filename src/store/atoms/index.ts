import { atom } from "jotai";
import { TTableData } from "../../@types/tableType";

export type FilteredAtom = {
  main: string[];
  middle: string[];
  sub: string[];
  name: string[];
};

export const filtered_atom = atom<FilteredAtom>({
  main: [],
  middle: [],
  sub: [],
  name: [],
});

export const table_atom = atom<TTableData[]>([]);
