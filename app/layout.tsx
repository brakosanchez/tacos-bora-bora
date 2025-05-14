import './globals.css'
import { Bebas_Neue, Yeseva_One, Unbounded } from 'next/font/google'
import Navbar from './components/Navbar'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas'
})

const yesevaOne = Yeseva_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-yeseva'
})

const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-unbounded'
})

export const metadata = {
  title: 'Tacos Bora Bora',
  description: 'La mejor taquería con auténtico sabor tropical',
  metadataBase: new URL('https://www.tacosborabora.com'),
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    title: 'Tacos Bora Bora',
    description: 'La mejor taquería con auténtico sabor tropical',
    url: 'https://www.tacosborabora.com',
    siteName: 'Tacos Bora Bora',
    images: [
      {
        url: '/images/Logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${bebasNeue.variable} ${yesevaOne.variable} ${unbounded.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <Navbar />
        </div>
      </body>
    </html>
  )
}
