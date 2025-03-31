import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Windows 10 Sneltoetsen | Handige Toetsencombinaties',
	description: 'Ontdek alle handige Windows 10 sneltoetsen om je dagelijkse taken efficiënter uit te voeren.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='nl'>
			<head>
				<link
					rel='icon'
					href='/favicon.ico'
					sizes='any'
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	)
}
