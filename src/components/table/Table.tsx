import React from "react";
import styles from "./Table.module.css";

function Table() {
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
          <tr>
            <th scope="row">Karen</th>
            <td>Web performance</td>
            <td>36</td>
          </tr>
          <tr>
            <th scope="row">Karen</th>
            <td>Web performance</td>
            <td>36</td>
          </tr>
          <tr>
            <th scope="row">Karen</th>
            <td>Web performance</td>
            <td>36</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
