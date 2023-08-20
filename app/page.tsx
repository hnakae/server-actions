import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        href="/todos"
        className="p-4 outline cursor-pointer rounded-full w-32 flex justify-center hover:shadow-2xl"
      >
        App
      </Link>
    </main>
  );
}
