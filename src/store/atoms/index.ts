import {atom} from "jotai"

export type FilteredAtom = {
  main: string[];
  middle: string[];
  sub: string[];
  name: string[];
}

export const filtered_atom = atom<FilteredAtom>({
  main: [],
  middle: [],
  sub: [],
  name: [],
});
