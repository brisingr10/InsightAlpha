import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-xl font-bold text-slate-900">
                Insight Equity Alpha
              </Link>
              <div className="flex gap-4">
                <Link href="/dashboard" className="text-blue-600 font-medium border-b-2 border-blue-600">
                  Dashboard
                </Link>
                <Link href="/companies" className="text-slate-700 hover:text-slate-900 font-medium">
                  Companies
                </Link>
                <Link href="/reports" className="text-slate-700 hover:text-slate-900 font-medium">
                  Reports
                </Link>
                <Link href="/meetings" className="text-slate-700 hover:text-slate-900 font-medium">
                  Meetings
                </Link>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-sm text-slate-600">Role: Viewer</span>
              <button className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome to your VC research workspace</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Total Companies</div>
            <div className="text-3xl font-bold text-slate-900">0</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Reports</div>
            <div className="text-3xl font-bold text-slate-900">0</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Meeting Notes</div>
            <div className="text-3xl font-bold text-slate-900">0</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">AI Reports</div>
            <div className="text-3xl font-bold text-slate-900">0</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/companies"
                className="block px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium"
              >
                + Add New Company
              </Link>
              <Link
                href="/reports"
                className="block px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium"
              >
                + Generate AI Report
              </Link>
              <Link
                href="/meetings"
                className="block px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 font-medium"
              >
                + Add Meeting Note
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
            <div className="text-center py-8 text-slate-500">
              No recent activity
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
