import { authClient } from "@/lib/auth-client";
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: MainLayout,
});

function MainLayout() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        {!session?.user ? (
          <>
            <Link to="/login" className="[&.active]:font-bold">
              Login
            </Link>
            <Link to="/register" className="[&.active]:font-bold">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="[&.active]:font-bold">
              Profile
            </Link>
            <button
              onClick={async () => {
                await authClient.signOut();
                navigate({ to: "/login" });
              }}
            >
              SignOut
            </button>
          </>
        )}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
