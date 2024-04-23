import styles from "./TreeView.module.css";
import {useTreeViews} from "./useTressView";

function TreeView() {
  const {groupByData} = useTreeViews();


  return (
    <div className={styles.container}>
      <h2>옵션을 선택하세요.</h2>
      <input type="text" placeholder="Search..."/>
      {groupByData.map(([main, mid]) => {
        return (
          <details className={styles.tree}>
            <summary>{main}</summary>
            {Array.isArray(mid) && mid.map(([middle, sub]) => {
              // console.log(middle, sub)
              return (
                <dl>
                  <dd>
                    <details>
                      <summary>{middle}</summary>
                      {Array.isArray(sub) && sub.map(([subData, value]) => {
                        return subData.length > 0 ?(
                          <details>
                            <summary>{subData}</summary>
                            {value.map((v) => {
                              return (
                                <dl key={v.policyId}>
                                  <dd>{v.name}</dd>
                                </dl>
                              )
                            })}
                          </details>
                        ) : (
                          <>
                            {value.map((v) => {
                              return (
                                <ul key={v.policyId}>
                                  <li>{v.name}</li>
                                </ul>
                              )
                            })}
                          </>
                        )
                      })}
                    </details>
                  </dd>
                </dl>
              );
            })}
          </details>
        );
      })}
      {/*<details className={styles.tree}>*/}
      {/*  <summary>Options</summary>*/}
      {/*  <dl>*/}
      {/*    <dd>*/}
      {/*      <input type="checkbox" id="a1" />*/}
      {/*      <label htmlFor="a1">Option 1</label>*/}
      {/*      <details>*/}
      {/*        <summary>Sub Options</summary>*/}
      {/*        <dl>*/}
      {/*          <dd>*/}
      {/*            <input type="checkbox" id="a1-1" />*/}
      {/*            <label htmlFor="a1-1">Option 1-1</label>*/}
      {/*          </dd>*/}
      {/*          <dd>*/}
      {/*            <input type="checkbox" id="a1-2" />*/}
      {/*            <label htmlFor="a1-2">Option 1-2</label>*/}
      {/*          </dd>*/}
      {/*        </dl>*/}
      {/*      </details>*/}
      {/*    </dd>*/}
      {/*  </dl>*/}
      {/*</details>*/}
    </div>
  );
}

export default TreeView;
