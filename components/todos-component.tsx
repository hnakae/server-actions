"use client";
import { experimental_useOptimistic as useOptimistic, useRef } from "react";
import { addTodo, deleteTodo, updateTodo } from "@/actions/actions";
import Button from "./Button";
import Link from "next/link";
import { Todo } from "@prisma/client";
import TodoItem from "./TodoItem";

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
            toggled: false,
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
          <div key={todo.id}>
            <TodoItem todo={todo} />
          </div>
        ))}
      </ul>
    </>
  );
};

export default TodosComponent;
