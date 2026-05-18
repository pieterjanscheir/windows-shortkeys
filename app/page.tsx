import Link from 'next/link'
import {
	categoryLabels,
	categorySlugs,
	complexityLabels,
	complexitySlugs,
	shortkeys,
	type Category,
	type ComplexityLevel,
} from '@/lib/shortkeys'
import { ShortkeyExplorer } from './_components/ShortkeyExplorer'
import { HomeHero } from './_components/HomeHero'

function pickShortkeyOfTheDay() {
	const today = new Date()
	const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
	const hash = Array.from(dateString).reduce((acc, char) => acc + char.charCodeAt(0), 0)
	return shortkeys[hash % shortkeys.length]
}

export default function Home() {
	const tipOfTheDay = pickShortkeyOfTheDay()

	const itemListJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Microsoft Windows & macOS Sneltoetsen',
		description:
			'Doorzoekbare lijst met alle Microsoft Windows en Mac-sneltoetsen in het Nederlands, gesorteerd op niveau en categorie.',
		numberOfItems: shortkeys.length,
		itemListElement: shortkeys.map((k, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url: `/sneltoetsen/${k.slug}`,
			name: `${k.windows}: ${k.description}`,
			description: k.explanation,
		})),
	}

	const faqJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'Wat zijn de belangrijkste nieuwe sneltoetsen in Windows 11?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Windows 11 introduceert onder andere ⊞ Win + W (Widgets), ⊞ Win + Z (Snap Layouts), ⊞ Win + N (Meldingencentrum & agenda), ⊞ Win + C (Copilot) en ⊞ Win + Alt + ↑/↓ voor het snappen naar de boven- of onderhelft van het scherm.',
				},
			},
			{
				'@type': 'Question',
				name: 'Werken Windows-sneltoetsen ook op een Mac?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'De meeste app-sneltoetsen (Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+F, etc.) hebben een Mac-equivalent waarbij Ctrl wordt vervangen door ⌘ (Command). Vensterbeheer en systeemsneltoetsen verschillen vaak fundamenteel. Op deze site staat naast elke Windows-sneltoets ook de Mac-versie.',
				},
			},
			{
				'@type': 'Question',
				name: 'Hoe maak ik een schermafdruk in Windows 11?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Gebruik ⊞ Win + Shift + S om het Knipprogramma te openen en een gebied te selecteren. ⊞ Win + PrtScn slaat de volledige schermafdruk direct op in Afbeeldingen → Schermopnamen. Op Mac: ⌘ + ⇧ + 4 (gebied) of ⌘ + ⇧ + 3 (volledig scherm).',
				},
			},
			{
				'@type': 'Question',
				name: 'Wat is het verschil tussen ⊞ Win + A en ⊞ Win + N in Windows 11?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'In Windows 11 opent ⊞ Win + A het paneel Snelle instellingen (wifi, volume, helderheid) en opent ⊞ Win + N het Meldingencentrum met de agenda. In Windows 10 zaten deze samen in het Actiecentrum.',
				},
			},
		],
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16'>
				<HomeHero tipOfTheDay={{ slug: tipOfTheDay.slug, description: tipOfTheDay.description }} />

				<div className='mt-10'>
					<ShortkeyExplorer />
				</div>

				{/* SEO-friendly internal-link footer */}
				<section className='mt-20 pt-10 border-t border-[--border-soft]'>
					<div className='grid gap-10 md:grid-cols-2'>
						<div>
							<h2 className='text-xs font-semibold uppercase tracking-wider text-[--text-subtle] mb-4'>
								Categorieën
							</h2>
							<ul className='grid grid-cols-2 gap-y-2 gap-x-4 text-sm'>
								{(Object.entries(categoryLabels) as [Category, string][]).map(([key, label]) => (
									<li key={key}>
										<Link
											href={`/categorie/${categorySlugs[key]}`}
											className='text-[--text-muted] hover:text-[--accent] transition-colors'
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h2 className='text-xs font-semibold uppercase tracking-wider text-[--text-subtle] mb-4'>
								Niveau
							</h2>
							<ul className='grid grid-cols-2 gap-y-2 gap-x-4 text-sm'>
								{(Object.entries(complexityLabels) as [ComplexityLevel, string][]).map(([key, label]) => (
									<li key={key}>
										<Link
											href={`/niveau/${complexitySlugs[key]}`}
											className='text-[--text-muted] hover:text-[--accent] transition-colors'
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}
