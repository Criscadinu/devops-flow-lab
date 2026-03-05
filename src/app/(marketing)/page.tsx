export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
          DevOps Flow Lab
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Master DevOps practices through hands-on exercises, real pipelines,
          and instant feedback.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-left hover:border-gray-600 transition-colors">
            <div className="text-blue-400 text-2xl mb-4">&#8594;</div>
            <h2 className="text-xl font-semibold text-white mb-2">Flow</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Follow guided DevOps workflows from commit to production. Learn CI/CD,
              infrastructure as code, and deployment strategies step by step.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-left hover:border-gray-600 transition-colors">
            <div className="text-green-400 text-2xl mb-4">&#10003;</div>
            <h2 className="text-xl font-semibold text-white mb-2">Feedback</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get instant, actionable feedback on your DevOps practices. Identify
              gaps, track progress, and improve with every iteration.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
