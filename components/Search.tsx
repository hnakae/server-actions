"use client";
import {
  experimental_useOptimistic as useOptimistic,
  useRef,
  useEffect,
} from "react";
import { searchTodo } from "@/actions/actions";
import Button from "./Button";

import { useAtom } from "jotai";
import { todosAtom } from "../jotai/atoms";

type Todo = {
  id: number;
  content: string;
};
export default function Search() {
  const [todos, setTodos] = useAtom(todosAtom);

  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="mt-4">
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();
          const content = formData.get("content") as string;
          const todos = await searchTodo(content);
          console.log(todos);
          if (!!todos) {
            setTodos(todos);
          }
        }}
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
  );
}
