"use server";

import { redirect } from "next/navigation";
import { LoginForm } from "~/components/LoginForm";
import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
