import type {Metadata} from 'next'
import './globals.css'
import '../styles/globals.scss'
import {AuthProvider} from '@/context/AuthContext'

export const metadata: Metadata = {
    title: 'Auth Dashboard',
    description: 'Secure authentication and dashboard system',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}
