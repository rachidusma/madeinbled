import '../globals.css'

export const metadata = {
  title: 'Made In Bled - Admin Login',
  description: 'Admin Login',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
