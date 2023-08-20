import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db/db";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const todoId = parseInt(id, 10);

  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });

  if (!todo) {
    return <div>Todo not found.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center w-full p-24 ">
      <TodoItem todo={todo} />
    </div>
  );
}
