"use server";

import { prisma } from "@/db/db";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData: FormData) => {
  const content = formData.get("content");

  try {
    await prisma.todo.create({
      data: {
        content: content as string,
        toggled: false,
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

export const updateTodo = async (
  todoId: number,
  newContent: string,
  toggled: boolean
) => {
  // const content = formData.get("content");

  try {
    await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        content: newContent,
        toggled: toggled,
      },
    });
  } catch (e) {
    //     return { error: e };
  }

  revalidatePath("/todos");
};

// export const searchTodo = async (formData: FormData) => {
//   const content = formData.get("content");
//   try {
//     const result = await prisma.todo.findMany({
//       where: {
//         content: {
//           contains: content as string,
//         },
//       },
//     });
//     return result;
//   } catch (e) {
//     //     return { error: e };
//   }

//   revalidatePath("/todos");
// };
export const searchTodo = async (content: string) => {
  try {
    const result = await prisma.todo.findMany({
      where: {
        content: {
          contains: content as string,
        },
      },
    });
    return result;
  } catch (e) {
    //     return { error: e };
  }

  revalidatePath("/todos");
};
