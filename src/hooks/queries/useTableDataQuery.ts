import {useQuery} from "@tanstack/react-query";
import {TTableData} from "../../@types/tableType";

const QUERY_KEY = ["tableData"];
export const useTableDataQuery = () => {
  const {data} = useQuery<TTableData[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await fetch("/data/data.json").then(
        (res) => res.json()
      );
      return response.data;
    },
  });

  return {data};
};
