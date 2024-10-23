import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen place-items-center ">
      <div className="flex items-center gap-4">
        <Button variant={"outline"} asChild>
          <Link href={"/login"}>Login</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href={"/register"}>Register</Link>
        </Button>
        <Button>Username : Email</Button>
      </div>
    </div>
  );
}
