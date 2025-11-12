import Link from 'next/link'

export default function MeetingsPage() {
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
                <Link href="/reports" className="text-slate-700 hover:text-slate-900 font-medium">
                  Reports
                </Link>
                <Link href="/meetings" className="text-blue-600 font-medium border-b-2 border-blue-600">
                  Meetings
                </Link>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-sm text-slate-600">Role: Manager</span>
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
            <h1 className="text-3xl font-bold text-slate-900">Meeting Notes</h1>
            <p className="text-slate-600 mt-2">Track discussions and manage attachments</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            + Add Meeting Note
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Sample Meeting: Seed Round Discussion</h3>
                <p className="text-sm text-slate-600">TechStartup Inc.</p>
              </div>
              <span className="text-xs text-slate-500">Jan 15, 2025</span>
            </div>
            <p className="text-sm text-slate-700 mb-4">
              Discussed seed round investment opportunity. Key points: strong founding team, 
              innovative product in growing market, solid early traction.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">Attendees: John, Sarah, Mike</span>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <div className="text-xs text-slate-600 font-medium mb-2">Attachments (2)</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-600">📎</span>
                  <span className="text-slate-700">pitch_deck.pdf</span>
                  <span className="text-slate-500 text-xs">(2.3 MB)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-600">📎</span>
                  <span className="text-slate-700">financials_q4.xlsx</span>
                  <span className="text-slate-500 text-xs">(156 KB)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center min-h-[150px] hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-slate-600 font-medium">Add your first meeting note</p>
            <p className="text-sm text-slate-500 mt-2">Include attachments like pitch decks and financials</p>
          </div>
        </div>

        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">Meeting Notes with File Attachments</h3>
          <p className="text-sm text-purple-700 mb-3">
            Keep all your meeting notes and related files organized in one place:
          </p>
          <ul className="text-sm text-purple-700 space-y-1 list-disc list-inside">
            <li>Attach pitch decks, financial statements, and presentations</li>
            <li>Track attendees and meeting dates</li>
            <li>Link notes to specific companies</li>
            <li>Search and filter by date, company, or attendees</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
