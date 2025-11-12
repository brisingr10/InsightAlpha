import Link from 'next/link'

export default function ReportsPage() {
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
                <Link href="/dashboard" className="text-slate-700 hover:text-slate-900 font-medium">
                  Dashboard
                </Link>
                <Link href="/companies" className="text-slate-700 hover:text-slate-900 font-medium">
                  Companies
                </Link>
                <Link href="/reports" className="text-blue-600 font-medium border-b-2 border-blue-600">
                  Reports
                </Link>
                <Link href="/meetings" className="text-slate-700 hover:text-slate-900 font-medium">
                  Meetings
                </Link>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-sm text-slate-600">Role: Analyst</span>
              <button className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Research Reports</h1>
            <p className="text-slate-600 mt-2">AI-powered startup analysis and insights</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
              + Create Report
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
              <span>🤖</span> Generate AI Report
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Sample AI Report</h3>
                <p className="text-sm text-slate-600">Tech Startup Analysis</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">AI Generated</span>
            </div>
            <p className="text-sm text-slate-600 mb-4 line-clamp-3">
              This is a sample report demonstrating AI-powered analysis capabilities. 
              Real reports will include market analysis, competitive landscape, and investment recommendations.
            </p>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Created: Today</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium">View →</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center min-h-[200px] hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-slate-600 font-medium">Create your first report</p>
            <p className="text-sm text-slate-500 mt-2">Or generate one using AI</p>
          </div>
        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">AI-Powered Report Generation</h3>
          <p className="text-sm text-green-700 mb-3">
            Our AI analyzes company data, market trends, and competitive landscape to generate comprehensive research reports automatically.
          </p>
          <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
            <li>Market opportunity analysis</li>
            <li>Competitive positioning</li>
            <li>Investment thesis and recommendations</li>
            <li>Risk assessment</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
