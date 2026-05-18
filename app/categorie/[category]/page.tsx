import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
	categoryBySlug,
	categoryDescriptions,
	categoryLabels,
	categorySlugs,
	shortkeysByCategory,
	type Category,
} from '@/lib/shortkeys'
import { ShortkeyCard } from '@/app/_components/ShortkeyCard'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

const PAGE_SIZE = 24

export function generateStaticParams() {
	return Object.values(categorySlugs).map((category) => ({ category }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ category: string }>
}): Promise<Metadata> {
	const { category } = await params
	const cat = categoryBySlug[category]
	if (!cat) return { title: 'Categorie niet gevonden' }
	const label = categoryLabels[cat]
	const description = `${categoryDescriptions[cat]} Bekijk alle ${label.toLowerCase()}-sneltoetsen voor Microsoft Windows en macOS in het Nederlands.`
	return {
		title: `${label} sneltoetsen voor Microsoft Windows & macOS`,
		description,
		alternates: { canonical: `/categorie/${category}` },
		openGraph: {
			type: 'website',
			title: `${label} sneltoetsen voor Microsoft Windows & macOS`,
			description,
			url: `/categorie/${category}`,
		},
	}
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://windows-sneltoetsen.vercel.app'

export default async function CategoryPage({
	params,
	searchParams,
}: {
	params: Promise<{ category: string }>
	searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
	const { category } = await params
	const sp = await searchParams
	const cat = categoryBySlug[category] as Category | undefined
	if (!cat) notFound()

	const items = shortkeysByCategory(cat)
	const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
	const pageRaw = Array.isArray(sp.page) ? sp.page[0] : sp.page
	const requestedPage = Number.parseInt(pageRaw ?? '1', 10)
	const page = Number.isFinite(requestedPage) ? Math.min(Math.max(1, requestedPage), totalPages) : 1
	const start = (page - 1) * PAGE_SIZE
	const paginated = items.slice(start, start + PAGE_SIZE)

	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
			{
				'@type': 'ListItem',
				position: 2,
				name: categoryLabels[cat],
				item: `${siteUrl}/categorie/${category}`,
			},
		],
	}

	const itemListJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: `${categoryLabels[cat]} sneltoetsen`,
		numberOfItems: items.length,
		itemListElement: items.map((k, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			url: `/sneltoetsen/${k.slug}`,
			name: `${k.windows}: ${k.description}`,
		})),
	}

	const pageHref = (p: number) =>
		p <= 1 ? `/categorie/${category}` : `/categorie/${category}?page=${p}`

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
							<BreadcrumbPage>{categoryLabels[cat]}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<header className='mb-10 text-center'>
					<h1 className='text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight'>
						{categoryLabels[cat]} sneltoetsen
					</h1>
					<p className='text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto'>
						{categoryDescriptions[cat]}
					</p>
				</header>

				<main>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'>
						{paginated.map((k) => (
							<ShortkeyCard key={k.id} shortkey={k} />
						))}
					</div>

					{totalPages > 1 && (
						<Pagination className='mt-10'>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href={page > 1 ? pageHref(page - 1) : undefined}
										aria-disabled={page === 1}
										className={page === 1 ? 'pointer-events-none opacity-50' : ''}
									/>
								</PaginationItem>
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
									const isEdge = p === 1 || p === totalPages
									const nearCurrent = Math.abs(p - page) <= 1
									if (!isEdge && !nearCurrent) {
										if (p === 2 || p === totalPages - 1) {
											return (
												<PaginationItem key={`ellipsis-${p}`}>
													<PaginationEllipsis />
												</PaginationItem>
											)
										}
										return null
									}
									return (
										<PaginationItem key={p}>
											<PaginationLink href={pageHref(p)} isActive={p === page}>
												{p}
											</PaginationLink>
										</PaginationItem>
									)
								})}
								<PaginationItem>
									<PaginationNext
										href={page < totalPages ? pageHref(page + 1) : undefined}
										aria-disabled={page === totalPages}
										className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					)}
				</main>

				<div className='mt-12 text-center'>
					<Button asChild>
						<Link href='/'>← Alle categorieën &amp; niveaus</Link>
					</Button>
				</div>
			</div>
		</>
	)
}
