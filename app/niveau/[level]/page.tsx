import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
	complexityBySlug,
	complexityDescriptions,
	complexityLabels,
	complexitySlugs,
	shortkeysByComplexity,
	type ComplexityLevel,
} from '@/lib/shortkeys'
import { ShortkeyCard } from '@/app/_components/ShortkeyCard'
import { Button } from '@/components/ui/button'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export function generateStaticParams() {
	return Object.values(complexitySlugs).map((level) => ({ level }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ level: string }>
}): Promise<Metadata> {
	const { level } = await params
	const lvl = complexityBySlug[level]
	if (!lvl) return { title: 'Niveau niet gevonden' }
	const label = complexityLabels[lvl]
	const description = `${complexityDescriptions[lvl]} Bekijk alle ${label.toLowerCase()}-sneltoetsen voor Microsoft Windows en macOS.`
	return {
		title: `${label} sneltoetsen voor Microsoft Windows & macOS`,
		description,
		alternates: { canonical: `/niveau/${level}` },
		openGraph: {
			type: 'website',
			title: `${label} sneltoetsen voor Microsoft Windows & macOS`,
			description,
			url: `/niveau/${level}`,
		},
	}
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://windows-sneltoetsen.vercel.app'

export default async function LevelPage({
	params,
}: {
	params: Promise<{ level: string }>
}) {
	const { level } = await params
	const lvl = complexityBySlug[level] as ComplexityLevel | undefined
	if (!lvl) notFound()

	const items = shortkeysByComplexity(lvl)

	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
			{
				'@type': 'ListItem',
				position: 2,
				name: complexityLabels[lvl],
				item: `${siteUrl}/niveau/${level}`,
			},
		],
	}

	const itemListJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: `${complexityLabels[lvl]} sneltoetsen`,
		numberOfItems: items.length,
		itemListElement: items.map((k, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			url: `/sneltoetsen/${k.slug}`,
			name: `${k.windows}: ${k.description}`,
		})),
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
				<Breadcrumb className='mb-6'>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href='/'>Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{complexityLabels[lvl]}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<header className='mb-10 text-center'>
					<h1 className='text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight'>
						{complexityLabels[lvl]} sneltoetsen
					</h1>
					<p className='text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto'>
						{complexityDescriptions[lvl]}
					</p>
				</header>

				<main>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'>
						{items.map((k) => (
							<ShortkeyCard key={k.id} shortkey={k} />
						))}
					</div>
				</main>

				<div className='mt-12 text-center'>
					<Button asChild>
						<Link href='/'>← Alle sneltoetsen</Link>
					</Button>
				</div>
			</div>
		</>
	)
}
