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
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useQuery(userQueryOptions());

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/90">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex w-full items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            BikuNews
          </Link>

          <nav className="hidden items-center space-x-4 md:flex">
            <Link className="hover:underline">New</Link>
            <Link className="hover:underline">Top</Link>
            <Link className="hover:underline">Submit</Link>

            {user ? (
              <div className="flex items-center gap-2">
                <span>{user}</span>
                <Button
                  asChild
                  size={"sm"}
                  variant={"secondary"}
                  className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
                >
                  <a href="api/v1/auth/logout">Logout</a>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  asChild
                  size={"sm"}
                  variant={"secondary"}
                  className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
                >
                  <Link to="/login">Login</Link>
                </Button>

                <Button asChild size={"sm"} variant={"outline"}>
                  <Link to="/signup">SignUp</Link>
                </Button>
              </>
            )}
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              <Link
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                New
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                Top
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                Submit
              </Link>

              {user ? (
                <div className="flex w-full justify-between gap-2">
                  <span>{user}</span>
                  <Button
                    asChild
                    size={"sm"}
                    variant={"secondary"}
                    className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
                    onClick={() => setIsOpen(false)}
                  >
                    <a href="api/v1/auth/logout">Logout</a>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    asChild
                    size={"sm"}
                    variant={"secondary"}
                    className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/login">Login</Link>
                  </Button>

                  <Button
                    onClick={() => setIsOpen(false)}
                    asChild
                    size={"sm"}
                    variant={"outline"}
                  >
                    <Link to="/signup">SignUp</Link>
                  </Button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
