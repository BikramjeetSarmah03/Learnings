import { ExtendedUser } from "../../next-auth";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export default function UserInfo({ user, label }: UserInfoProps) {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-row items-center rounded-md justify-between border p-3 shadow-sm">
          <p className="text-sm">ID</p>
          <p className="trunate text-xs max-w-[180px] font-mono p-1 px-2 bg-slate-100 rounded-md ">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center rounded-md justify-between border p-3 shadow-sm">
          <p className="text-sm">Name</p>
          <p className="trunate text-xs max-w-[180px] font-mono p-1 px-2 bg-slate-100 rounded-md ">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center rounded-md justify-between border p-3 shadow-sm">
          <p className="text-sm">Email</p>
          <p className="trunate text-xs max-w-[180px] font-mono p-1 px-2 bg-slate-100 rounded-md ">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center rounded-md justify-between border p-3 shadow-sm">
          <p className="text-sm">Role</p>
          <p className="trunate text-xs max-w-[180px] font-mono p-1 px-2 bg-slate-100 rounded-md ">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center rounded-md justify-between border p-3 shadow-sm">
          <p className="text-sm">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
