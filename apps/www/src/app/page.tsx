import Link from "next/link";

export default function Home() {
  return (
    <div>
      <button className="bg-blue-500 px-10 py-4">
        <Link href={"http://localhost:3000/auth/login"}>Login</Link>
      </button>
      <button className="bg-green-500 px-10 py-4">
        <Link href={"http://localhost:3000"}>Dashboard</Link>
      </button>
    </div>
  );
}
