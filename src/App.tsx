import React from "react";
import "./App.css";
import Table from "./components/table/Table";
import TreeView from "./components/treeview/TreeView";

function App() {
  return (
    <div className="container">
      <TreeView />
      <Table />
    </div>
  );
}

export default App;
