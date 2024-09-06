import Link from "next/link";

export default function Home() {
  return (
    <div>
      <button className="bg-blue-500 px-10 py-4">
        <Link href={"http://app.localhost:3001/login"}>Login</Link>
      </button>
      <button className="bg-blue-500 px-10 py-4">
        <Link href={"http://app.localhost:3001"}>Dashboard</Link>
      </button>
    </div>
  );
}
