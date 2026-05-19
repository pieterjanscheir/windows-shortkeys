'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useOs } from './OsContext'
import type { OS } from '@/lib/shortkeys'
import { cn } from '@/lib/utils'

export function WindowsMark({ className }: { className?: string }) {
	return (
		<svg viewBox='0 0 16 16' aria-hidden='true' className={className}>
			<rect x='1' y='1' width='6.4' height='6.4' fill='currentColor' />
			<rect x='8.6' y='1' width='6.4' height='6.4' fill='currentColor' />
			<rect x='1' y='8.6' width='6.4' height='6.4' fill='currentColor' />
			<rect x='8.6' y='8.6' width='6.4' height='6.4' fill='currentColor' />
		</svg>
	)
}

export function AppleMark({ className }: { className?: string }) {
	return (
		<svg viewBox='0 0 16 16' aria-hidden='true' className={className}>
			<path
				fill='currentColor'
				d='M11.182 8.4a3.2 3.2 0 0 1 1.586-2.7 3.4 3.4 0 0 0-2.66-1.42c-1.116-.114-2.193.66-2.766.66-.583 0-1.46-.65-2.404-.63-1.236.02-2.378.72-3.014 1.83-1.286 2.22-.328 5.5.926 7.3.616.88 1.347 1.87 2.302 1.83.93-.04 1.279-.6 2.4-.6 1.114 0 1.443.6 2.422.58.998-.02 1.633-.9 2.244-1.78.71-1.02.998-2.01 1.014-2.06-.022-.01-1.946-.74-1.966-2.94zM9.408 3.3a3.16 3.16 0 0 0 .722-2.27c-.7.034-1.539.466-2.04 1.05-.45.52-.846 1.36-.74 2.18.78.06 1.578-.4 2.058-.96z'
			/>
		</svg>
	)
}

/**
 * Segmented OS picker. The active segment uses shadcn `bg-primary` /
 * `text-primary-foreground` which gives strong contrast in both themes
 * (near-black on near-white in light, inverse in dark).
 */
export function OsToggle() {
	const { os, setOs } = useOs()
	const pathname = usePathname()
	const router = useRouter()

	const handleSelect = (next: OS) => {
		setOs(next)
		// On a detail page like /sneltoetsen/{os}/{slug}, switch the URL to the
		// other OS variant so the user lands on the equivalent page directly.
		const match = pathname?.match(/^\/sneltoetsen\/(windows|mac)\/(.+)$/)
		if (match) {
			router.push(`/sneltoetsen/${next}/${match[2]}`)
		}
	}

	const segment = (active: boolean) =>
		cn(
			'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
			active
				? 'bg-primary text-primary-foreground font-semibold shadow-sm'
				: 'text-muted-foreground hover:text-foreground font-medium',
		)

	return (
		<div
			role='group'
			aria-label='Besturingssysteem'
			className='inline-flex items-center gap-0.5 bg-muted border border-border rounded-full p-0.5'
		>
			<button
				type='button'
				onClick={() => handleSelect('windows')}
				aria-pressed={os === 'windows'}
				className={segment(os === 'windows')}
			>
				<WindowsMark className='w-3.5 h-3.5' />
				Windows
			</button>
			<button
				type='button'
				onClick={() => handleSelect('mac')}
				aria-pressed={os === 'mac'}
				className={segment(os === 'mac')}
			>
				<AppleMark className='w-3.5 h-3.5' />
				macOS
			</button>
		</div>
	)
}
