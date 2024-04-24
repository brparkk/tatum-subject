# tatumb-subject

## 기술

- React + Vite + TypeScript
- jotai, React-Query
- module.css

## 프로젝트 설명

- `Table 컴포넌트`:
    - 이 컴포넌트는 `useTable` 훅을 사용하여 테이블 데이터를 가져옵니다.
    - 가져온 데이터는 테이블의 각 행을 생성하는 데 사용됩니다.
    - 각 행은 고유한 `policyId`를 키로 사용하여 생성됩니다.

- `useTable 훅`:
    - 이 훅은 `useTableDataQuery`를 사용하여 데이터를 가져옵니다.
    - 가져온 데이터는 setTableData를 사용하여 상태를 설정합니다.
    - 또한, 필터링된 아톰 값을 사용하여 필터링된 데이터를 생성하고, 필터링된 데이터는 `setTableData`를 사용하여 상태를 업데이트합니다.
- `TreeView 컴포넌트`:
    - 이 컴포넌트는 `useTreeViews 훅`을 사용하여 트리 뷰 데이터를 가져옵니다.
    - 가져온 데이터는 각 트리 뷰 아이템을 생성하는 데 사용됩니다.
    - 각 아이템은 체크박스와 레이블을 포함하며, 체크박스의 상태 변경에 따라 필터가 추가되거나 제거됩니다.
- `useTreeViews 훅`:
    - 이 훅은 `useTableDataQuery`를 사용하여 데이터를 가져옵니다.
    - 가져온 데이터는 `Object.groupBy`를 사용하여 메인, 미들, 서브, 이름 별로 그룹화됩니다.
    - 각 그룹은 `setFiltered`를 사용하여 필터 상태를 업데이트합니다.
    - 또한, 각 트리 뷰 아이템의 토글 상태는 `handleMainToggle`, `handleMidToggle`, `handleSubToggle` 함수를 사용하여 관리됩니다.

## 실행 방법

```bash
npm install -g pnpm
pnpm install
pnpm run dev
```

## 데모

https://tatum-subject-cq3b.vercel.app/

## 테스트

(1) 각 분류별 필터 옵션 노출 테스트

- 대분류(`main`), 중분류(`middle`), 소분류(`sub`), 이름(`name`) 필터 옵션을 각각 노출하는지 확인합니다.

(2) 필터 옵션 선택 테스트

(3) 필터 적용 테스트
필터 옵션을 선택한 후, 해당 필터가 정상적으로 적용되는지 확인합니다.
필터 옵션을 선택 시, 테이블 뷰가 해당 필터에 따라 업데이트되는지 확인합니다.

(4) 필터 해제 테스트
이미 선택된 필터 옵션을 해제했을 때, 해당 필터가 정상적으로 해제되는지 확인합니다.
선택된 필터 옵션 해제시, 테이블 뷰가 업데이트되는지 확인합니다.