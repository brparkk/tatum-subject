import {useRef} from "react";
import styles from "./Table.module.css";
import {useTable} from "./useTable.ts";

function Table() {
  const tableRef = useRef<HTMLTableRowElement | null>(null);
  const {tableData} = useTable(tableRef);

  return (
    <div className={styles.container}>
      <h2>Assets List</h2>
      <table className={styles.table}>
        <thead>
        <tr>
          <th>대분류</th>
          <th>증분류</th>
          <th>소분류</th>
          <th>규칙 설명</th>
        </tr>
        </thead>
        <tbody>
        {tableData.map((row) => (
          <tr key={row.policyId}>
            <td scope="row">{row.main}</td>
            <td>{row.middle}</td>
            <td>{row.sub}</td>
            <td>{row.name}</td>
          </tr>
        ))}
        <tr ref={tableRef} style={{height: 0}}/>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
