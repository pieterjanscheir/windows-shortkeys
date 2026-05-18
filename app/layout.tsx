import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import { OS_INIT_SCRIPT } from './_components/OsContext'
import { Providers } from './_components/Providers'
import { SiteHeader } from './_components/SiteHeader'
import { SiteFooter } from './_components/SiteFooter'
import { Toaster } from '@/components/ui/sonner'
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://windows-sneltoetsen.vercel.app'

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: 'shortkeys · Sneltoetsen voor Microsoft Windows & macOS',
		template: '%s · shortkeys',
	},
	description:
		'shortkeys is dé Nederlandstalige gids met sneltoetsen voor Microsoft Windows én macOS. Wissel met één klik tussen besturingssystemen en doorzoek toetsencombinaties voor vensters, Snap Layouts, Widgets, virtuele bureaubladen, schermafdrukken en meer.',
	applicationName: 'shortkeys',
	authors: [{ name: 'Pieter-Jan Scheir', url: 'https://scheir.eu' }],
	creator: 'Pieter-Jan Scheir',
	publisher: 'Pieter-Jan Scheir',
	generator: 'Next.js',
	keywords: [
		'Microsoft Windows sneltoetsen',
		'Windows sneltoetsen',
		'Mac sneltoetsen',
		'macOS sneltoetsen',
		'Windows vs Mac shortcuts',
		'toetsencombinaties Microsoft Windows',
		'keyboard shortcuts Nederlands',
		'Snap Layouts',
		'Mission Control sneltoetsen',
		'Widgets sneltoets',
		'Cmd Command Mac',
		'Win toets',
		'virtuele bureaubladen',
		'Spaces macOS',
		'schermafdruk Windows',
		'screenshot Mac',
		'Klembordgeschiedenis',
		'Knipprogramma',
	],
	category: 'technology',
	referrer: 'origin-when-cross-origin',
	formatDetection: { email: false, address: false, telephone: false },
	alternates: {
		canonical: '/',
		languages: { 'nl-BE': '/', 'nl-NL': '/' },
	},
	openGraph: {
		type: 'website',
		locale: 'nl_BE',
		url: siteUrl,
		siteName: 'shortkeys',
		title: 'shortkeys · Sneltoetsen voor Microsoft Windows & macOS',
		description:
			'Alle Microsoft Windows en macOS sneltoetsen op één pagina. Doorzoekbaar, gesorteerd op niveau en categorie. Wissel tussen besturingssystemen met één klik.',
		images: [
			{
				url: '/android-chrome-512x512.png',
				width: 512,
				height: 512,
				alt: 'shortkeys',
			},
		],
	},
	twitter: {
		card: 'summary',
		title: 'shortkeys · Sneltoetsen voor Microsoft Windows & macOS',
		description:
			'Alle Microsoft Windows en macOS sneltoetsen op één pagina. Wissel tussen Windows en macOS met één klik.',
		images: ['/android-chrome-512x512.png'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	icons: {
		icon: [
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
		],
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
	manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f5e6c8' },
		{ media: '(prefers-color-scheme: dark)', color: '#1a2233' },
	],
	width: 'device-width',
	initialScale: 1,
}

const initScripts = OS_INIT_SCRIPT

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${siteUrl}/#website`,
				url: siteUrl,
				name: 'shortkeys',
				description:
					'Complete Nederlandstalige gids met alle Microsoft Windows en macOS sneltoetsen, doorzoekbaar en gesorteerd op niveau en categorie.',
				inLanguage: 'nl-BE',
				publisher: {
					'@type': 'Person',
					name: 'Pieter-Jan Scheir',
					url: 'https://scheir.eu',
				},
				potentialAction: {
					'@type': 'SearchAction',
					target: `${siteUrl}/?q={search_term_string}`,
					'query-input': 'required name=search_term_string',
				},
			},
			{
				'@type': 'WebPage',
				'@id': `${siteUrl}/#webpage`,
				url: siteUrl,
				name: 'shortkeys · Sneltoetsen voor Microsoft Windows & macOS',
				isPartOf: { '@id': `${siteUrl}/#website` },
				inLanguage: 'nl-BE',
				about: [
					{ '@type': 'Thing', name: 'Microsoft Windows keyboard shortcuts' },
					{ '@type': 'Thing', name: 'macOS keyboard shortcuts' },
				],
			},
		],
	}

	return (
		<html lang='nl-BE' data-os='windows' suppressHydrationWarning className={cn("font-sans", inter.variable)}>
			<head>
				<script dangerouslySetInnerHTML={{ __html: initScripts }} />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
				<a
					href='#main'
					className='sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-card focus:text-[--ghibli-brown] focus:px-3 focus:py-2 focus:rounded-md focus:shadow'
				>
					Naar inhoud
				</a>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<Providers>
					<SiteHeader />
					<main id='main' className='flex-1'>
						{children}
					</main>
					<SiteFooter />
					<Toaster position='bottom-center' richColors />
				</Providers>
			</body>
		</html>
	)
}
