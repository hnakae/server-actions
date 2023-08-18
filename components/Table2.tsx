"use client";
import { useState, useRef, useEffect } from "react";
import { searchTodo } from "@/actions/actions";
// import { useAtom } from "jotai";
// import { todosAtom } from "../jotai/atoms";
// import { useRouter } from "next/router";

import { AgGridReact } from "ag-grid-react";
// import type { RowDoubleClickedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "./Button";

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
  const [todos, setTodos] = useState<{}[]>([]);
  //   const [todos, setTodos] = useAtom(todosAtom);

  const ref = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    ref.current?.reset();
    const content = formData.get("content") as string;
    const todos = await searchTodo(content);
    console.log(todos);
    if (!!todos) {
      setTodos(todos);
    }
  };

  //   useEffect(() => {
  //     // console.log(todos);
  //   }, [todos]);

  return (
    <>
      {" "}
      <div className="mt-4">
        <form
          ref={ref}
          action={handleAction}
          className="flex flex-col w-[300px] my-16"
        >
          <label>targeted query: </label>

          <input
            type="text"
            name="content"
            className="px-4 py-2 mb-3"
            placeholder="Filtered search..."
            required
          />
          <Button />
        </form>
      </div>
      <div className="ag-theme-alpine" style={{ width: 500, height: 600 }}>
        <AgGridReact
          rowData={todos}
          columnDefs={colDefs}
          // onRowDoubleClicked={handleRowDoubleClicked}
        ></AgGridReact>
      </div>
    </>
  );
};

export default Table;
