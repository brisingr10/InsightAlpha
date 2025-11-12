import Link from 'next/link'

export default function CompaniesPage() {
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
                <Link href="/companies" className="text-blue-600 font-medium border-b-2 border-blue-600">
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Companies</h1>
            <p className="text-slate-600 mt-2">Manage your startup portfolio</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            + Add Company
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Funding Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Employees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No companies found. Click &quot;Add Company&quot; to get started.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Airtable-Style Data Management</h3>
          <p className="text-sm text-blue-700">
            This table view allows you to manage company data with sorting, filtering, and inline editing capabilities.
            Add custom fields, track funding rounds, and organize your portfolio efficiently.
          </p>
        </div>
      </main>
    </div>
  )
}
