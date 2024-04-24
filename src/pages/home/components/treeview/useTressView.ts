import { useTableDataQuery } from "../../../../hooks/queries/useTableDataQuery.ts";
import { useAtom } from "jotai/index";
import { FilteredAtom, filtered_atom } from "../../../../store/atoms";
import { useEffect, useState } from "react";

export const useTreeViews = () => {
  const { data } = useTableDataQuery();
  const [filtered, setFiltered] = useAtom(filtered_atom);

  const [isMainOpened, setIsMainOpened] = useState<boolean[]>([]);
  const [isMidOpened, setIsMidOpened] = useState<boolean[]>([]);
  const [isSubOpened, setIsSubOpened] = useState<boolean[]>([]);

  const handleMainToggle =
    (index: number) => (e: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
      setIsMainOpened((curVal) => {
        curVal[index] = (e.target as HTMLDetailsElement).open as boolean;
        return [...curVal];
      });
    };

  const handleMidToggle =
    (index: number) => (e: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
      setIsMidOpened((curVal) => {
        curVal[index] = (e.target as HTMLDetailsElement).open as boolean;
        return [...curVal];
      });
    };

  const handleSubToggle =
    (index: number) => (e: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
      setIsSubOpened((curVal) => {
        curVal[index] = (e.target as HTMLDetailsElement).open as boolean;
        return [...curVal];
      });
    };

  //상위 부모 찾기
  const findParent = (key: keyof FilteredAtom, value: any) => {
    const parent = Object.entries(filtered).find(([k, v]) => {
      return k === key && v.includes(value);
    });

    return parent;
  };

  const addFilter = (key: keyof FilteredAtom, value: any) => {
    setFiltered((prev) => {
      return { ...prev, [key]: [...prev[key], value] };
    });
  };

  const removeFilter = (key: keyof FilteredAtom, value: any) => {
    setFiltered((prev) => {
      return { ...prev, [key]: prev[key].filter((item) => item !== value) };
    });
  };

  const addAllFilter = (key: keyof FilteredAtom, value: any) => {
    setFiltered((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const removeAllFilter = (key: keyof FilteredAtom) => {
    setFiltered((prev) => {
      return { ...prev, [key]: [] };
    });
  };

  const resetFilter = () => {
    setFiltered({
      main: [],
      middle: [],
      sub: [],
      name: [],
    });
  };
  const main = data && Object.groupBy(data, ({ main }) => main);
  const mainArr = Object.entries(main || {});

  const groupByData = mainArr.map(([main, value]) => {
    const mid = value && Object.groupBy(value, ({ middle }) => middle);
    const midArr = Object.entries(mid || {});

    const subArr = midArr.map(([middle, value]) => {
      const sub = value && Object.groupBy(value, ({ sub }) => sub);
      return [middle, sub];
    });

    const nameArr = subArr.map(([sub, value]) => {
      const el = Object.entries(value || {});
      const name = el.map(([subData, value]) => {
        return [subData, value];
      });

      return [sub, name];
    });

    return [main, nameArr];
  });

  useEffect(() => {
    if (groupByData.length > 0) {
      setIsMainOpened(Array(groupByData.length).fill(false));
      const mid = groupByData.map(([, mid]) => mid);
      const sub = mid.map(([, sub]) => sub);
      setIsMidOpened(Array(mid.length).fill(false));
      setIsSubOpened(Array(sub.length).fill(false));
    }
  }, [groupByData.length]);

  return {
    data,
    filtered,
    setFiltered,
    addFilter,
    removeFilter,
    addAllFilter,
    removeAllFilter,
    resetFilter,
    groupByData,
    isMainOpened,
    isMidOpened,
    isSubOpened,
    handleMainToggle,
    handleMidToggle,
    handleSubToggle,
    findParent,
  };
};
