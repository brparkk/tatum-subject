import styles from "./TreeView.module.css";
import {useTreeViews} from "./useTressView.ts";
import {TTableData} from "../../../../@types/tableType.ts";

function TreeView() {
  const {
    filtered,
    addFilter,
    removeFilter,
    addAllFilter,
    removeAllFilter,
    resetFilter,
    groupByData,
    isMainOpened,
    isMidOpened,
    isSubOpened,
    handleMainToggle,
    handleMidToggle,
    handleSubToggle,
  } = useTreeViews();

  console.log(filtered, "filtered")

  return (
    <div className={styles.container}>
      <h2>옵션을 선택하세요.</h2>
      <input type="text" placeholder="Search..."/>
      {groupByData.map(([main, mid], index) => {
        return (
          <details className={styles.tree} onToggle={handleMainToggle(index)}>
            <summary>
              <input type={"checkbox"} id={main as string} onChange={(e) => {
                if (e.target.checked) {
                  addFilter("main", main)
                } else {
                  removeFilter("main", main)
                }
              }}/>
              <label htmlFor={main as string} className={styles[`${isMainOpened[index] ? "open" : ""}`]}>
                <span>{main}</span>
              </label>
            </summary>
            {Array.isArray(mid) && mid.map(([middle, sub], idx) => {
              return (
                <dl>
                  <dd>
                    <details key={middle + idx} onToggle={handleMidToggle(idx)}>
                      <summary>
                        <input type={"checkbox"} id={middle as string} onChange={e => {
                          if (e.target.checked) {
                            addFilter("middle", middle)
                          } else {
                            removeFilter("middle", middle)
                          }
                        }}/>
                        <label htmlFor={middle as string} className={styles[`${isMidOpened[idx] ? "open" : ""}`]}>
                          <span>{middle}</span>
                        </label>
                      </summary>
                      {Array.isArray(sub) && sub.map(([subData, value], i) => {
                        return subData.length > 0 ? (
                          <details key={subData + i} className={styles["sub-details"]} onToggle={handleSubToggle(i)}>
                            <summary>
                              <input type={"checkbox"} id={subData as string}
                                     className={styles[`${isSubOpened[i] ? "open" : ""}`]} onChange={e => {
                                if (e.target.checked) {
                                  addFilter("sub", subData)
                                } else {
                                  removeFilter("sub", subData)
                                }
                              }}/>
                              <label htmlFor={subData as string}>
                                <span>{subData}</span>
                              </label>
                            </summary>
                            {value.map((v: TTableData) => {
                              return (
                                <dl key={subData + v.policyId}>
                                  <dd>
                                    <input type={"checkbox"} id={v.name as string} onChange={e => {
                                      if (e.target.checked) {
                                        removeAllFilter("main")
                                        removeAllFilter("middle")
                                        removeAllFilter("sub")
                                        addFilter("name", v.name)
                                      } else {
                                        removeFilter("name", v.name)
                                      }
                                    }}/>
                                    <label htmlFor={v.name} className={"name-label"}>{v.name}</label>
                                  </dd>
                                </dl>
                              )
                            })}
                          </details>
                        ) : (
                          <>
                            {value.map((v: TTableData) => {
                              return (
                                <ul key={v.policyId}>
                                  <li>
                                    <input type={"checkbox"} id={v.name as string} onChange={e => {
                                      if (e.target.checked) {
                                        removeAllFilter("main")
                                        removeAllFilter("middle")
                                        removeAllFilter("sub")
                                        addFilter("name", v.name)
                                      } else {
                                        removeFilter("name", v.name)
                                      }
                                    }}/>
                                    <label htmlFor={v.name} className={"name-label"}>{v.name}</label>
                                  </li>
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
    </div>
  );
}

export default TreeView;
