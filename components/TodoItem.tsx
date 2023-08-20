"use client";
import { deleteTodo, updateTodo } from "@/actions/actions";
import { Todo } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const deleteTodoHandler = (todoId: number) => {
    deleteTodo(todoId);
  };
  const toggleCheckbox = () => {
    const newToggledValue = !todo.toggled;

    // Update the "toggled" state of the todo item
    updateTodo(todo.id, todo.content, newToggledValue);
  };
  return (
    <>
      <div className=" outline p-4 mb-2">
        {" "}
        <li className="cursor-pointer">
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
                updateTodo(todo.id, newContent, todo.toggled);
              }
            }}
          >
            edit{" "}
          </span>
          <Link href={`/todos/${todo.id}`}>{todo.content}</Link>
          <input
            type="checkbox"
            className="mx-4"
            checked={todo.toggled}
            onChange={toggleCheckbox}
          />
        </li>
      </div>
    </>
  );
}
