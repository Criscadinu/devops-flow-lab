export default function Navbar() {
  return (
    <nav className="w-full bg-gray-950 border-b border-gray-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-white font-bold text-lg tracking-tight">
          DevOps Flow Lab
        </span>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Flow
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Feedback
          </a>
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}
