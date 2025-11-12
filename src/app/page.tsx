import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900">Insight Equity Alpha</h1>
            </div>
            <div className="flex gap-4">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            AI-Powered VC Research Platform
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Streamline your venture capital research with intelligent startup analysis,
            AI-generated reports, and comprehensive data management.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
              <div className="text-blue-600 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Startup Research
              </h3>
              <p className="text-slate-600">
                Comprehensive company profiles with industry insights and funding data
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
              <div className="text-blue-600 text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                AI Reports
              </h3>
              <p className="text-slate-600">
                Generate detailed research reports powered by advanced AI
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
              <div className="text-blue-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Data Management
              </h3>
              <p className="text-slate-600">
                Organize companies, notes, and attachments in Airtable-style tables
              </p>
            </div>
          </div>

          <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Role-Based Access Control
            </h3>
            <div className="grid md:grid-cols-4 gap-6 mt-6">
              <div className="text-center">
                <div className="bg-slate-100 p-4 rounded-lg mb-2">
                  <p className="font-semibold text-slate-900">Viewer</p>
                </div>
                <p className="text-sm text-slate-600">Read-only access</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-lg mb-2">
                  <p className="font-semibold text-blue-900">Analyst</p>
                </div>
                <p className="text-sm text-slate-600">View & create reports</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-lg mb-2">
                  <p className="font-semibold text-purple-900">Manager</p>
                </div>
                <p className="text-sm text-slate-600">Edit & manage data</p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg mb-2">
                  <p className="font-semibold text-red-900">Admin</p>
                </div>
                <p className="text-sm text-slate-600">Full system access</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 font-semibold shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-600">
            © 2025 Insight Equity Alpha. Built with Next.js, Supabase, and Prisma.
          </p>
        </div>
      </footer>
    </div>
  );
}
