import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
	categoryLabels,
	categorySlugs,
	complexityLabels,
	complexitySlugs,
	findShortkeyBySlug,
	relatedShortkeys,
	shortkeys,
	type OS,
} from '@/lib/shortkeys'
import { KeyCombo } from '@/app/_components/KeyCombo'
import { CopyButton } from '@/app/_components/CopyButton'
import { ShortkeyCard } from '@/app/_components/ShortkeyCard'
import { Tools } from '@/app/_components/Tools'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Params = { os: string; slug: string }

const ALLOWED_OS: OS[] = ['windows', 'mac']

function parseOs(value: string): OS | null {
	return (ALLOWED_OS as string[]).includes(value) ? (value as OS) : null
}

export function generateStaticParams(): Params[] {
	const out: Params[] = []
	for (const k of shortkeys) {
		out.push({ os: 'windows', slug: k.slug })
		if (k.mac) out.push({ os: 'mac', slug: k.slug })
	}
	return out
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>
}): Promise<Metadata> {
	const { os: rawOs, slug } = await params
	const os = parseOs(rawOs)
	const k = findShortkeyBySlug(slug)
	if (!os || !k) return { title: 'Niet gevonden' }
	if (os === 'mac' && !k.mac) return { title: 'Niet gevonden' }

	const combo = os === 'windows' ? k.windows : (k.mac as string)
	const osLabel = os === 'windows' ? 'Microsoft Windows' : 'macOS'
	const title = `${combo} · ${k.description} (${osLabel})`
	const explanationText =
		os === 'windows' ? k.windowsExplanation ?? k.explanation : k.macExplanation ?? k.explanation
	const description = `${k.description} op ${osLabel}: druk ${combo}. ${explanationText}`.slice(0, 158)

	const canonical = `/sneltoetsen/${os}/${slug}`
	const otherOs: OS = os === 'windows' ? 'mac' : 'windows'
	const otherCanonical = `/sneltoetsen/${otherOs}/${slug}`
	const otherExists = otherOs === 'windows' || k.mac !== null

	const keywords = [
		`${combo} ${osLabel}`,
		`${combo} sneltoets`,
		`${k.description} sneltoets`,
		`${k.description} ${osLabel}`,
		`${osLabel} sneltoets ${k.description.toLowerCase()}`,
	]

	return {
		title,
		description,
		keywords,
		alternates: {
			canonical,
			languages: { 'nl-BE': canonical, 'nl-NL': canonical },
			...(otherExists ? { types: { 'text/html': otherCanonical } } : {}),
		},
		openGraph: { type: 'article', title, description, url: canonical, locale: 'nl_BE' },
		twitter: { card: 'summary', title, description },
	}
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://windows-sneltoetsen.vercel.app'

export default async function ShortkeyOsDetailPage({
	params,
}: {
	params: Promise<Params>
}) {
	const { os: rawOs, slug } = await params
	const os = parseOs(rawOs)
	const k = findShortkeyBySlug(slug)
	if (!os || !k) notFound()
	if (os === 'mac' && !k.mac) notFound()

	const combo = (os === 'windows' ? k.windows : k.mac) as string
	const explanation =
		os === 'windows'
			? k.windowsExplanation ?? k.explanation
			: k.macExplanation ?? k.explanation
	const osLabel = os === 'windows' ? 'Microsoft Windows' : 'macOS'
	const otherOs: OS = os === 'windows' ? 'mac' : 'windows'
	const otherAvailable = otherOs === 'windows' || k.mac !== null

	const related = relatedShortkeys(k.slug, 6).filter((rk) =>
		otherOs === 'windows' ? true : rk.mac !== null,
	)

	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
			{
				'@type': 'ListItem',
				position: 2,
				name: categoryLabels[k.category],
				item: `${siteUrl}/categorie/${categorySlugs[k.category]}`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: `${osLabel} · ${k.description}`,
				item: `${siteUrl}/sneltoetsen/${os}/${k.slug}`,
			},
		],
	}

	const howToJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: `${k.description} (${osLabel}) met de sneltoets ${combo}`,
		description: explanation,
		step: [
			{
				'@type': 'HowToStep',
				name: osLabel,
				text: `Druk op ${combo} om ${k.description.toLowerCase()}.`,
			},
		],
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
			/>

			<div className='max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
				<Breadcrumb className='mb-6'>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href='/'>Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href={`/categorie/${categorySlugs[k.category]}`}>
									{categoryLabels[k.category]}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{k.description}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<article className='bg-card text-card-foreground rounded-2xl border border-border p-6 sm:p-10'>
					<header className='flex items-start gap-4 mb-8 pb-6 border-b border-border'>
						<k.Icon className='w-6 h-6 mt-1 text-muted-foreground shrink-0' aria-hidden='true' />
						<div className='flex-1'>
							<div className='text-[11px] uppercase tracking-[0.08em] font-semibold text-primary mb-1'>
								{osLabel}
							</div>
							<h1 className='text-2xl sm:text-3xl font-semibold text-foreground tracking-tight'>
								{k.description}
							</h1>
							<div className='mt-3 flex flex-wrap gap-2'>
								<Badge asChild variant='secondary'>
									<Link href={`/categorie/${categorySlugs[k.category]}`}>
										{categoryLabels[k.category]}
									</Link>
								</Badge>
								<Badge asChild variant='outline'>
									<Link href={`/niveau/${complexitySlugs[k.complexity]}`}>
										{complexityLabels[k.complexity]}
									</Link>
								</Badge>
							</div>
						</div>
					</header>

					<section>
						<div className='mb-4 text-[11px] uppercase tracking-[0.08em] font-semibold text-muted-foreground'>
							Sneltoets
						</div>
						<KeyCombo combination={combo} size='lg' />
						<div className='mt-3'>
							<CopyButton value={combo} label={`Kopieer ${osLabel}-sneltoets`} className='-ml-1.5' />
						</div>

						<div className='mt-8 space-y-4'>
							<h2 className='text-base font-semibold text-foreground tracking-tight'>
								Wat doet deze sneltoets?
							</h2>
							<p className='text-base sm:text-lg text-foreground/90 leading-relaxed'>
								{explanation}
							</p>
						</div>

						{os === 'mac' && k.macNote && (
							<div className='mt-6'>
								<h3 className='text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2'>
									Goed om te weten
								</h3>
								<p className='text-sm text-muted-foreground bg-muted border-l-2 border-border px-4 py-2.5 rounded'>
									{k.macNote}
								</p>
							</div>
						)}

						<div className='mt-8 grid sm:grid-cols-2 gap-4 text-sm'>
							<div className='rounded-lg border border-border bg-muted/30 px-4 py-3'>
								<div className='text-xs uppercase tracking-wider font-semibold text-muted-foreground'>
									Categorie
								</div>
								<Link
									href={`/categorie/${categorySlugs[k.category]}`}
									className='mt-1 inline-block text-foreground font-medium hover:text-primary'
								>
									{categoryLabels[k.category]}
								</Link>
							</div>
							<div className='rounded-lg border border-border bg-muted/30 px-4 py-3'>
								<div className='text-xs uppercase tracking-wider font-semibold text-muted-foreground'>
									Niveau
								</div>
								<Link
									href={`/niveau/${complexitySlugs[k.complexity]}`}
									className='mt-1 inline-block text-foreground font-medium hover:text-primary'
								>
									{complexityLabels[k.complexity]}
								</Link>
							</div>
						</div>

						{os === 'mac' && k.tools && k.tools.length > 0 && <Tools tools={k.tools} />}
					</section>

					{otherAvailable && (
						<aside className='mt-8 pt-6 border-t border-border'>
							<Link
								href={`/sneltoetsen/${otherOs}/${k.slug}`}
								className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors'
							>
								<span>
									Bekijk dezelfde functie op {otherOs === 'windows' ? 'Microsoft Windows' : 'macOS'}
								</span>
								<span aria-hidden='true'>→</span>
							</Link>
						</aside>
					)}
				</article>

				{related.length > 0 && (
					<section className='mt-12'>
						<h2 className='text-xl font-semibold text-foreground mb-4 tracking-tight'>
							Verwante sneltoetsen in {categoryLabels[k.category]}
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
							{related.map((rk) => (
								<ShortkeyCard key={rk.id} shortkey={rk} />
							))}
						</div>
					</section>
				)}

				<div className='mt-12 text-center'>
					<Button asChild>
						<Link href='/'>← Terug naar alle sneltoetsen</Link>
					</Button>
				</div>
			</div>
		</>
	)
}
