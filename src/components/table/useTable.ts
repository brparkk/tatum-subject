import { useCallback, useEffect, useState } from "react";
import { TTableData } from "../../@types/tableType";

const OFFSET = 30;

export const useTable = (
  tableRef: React.MutableRefObject<HTMLTableRowElement | null>,
  tableData?: TTableData[]
) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<TTableData[]>([]);

  const initData = useCallback(() => {
    if (tableData && tableData.length > 0) {
      const start = 0;
      const end = page * (1 + OFFSET);
      setData((prev) => {
        const filtered = prev.filter(
          (item) => !tableData.find((data) => data.policyId === item.policyId)
        );
        return [...filtered, ...tableData.slice(start, end)];
      });
    }
  }, [page, tableData]);

  useEffect(() => {
    initData();
  }, [initData]);

  console.log(data.length, "data.length");

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      console.log("isIntersecting");
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    const observerTarget = tableRef.current;
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, [tableRef]);

  return { tableData: data };
};
