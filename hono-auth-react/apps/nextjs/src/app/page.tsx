import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen gap-8">
      <Button>
        <Link href={"/login"}>Login</Link>
      </Button>
      <Button variant={"outline"}>
        <Link href={"/register"}>Register</Link>
      </Button>
      <Button variant={"outline"}>
        <Link href={"/profile"}>Profile</Link>
      </Button>
    </div>
  );
}
