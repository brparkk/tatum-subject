import {useCallback, useEffect} from "react";
import {TTableData} from "../../../../@types/tableType.ts";
import {useTableDataQuery} from "../../../../hooks/queries/useTableDataQuery.ts";
import {useAtom, useAtomValue} from "jotai";
import {filtered_atom, table_atom} from "../../../../store/atoms";

// const OFFSET = 30;

export const useTable = (
  tableRef: React.MutableRefObject<HTMLTableRowElement | null>
) => {
  const {data} = useTableDataQuery();
  // const [page, setPage] = useState(0);
  const [tableData, setTableData] = useAtom(table_atom);

  const filteredAtom = useAtomValue(filtered_atom);
  const isFiltered = Object.values(filteredAtom).some(
    (item) => item.length > 0
  );

  const filteredData = useCallback(() => {
    setTableData((prev) => {
      let newVal: TTableData[] = [];
      if (filteredAtom["main"].length > 0) {
        newVal = prev.filter((item) =>
          filteredAtom["main"].includes(item.main)
        );
      }

      if (filteredAtom["middle"].length > 0) {
        const filterVal = prev.filter((item) =>
          filteredAtom["middle"].includes(item.middle)
        );
        newVal = [...newVal, ...filterVal];
      }

      if (filteredAtom["sub"].length > 0) {
        const filterVal = prev.filter((item) =>
          filteredAtom["sub"].includes(item.sub)
        );
        newVal = [...newVal, ...filterVal];
      }

      if (filteredAtom["name"].length > 0) {
        const filterVal = prev.filter((item) =>
          filteredAtom["name"].includes(item.name)
        );
        newVal = [...newVal, ...filterVal];
      }

      return [...newVal].sort();
    });
  }, [filteredAtom]);

  useEffect(() => {
    if (data && data.length > 0) {
      //init func
      setTableData((prev) => {
        const filtered = prev.filter(
          (item) => !data.find((data) => data.policyId === item.policyId)
        );
        return [...filtered, ...data];
      });

      if (isFiltered) {
        filteredData();
      }
    }
  }, [data, filteredData, isFiltered, setTableData]);

  // TODO infinite scroll
  // const handleObserver = (entries: IntersectionObserverEntry[]) => {
  //   const target = entries[0];
  //   if (target.isIntersecting) {
  //     // console.log("isIntersecting");
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  // useEffect(() => {
  //   const observer = new IntersectionObserver(handleObserver, {
  //     threshold: 0,
  //   });
  //
  //   const observerTarget = tableRef.current;
  //   if (observerTarget) {
  //     observer.observe(observerTarget);
  //   }
  // }, [tableRef]);

  return {tableData};
};
