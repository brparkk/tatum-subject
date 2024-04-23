import {useTableDataQuery} from "../../hooks/queries/useTableDataQuery";

export const useTreeViews = () => {
  const {data} = useTableDataQuery();

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
        console.log(subData, "subData")
        return [subData, value];
      });

      return [sub, name];
    });

    return [main, nameArr]
  });

  // console.log(groupByData);

  return {groupByData};
};
