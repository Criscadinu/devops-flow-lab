import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav
      className="w-full sticky top-0 z-50 px-6 py-4 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        borderBottom: "1px solid rgba(6, 182, 212, 0.12)",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <a href="/" className="text-white font-bold text-lg tracking-tight">
          DevOps <span className="text-cyan-400">Flow Lab</span>
        </a>

        <div className="flex items-center gap-7">
          <a
            href="/#hoe-het-werkt"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            How it works
          </a>
          <a
            href="/#missies"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Missions
          </a>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                {user.name ?? user.email}
              </span>
              <a
                href="/api/auth/signout"
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                Sign out
              </a>
            </div>
          ) : (
            <a
              href="/api/auth/signin"
              className="bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold px-5 py-2 transition-colors"
            >
              Start for free
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
