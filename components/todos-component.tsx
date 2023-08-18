"use client";
import { experimental_useOptimistic as useOptimistic, useRef } from "react";
import { addTodo, deleteTodo, updateTodo } from "@/actions/actions";
import Button from "./Button";
import Link from "next/link";

type Todo = {
  id: number;
  content: string;
};

type TodosComponentProps = {
  todos: Todo[];
};

const TodosComponent = ({ todos }: TodosComponentProps) => {
  const ref = useRef<HTMLFormElement>(null);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => {
      //reducer pattern
      return [...state, newTodo];
    }
  );

  const deleteTodoHandler = (todoId: number) => {
    deleteTodo(todoId);
  };

  return (
    <>
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();
          //input validation with zod
          addOptimisticTodo({
            id: Math.random(),
            content: formData.get("content") as string,
          });
          await addTodo(formData);
          // const { error } = await addTodo(formData);
          // if (error) {
          //   alert(error.message);
          // }
        }}
        className="flex flex-col w-[300px] my-16"
      >
        <input
          type="text"
          name="content"
          className="px-4 py-2 mb-3"
          placeholder="Write your todo..."
          required
        />

        <Button />
      </form>

      <ul>
        {optimisticTodos.map((todo) => (
          <li className="cursor-pointer" key={todo.id}>
            <span
              className="cursor-pointer hover:font-bold p-4"
              onClick={() => deleteTodoHandler(todo.id)}
            >
              X{" "}
            </span>
            <span
              className="cursor-pointer hover:font-bold p-4"
              onClick={() => {
                const newContent = window.prompt(
                  "enter new content",
                  todo.content
                );
                if (newContent !== null) {
                  updateTodo(todo.id, newContent);
                }
              }}
            >
              edit{" "}
            </span>
            <Link href={`/todos/${todo.content}`}>{todo.content}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodosComponent;
