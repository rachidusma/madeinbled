import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import AdminSidebar from '@/components/admin/Sidebar'
import '../globals.css'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-50">
          <AdminSidebar />
          <main className="flex-1 overflow-auto">
            {/* Stitch Loop Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dashboardStitchPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path 
                      d="M0 20 Q10 15, 20 20 T40 20" 
                      stroke="#FE6B01" 
                      strokeWidth="2" 
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dashboardStitchPattern)" />
              </svg>
            </div>
            
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
