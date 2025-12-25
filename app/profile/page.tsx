import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/server";
import ProfileView from "./ProfileView";

export default async function ProfilePage() {
  // Server-side auth check
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfileView user={user} />;
}
