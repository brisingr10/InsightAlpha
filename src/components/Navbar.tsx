import Link from 'next/link'

interface NavbarProps {
  currentPage?: string
  userRole?: string
}

export default function Navbar({ currentPage = 'dashboard', userRole = 'Viewer' }: NavbarProps) {
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', key: 'dashboard' },
    { href: '/companies', label: 'Companies', key: 'companies' },
    { href: '/reports', label: 'Reports', key: 'reports' },
    { href: '/meetings', label: 'Meetings', key: 'meetings' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-xl font-bold text-slate-900">
              Insight Equity Alpha
            </Link>
            <div className="flex gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={
                    currentPage === link.key
                      ? 'text-blue-600 font-medium border-b-2 border-blue-600'
                      : 'text-slate-700 hover:text-slate-900 font-medium'
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-slate-600">Role: {userRole}</span>
            <button className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
