"use server";

import { prisma } from "@/db/db";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData: FormData) => {
  const content = formData.get("content");

  try {
    await prisma.todo.create({
      data: {
        content: content as string,
      },
    });
  } catch (e) {
    //     return { error: e };
  }

  revalidatePath("/todos");
};

export const deleteTodo = async (todoId: number) => {
  // const content = formData.get("content");

  try {
    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  } catch (e) {
    //     return { error: e };
  }

  revalidatePath("/todos");
};

export const updateTodo = async (todoId: number, newContent: string) => {
  // const content = formData.get("content");

  try {
    await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        content: newContent,
      },
    });
  } catch (e) {
    //     return { error: e };
  }

  revalidatePath("/todos");
};
