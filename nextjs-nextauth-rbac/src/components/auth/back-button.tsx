interface HeaderProps {
  label: string;
  href: string;
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BackButton = ({ label, href }: HeaderProps) => {
  return (
    <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
