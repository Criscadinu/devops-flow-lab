import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {session.user.name ?? session.user.email}
        </h1>
        <p className="text-gray-400 mb-8">You are signed in to DevOps Flow Lab.</p>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
