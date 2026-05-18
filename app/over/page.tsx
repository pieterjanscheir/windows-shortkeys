import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
	title: 'Over shortkeys & Pieter-Jan Scheir',
	description:
		'shortkeys is een persoonlijk project van Pieter-Jan Scheir, fullstack developer uit België, gespecialiseerd in React, Next.js, TypeScript en AI-gedreven productiviteit.',
	alternates: { canonical: '/over' },
}

const STACK = [
	'TypeScript',
	'React',
	'Next.js',
	'React Native',
	'Tailwind CSS',
	'Convex',
	'Hono.js',
	'Supabase',
	'PostgreSQL',
	'Playwright',
	'Vitest',
	'Vercel',
	'AWS',
	'Claude Code',
	'Cursor',
]

export default function OverPage() {
	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16'>
			<article className='bg-card text-card-foreground rounded-2xl border border-border p-6 sm:p-10 space-y-10'>
				<header>
					<p className='text-xs uppercase tracking-[0.12em] font-semibold text-primary'>
						Over shortkeys
					</p>
					<h1 className='mt-2 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight'>
						Eén Nederlandse plek voor Windows- &amp; Mac-sneltoetsen.
					</h1>
					<p className='mt-4 text-muted-foreground leading-relaxed'>
						Sneltoetsen besparen elke dag tijd, maar de officiële lijsten zijn lang, Engelstalig en
						zelden vergelijkend tussen Windows en macOS. <strong>shortkeys</strong> verzamelt de
						belangrijkste sneltoetsen voor Microsoft Windows én macOS op één plek: doorzoekbaar,
						gesorteerd op niveau en categorie, met aanbevelingen voor apps die nog beter zijn dan
						de native versie.
					</p>
				</header>

				<section className='space-y-3 leading-relaxed'>
					<h2 className='text-xl font-semibold text-foreground'>Hoe gebruik je het?</h2>
					<ul className='list-disc pl-5 text-muted-foreground space-y-1.5'>
						<li>
							Wissel rechtsboven van besturingssysteem: titels, sneltoetsen en uitleg passen zich
							meteen aan.
						</li>
						<li>
							Mac-modifiers tonen altijd zowel symbool als label (
							<span className='font-geist-mono'>⌘&nbsp;Cmd</span>,{' '}
							<span className='font-geist-mono'>⌥&nbsp;Opt</span>) zodat ze meteen leesbaar zijn.
						</li>
						<li>Zoek vanuit de header, of filter via niveau en categorie. Alles loopt mee in de URL.</li>
						<li>Klik <em>Details</em> op een kaart voor uitleg en alternatieve apps die het ook kunnen.</li>
					</ul>
				</section>

				<section className='space-y-4'>
					<div className='flex items-baseline justify-between'>
						<h2 className='text-xl font-semibold text-foreground'>Wie zit hierachter?</h2>
						<Link
							href='https://scheir.eu'
							target='_blank'
							rel='noopener'
							className='inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline'
						>
							scheir.eu
							<ArrowUpRight className='w-3.5 h-3.5' aria-hidden='true' />
						</Link>
					</div>
					<p className='text-muted-foreground leading-relaxed'>
						Ik ben <strong>Pieter-Jan Scheir</strong>, fullstack developer uit België. Ik bouw
						moderne webapplicaties en AI-gedreven oplossingen met een praktische, lange-termijn
						mindset. Mijn dagelijks gereedschap: React, Next.js, TypeScript en AI-coding tools als
						Claude Code, Cursor en Codex, gekoppeld aan zorgvuldig engineering- en UX-werk.
					</p>
					<p className='text-muted-foreground leading-relaxed'>
						Vandaag werk ik bij <strong>FOD Justitie</strong> aan justitiële budgetterings- en
						event-management systemen. Eerder bouwde ik bij <strong>AdvantITge</strong> en{' '}
						<strong>Vanden Broele</strong> mee aan Legal Square, Spar Online, eGovFlow en
						Expertcenter. Naast werk ben ik ook bezig met film-fotografie, talen en reizen, wat
						mee bepaalt hoe ik design en details benader.
					</p>

					<div className='flex flex-wrap gap-1.5 pt-2'>
						{STACK.map((tech) => (
							<Badge key={tech} variant='secondary' className='font-normal'>
								{tech}
							</Badge>
						))}
					</div>
				</section>

				<section className='space-y-3'>
					<h2 className='text-xl font-semibold text-foreground'>Iets nodig? Contact.</h2>
					<p className='text-muted-foreground'>
						Een sneltoets die ontbreekt, een fout, een suggestie? Een project waar ik kan helpen
						(React/Next.js, AI-integraties, design systems, bouw of audit)? Schrijf me gerust.
					</p>
					<div className='flex flex-wrap gap-2 pt-2'>
						<Button asChild variant='outline' size='sm'>
							<Link href='mailto:pieterjan@scheir.eu'>
								<Mail className='w-3.5 h-3.5' />
								pieterjan@scheir.eu
							</Link>
						</Button>
						<Button asChild variant='outline' size='sm'>
							<Link href='https://github.com/pieterjanscheir' target='_blank' rel='noopener'>
								<ExternalLink className='w-3.5 h-3.5' />
								GitHub
							</Link>
						</Button>
						<Button asChild variant='outline' size='sm'>
							<Link
								href='https://linkedin.com/in/pieterjanscheir/'
								target='_blank'
								rel='noopener'
							>
								<ExternalLink className='w-3.5 h-3.5' />
								LinkedIn
							</Link>
						</Button>
					</div>
				</section>

				<section className='space-y-2 pt-2 border-t border-border'>
					<h2 className='text-xs uppercase tracking-wider font-semibold text-muted-foreground'>
						Techniek achter de site
					</h2>
					<p className='text-sm text-muted-foreground leading-relaxed'>
						Gebouwd met Next.js 16, React 19, Tailwind v4 en shadcn/ui. Doorzoekbaar via base-ui
						Combobox, state in de URL via nuqs, toasts via Sonner, thema via next-themes. Volledig
						statisch geprerendered. Geen tracking, geen cookies, geen advertenties.
					</p>
				</section>

				<div className='pt-2'>
					<Button asChild>
						<Link href='/'>← Naar alle sneltoetsen</Link>
					</Button>
				</div>
			</article>
		</div>
	)
}
