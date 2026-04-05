export function VideoNotice() {
  return (
    <div className="px-8 py-6 border-b border-[#e5e5e5]">
      <div className="max-w-3xl mx-auto flex flex-col gap-1.5">
        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400">
          Video Lesson
        </p>
        <p className="text-sm" style={{ color: "#888", fontFamily: "Georgia, 'Times New Roman', serif" }}>
          A video lesson for this topic is in development. The library articles and mission exercises cover the same material in the meantime.
        </p>
      </div>
    </div>
  )
}
