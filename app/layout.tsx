import './globals.css'
import { Bebas_Neue, Yeseva_One, Unbounded } from 'next/font/google'

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
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${bebasNeue.variable} ${yesevaOne.variable} ${unbounded.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
