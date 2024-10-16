import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Orbitron, Roboto_Mono, Poppins, Playfair_Display } from 'next/font/google'
import { Providers } from './providers'
import './global.css'

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Insightia - AI-Powered Startup Idea Evaluation',
  description: 'Evaluate your startup ideas with AI-driven insights and market analysis.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${robotoMono.variable} ${poppins.variable} ${playfair.variable}`}>
      <body className={`font-sans bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white`}>
        <UserProvider>
          <Providers>{children}</Providers>
        </UserProvider>
      </body>
    </html>
  )
}