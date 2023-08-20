import { prisma } from "@/db/db";
import TodosComponent from "@/components/todos-component";
import { Table } from "@/components/Table";
import Search from "@/components/Search";

export default async function TodosPage() {
  const todos = await prisma.todo.findMany();

  // Map todos data to match the structure expected by the Table component
  // const tableData = todos.map((todo) => ({
  //   id: todo.id,
  //   content: todo.content,
  //   // Add other properties specific to your Table component here
  // }));

  return (
    <>
      <main className="flex min-h-screen flex-col items-center w-full p-24">
        <h1 className="text-2xl font-bold">Todos CRUD w/ server actions</h1>

        <TodosComponent todos={todos} />

        <Search />
        <Table />
        {/* <Table2 /> */}
      </main>
    </>
  );
}
