import { Link } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/90">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            BikuNews
          </Link>

          <nav className="hidden items-center space-x-4 md:flex">
            <Link className="hover:underline">New</Link>
            <Link className="hover:underline">Top</Link>
            <Link className="hover:underline">Submit</Link>
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"secondary"} size={"icon"} className="md:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="mb-2">
            <SheetHeader>
              <SheetTitle>BikuNews</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-4 flex flex-col space-y-4">
              <Link className="hover:underline">New</Link>
              <Link className="hover:underline">Top</Link>
              <Link className="hover:underline">Submit</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
