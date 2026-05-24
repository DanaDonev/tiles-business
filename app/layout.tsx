import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tiles Business - Premium Tiles for Every Space',
  description: 'Discover our premium collection of tiles for bathrooms, kitchens, and outdoor spaces',
  keywords: 'tiles, bathroom tiles, kitchen tiles, outdoor tiles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
