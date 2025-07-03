import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShadeX - Cool Cities with Smart Tree Planting',
  description: 'ShadeX uses AI to identify optimal locations for tree planting, maximizing temperature reduction and environmental impact in urban areas.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
