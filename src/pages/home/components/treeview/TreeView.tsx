import styles from "./TreeView.module.css";
import { useTreeViews } from "./useTressView.ts";
import { TTableData } from "../../../../@types/tableType.ts";
import { useAtomValue } from "jotai";
import { table_atom } from "../../../../store/atoms/index.ts";

function TreeView() {
  const {
    data,
    filtered,
    addFilter,
    removeFilter,
    // addAllFilter,
    removeAllFilter,
    // resetFilter,
    groupByData,
    isMainOpened,
    isMidOpened,
    isSubOpened,
    handleMainToggle,
    handleMidToggle,
    handleSubToggle,
  } = useTreeViews();

  const tableAtom = useAtomValue(table_atom);

  return (
    <div className={styles.container}>
      <h2>옵션을 선택하세요.</h2>
      <input type="text" placeholder="Search..." />
      {groupByData.map(([main, mid], index) => {
        return (
          <details className={styles.tree} onToggle={handleMainToggle(index)}>
            <summary>
              <input
                type={"checkbox"}
                id={main as string}
                onChange={(e) => {
                  if (e.target.checked) {
                    addFilter("main", main);
                  } else {
                    removeFilter("main", main);
                  }
                }}
              />
              <label
                htmlFor={main as string}
                className={styles[`${isMainOpened[index] ? "open" : ""}`]}
              >
                <span>{main as string}</span>
              </label>
            </summary>
            {Array.isArray(mid) &&
              mid.map(([middle, sub], idx) => {
                return (
                  <dl>
                    <dd>
                      <details key={idx} onToggle={handleMidToggle(idx)}>
                        <summary>
                          <input
                            type={"checkbox"}
                            id={middle as string}
                            onChange={(e) => {
                              if (e.target.checked) {
                                // removeAllFilter("main");
                                addFilter("middle", middle);
                              } else {
                                removeFilter("middle", middle);
                              }
                            }}
                          />
                          <label
                            htmlFor={middle as string}
                            className={
                              styles[`${isMidOpened[idx] ? "open" : ""}`]
                            }
                          >
                            <span>{middle as string}</span>
                          </label>
                        </summary>
                        {Array.isArray(sub) &&
                          sub.map(([subData, value], i) => {
                            return subData.length > 0 ? (
                              <details
                                key={subData + i}
                                className={styles["sub-details"]}
                                onToggle={handleSubToggle(i)}
                              >
                                <summary>
                                  <input
                                    type={"checkbox"}
                                    id={subData as string}
                                    className={
                                      styles[`${isSubOpened[i] ? "open" : ""}`]
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        // removeAllFilter("main");
                                        // removeAllFilter("middle");
                                        addFilter("sub", subData);
                                      } else {
                                        removeFilter("sub", subData);
                                      }
                                    }}
                                  />
                                  <label htmlFor={subData as string}>
                                    <span>{subData}</span>
                                  </label>
                                </summary>
                                {value.map((v: TTableData) => {
                                  return (
                                    <dl key={subData + v.policyId}>
                                      <dd>
                                        <input
                                          type={"checkbox"}
                                          id={v.name as string}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              removeAllFilter("main");
                                              removeAllFilter("middle");
                                              removeAllFilter("sub");
                                              addFilter("name", v.name);
                                            } else {
                                              removeFilter("name", v.name);
                                            }
                                          }}
                                        />
                                        <label
                                          htmlFor={v.name}
                                          className={"name-label"}
                                        >
                                          {v.name}
                                        </label>
                                      </dd>
                                    </dl>
                                  );
                                })}
                              </details>
                            ) : (
                              <>
                                {value.map((v: TTableData) => {
                                  return (
                                    <ul key={v.policyId}>
                                      <li>
                                        <input
                                          type={"checkbox"}
                                          id={v.name as string}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              addFilter("name", v.name);
                                            } else {
                                              removeFilter("name", v.name);
                                            }
                                          }}
                                        />
                                        <label
                                          htmlFor={v.name}
                                          className={"name-label"}
                                        >
                                          {v.name}
                                        </label>
                                      </li>
                                    </ul>
                                  );
                                })}
                              </>
                            );
                          })}
                      </details>
                    </dd>
                  </dl>
                );
              })}
          </details>
        );
      })}
      <br />

      <div>
        <h4>선택된 옵션</h4>
        <div className={styles.selected}>
          <span style={{ color: "blue" }}>{tableAtom.length}</span> /
          {data?.length} seleted
        </div>
        <hr />
        <div className={styles.selectbox}>
          {/* main */}
          {filtered.main.map((item) => (
            <div className={styles.selected}>
              <b>{item}</b>:all ({filtered.main.length})
            </div>
          ))}
          {/* middle */}
          {filtered.middle.map((item) => (
            <div className={styles.selected}>
              <b>{item}</b> ({filtered.middle.length})
            </div>
          ))}

          {/* sub */}
          {filtered.sub.map((item) => (
            <div className={styles.selected}>
              <b>{item}</b> ({filtered.sub.length})
            </div>
          ))}

          {/* name */}
          {filtered.name.map((item) => (
            <div className={styles.selected}>
              <b>{item}</b> ({filtered.name.length})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TreeView;
