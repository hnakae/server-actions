"use client";
// import { useState } from "react";
import { useAtom } from "jotai";
import { todosAtom } from "../jotai/atoms";
// import { useRouter } from "next/router";

import { AgGridReact } from "ag-grid-react";
// import type { RowDoubleClickedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const colDefs: any[] = [
  {
    headerName: "#",
    field: "rowIndex",
    valueGetter: "node.rowIndex + 1",
    width: 50,
  },
  {
    field: "content",
    headerName: "content",
    sortable: true,
    width: 200,
  },
];

// type Todo = {
//   id: number;
//   content: string;
// };
// type tableProps = { todos: Todo[] };

export const Table = () => {
  // const [columnDefs] = useState(colDefs);
  const [todos, setTodos] = useAtom(todosAtom);

  return (
    <div className="ag-theme-alpine" style={{ width: 500, height: 600 }}>
      <AgGridReact
        rowData={todos}
        columnDefs={colDefs}
        // onRowDoubleClicked={handleRowDoubleClicked}
      ></AgGridReact>
    </div>
  );
};

export default Table;
