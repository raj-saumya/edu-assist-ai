import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        title: "Edu Assist AI | Home",
        description: "Your AI-powered learning companion for NCERT textbooks",
      },
    ],
  }),
});

function Home() {
  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* Compact Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-afacad text-sm font-medium">
              AI-Powered Learning
            </span>
          </div>

          <h1 className="font-afacad text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-[1.1]">
            Learn Smarter
            <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
              with AI
            </span>
          </h1>

          <p className="font-afacad text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Your intelligent companion for NCERT textbooks. Get instant answers and accelerate learning.
          </p>

          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-afacad font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
          >
            Start Learning
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
      {/* Compact Features Grid */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/dashboard"
              className="group relative p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-afacad text-lg font-bold text-gray-900">Dashboard</h3>
              </div>
              <p className="font-afacad text-sm text-gray-600">Track progress and visualize your learning journey</p>
            </Link>

            <Link
              to="/chat"
              className="group relative p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-afacad text-lg font-bold text-gray-900">AI Chat</h3>
              </div>
              <p className="font-afacad text-sm text-gray-600">Get instant answers from your NCERT textbooks</p>
            </Link>

            <Link
              to="/guardian"
              className="group relative p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-afacad text-lg font-bold text-gray-900">Guardian</h3>
              </div>
              <p className="font-afacad text-sm text-gray-600">Parent dashboard to monitor child's learning</p>
            </Link>
          </div>
        </div>
      </section>
      {/* Compact Stats + CTA */}
      <section className="px-6 py-12 bg-white/30 backdrop-blur-sm border-y border-white/20">
        <div className="max-w-4xl mx-auto">
          {/* Stats Row */}
          <div className="flex justify-center items-center gap-12 mb-10">
            <div className="text-center">
              <div className="font-afacad text-2xl font-bold text-gray-900">10K+</div>
              <div className="font-afacad text-xs text-gray-600 uppercase tracking-wider">Questions</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="font-afacad text-2xl font-bold text-gray-900">15+</div>
              <div className="font-afacad text-xs text-gray-600 uppercase tracking-wider">Subjects</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="font-afacad text-2xl font-bold text-gray-900">500+</div>
              <div className="font-afacad text-xs text-gray-600 uppercase tracking-wider">Chapters</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-afacad text-2xl font-bold text-gray-900 mb-3">
              Ready to transform your learning?
            </h2>
            <p className="font-afacad text-gray-600 mb-6 max-w-md mx-auto">
              Join thousands of students learning smarter with AI.
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-afacad font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            >
              Get Started Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
