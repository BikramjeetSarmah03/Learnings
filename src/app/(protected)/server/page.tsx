import UserInfo from "@/components/user-info";
import { currentUser } from "@/lib/user";

export default async function ServerPage() {
  const user = await currentUser();

  return <UserInfo label="💻 Server Component" user={user} />;
}
