import { auth } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await auth();

  return <div>SettingsPage: {JSON.stringify(session)}</div>;
}
