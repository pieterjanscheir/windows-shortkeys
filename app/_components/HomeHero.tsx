'use client'

import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useOs } from './OsContext'
import type { Shortkey } from '@/lib/shortkeys'

interface Props {
	tipOfTheDay: Pick<Shortkey, 'slug' | 'description'>
}

export function HomeHero({ tipOfTheDay }: Props) {
	const { os } = useOs()
	const isMac = os === 'mac'
	const title = isMac ? 'Sneltoetsen voor macOS' : 'Sneltoetsen voor Microsoft Windows'
	const subtitle = isMac
		? 'De Nederlandstalige gids voor macOS-sneltoetsen. Wissel rechtsboven naar Microsoft Windows wanneer je wil.'
		: 'De Nederlandstalige gids voor sneltoetsen op Microsoft Windows. Wissel rechtsboven naar macOS wanneer je wil.'

	return (
		<div className='text-center max-w-2xl mx-auto'>
			<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[--text-strong] tracking-tight'>
				{title}
			</h1>
			<p className='mt-4 text-base sm:text-lg text-[--text-muted] leading-relaxed'>{subtitle}</p>

			<Link
				href={`/sneltoetsen/${os}/${tipOfTheDay.slug}`}
				className='mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[--border-soft] bg-card text-sm text-[--text-muted] hover:border-[--border-strong] hover:text-[--text-strong] transition-colors'
			>
				<Sparkles className='w-3.5 h-3.5 text-[--accent]' aria-hidden='true' />
				<span className='font-medium text-[--text-strong]'>Tip van de dag</span>
				<span className='hidden sm:inline text-[--text-subtle]'>·</span>
				<span className='hidden sm:inline'>{tipOfTheDay.description}</span>
				<span className='text-[--text-subtle]'>→</span>
			</Link>
		</div>
	)
}
