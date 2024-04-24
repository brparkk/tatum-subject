import {Suspense} from "react";
import TreeView from "./components/treeview/TreeView.tsx";
import Table from "./components/table/Table.tsx";
import Loading from "../../Loading.tsx";
import styles from "./Home.module.css"

function Home() {
  return (
    <div className={styles.container}>
      <TreeView/>
      <Suspense fallback={<Loading/>}>
        <Table/>
      </Suspense>
    </div>
  );
}

export default Home;