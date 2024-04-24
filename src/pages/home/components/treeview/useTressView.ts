import {useTableDataQuery} from "../../../../hooks/queries/useTableDataQuery.ts";
import {useAtom} from "jotai/index";
import {FilteredAtom, filtered_atom} from "../../../../store/atoms";
import {useEffect, useState} from "react";

export const useTreeViews = () => {
  const {data} = useTableDataQuery();
  const [filtered, setFiltered] = useAtom(filtered_atom);

  const [isMainOpened, setIsMainOpened] = useState<boolean[]>([]);
  const [isMidOpened, setIsMidOpened] = useState<boolean[]>([]);
  const [isSubOpened, setIsSubOpened] = useState<boolean[]>([]);

  const handleMainToggle = (index: number) => (e: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
    setIsMainOpened((curVal) => {
      curVal[index] = (e.target as HTMLDetailsElement).open as boolean;
      return [...curVal];
    })
  }

  const handleMidToggle = (index: number) => (e: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
    setIsMidOpened((curVal) => {
      curVal[index] = (e.target as HTMLDetailsElement).open as boolean;
      return [...curVal];
    });
  }

  const handleSubToggle = (index: number) => (e: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
    setIsSubOpened((curVal) => {
      curVal[index] = (e.target as HTMLDetailsElement).open as boolean;
      return [...curVal];
    });
  }

  const addFilter = (key: keyof FilteredAtom, value: any) => {
    setFiltered((prev) => {
      return {...prev, [key]: [...prev[key], value]}
    })
  }

  const removeFilter = (key: keyof FilteredAtom, value: any) => {
    setFiltered((prev) => {
      return {...prev, [key]: prev[key].filter((item) => item !== value)}
    })
  }

  const main = data && Object.groupBy(data, ({main}) => main);
  const mainArr = Object.entries(main || {});

  const groupByData = mainArr.map(([main, value]) => {
    const mid = value && Object.groupBy(value, ({middle}) => middle);
    const midArr = Object.entries(mid || {});

    const subArr = midArr.map(([middle, value]) => {
      const sub = value && Object.groupBy(value, ({sub}) => sub);
      return [middle, sub];
    });

    const nameArr = subArr.map(([sub, value]) => {
      const el = Object.entries(value || {});
      const name = el.map(([subData, value]) => {
        return [subData, value];
      });

      return [sub, name];
    });

    return [main, nameArr]
  });

  useEffect(() => {
    if (groupByData.length > 0) {
      setIsMainOpened(Array(groupByData.length).fill(false))
      const mid = groupByData.map(([, mid]) => mid);
      const sub = mid.map(([, sub]) => sub);
      setIsMidOpened(Array(mid.length).fill(false))
      setIsSubOpened(Array(sub.length).fill(false))
    }
  }, [groupByData.length])

  return {
    filtered,
    setFiltered,
    addFilter,
    removeFilter,
    groupByData,
    isMainOpened,
    isMidOpened,
    isSubOpened,
    handleMainToggle,
    handleMidToggle,
    handleSubToggle
  };
};
