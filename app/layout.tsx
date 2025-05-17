import './globals.css'
import { Bebas_Neue, Yeseva_One, Unbounded } from 'next/font/google'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

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
      <body className={`${bebasNeue.variable} ${yesevaOne.variable} ${unbounded.variable} font-sans antialiased relative`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow relative">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
            </div>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  border: '1px solid #F59E0B',
                  borderRadius: '10px',
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
