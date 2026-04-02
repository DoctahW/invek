import type { Metadata } from "next";
import { db } from "@/db";

export const metadata: Metadata = { title: "Perfil" };
import { user } from "@/db/auth-schema";
import ProfileClient from "./ProfileClient";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const [userData] = await db.select().from(user).limit(1);
  if (!userData) redirect("/login");

  return (
    <ProfileClient
      initialName={userData.name}
      email={userData.email}
      createdAt={userData.createdAt.toISOString()}
    />
  );
}
