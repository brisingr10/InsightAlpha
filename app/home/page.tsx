import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Insight Equity Alpha
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Hello, {user.name || user.email}!
          </p>
          <p className="text-gray-500">
            Role: <span className="font-medium text-gray-700">{user.role}</span>
          </p>
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              This is the home page. The full dashboard and features are being built according to the development plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
