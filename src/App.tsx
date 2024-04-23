import React, { Suspense } from "react";
import "./App.css";
import Table from "./components/table/Table";
import TreeView from "./components/treeview/TreeView";
import Loading from "./Loading";

function App() {
  return (
    <div className="container">
      <TreeView />
      <Suspense fallback={<Loading />}>
        <Table />
      </Suspense>
    </div>
  );
}

export default App;
