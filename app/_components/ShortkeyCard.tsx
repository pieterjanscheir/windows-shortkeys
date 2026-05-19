import Link from 'next/link'
import { categoryLabels, categorySlugs, type Shortkey } from '@/lib/shortkeys'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { KeyCombo } from './KeyCombo'
import { CopyButton } from './CopyButton'

interface ShortkeyCardProps {
	shortkey: Shortkey
	headingLevel?: 2 | 3
	linkToDetail?: boolean
}

export function ShortkeyCard({ shortkey, headingLevel = 3, linkToDetail = true }: ShortkeyCardProps) {
	const Heading = headingLevel === 2 ? 'h2' : 'h3'
	const winHref = `/sneltoetsen/windows/${shortkey.slug}`
	const macHref = `/sneltoetsen/mac/${shortkey.slug}`

	const windowsText = shortkey.windowsExplanation ?? shortkey.explanation
	const macText = shortkey.macExplanation ?? shortkey.explanation

	return (
		<Card
			className={cn(
				'group relative gap-0 py-0 flex-col h-full overflow-hidden',
				'ring-border hover:ring-foreground/20',
				'hover:shadow-[0_4px_16px_-6px_rgb(0_0_0/0.08)] dark:hover:shadow-[0_4px_16px_-6px_rgb(0_0_0/0.5)]',
				'transition-[box-shadow,--tw-ring-color] duration-200',
			)}
		>
			<div className='p-5 flex flex-col gap-3 flex-1'>
				{/* ── Windows pane ─────────────────────────── */}
				<div className='os-only-windows flex flex-col gap-3 flex-1'>
					<div className='flex items-start justify-between gap-2'>
						<KeyCombo combination={shortkey.windows} />
						<CopyButton
							value={shortkey.windows}
							label='Kopieer Windows-sneltoets'
							className='shrink-0 -mr-1 -mt-1'
						/>
					</div>
					<Heading className='text-[15px] font-semibold text-foreground leading-snug tracking-tight'>
						{linkToDetail ? (
							<Link href={winHref} className='hover:text-primary transition-colors'>
								{shortkey.description}
							</Link>
						) : (
							shortkey.description
						)}
					</Heading>
					<p className='text-sm text-muted-foreground leading-relaxed'>{windowsText}</p>
				</div>

				{/* ── Mac pane ─────────────────────────────── */}
				{shortkey.mac ? (
					<div className='os-only-mac flex flex-col gap-3 flex-1'>
						<div className='flex items-start justify-between gap-2'>
							<KeyCombo combination={shortkey.mac} />
							<CopyButton
								value={shortkey.mac}
								label='Kopieer Mac-sneltoets'
								className='shrink-0 -mr-1 -mt-1'
							/>
						</div>
						<Heading className='text-[15px] font-semibold text-foreground leading-snug tracking-tight'>
							{linkToDetail ? (
								<Link href={macHref} className='hover:text-primary transition-colors'>
									{shortkey.description}
								</Link>
							) : (
								shortkey.description
							)}
						</Heading>
						<p className='text-sm text-muted-foreground leading-relaxed'>{macText}</p>
						{shortkey.macNote && (
							<p className='text-xs text-muted-foreground/80 italic'>{shortkey.macNote}</p>
						)}
					</div>
				) : (
					<div className='os-only-mac flex flex-col gap-3 flex-1'>
						<Badge variant='outline' className='self-start'>
							Geen ingebouwde Mac-sneltoets
						</Badge>
						<Heading className='text-[15px] font-semibold text-foreground leading-snug tracking-tight'>
							{linkToDetail ? (
								<Link href={macHref} className='hover:text-primary transition-colors'>
									{shortkey.description}
								</Link>
							) : (
								shortkey.description
							)}
						</Heading>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							{shortkey.macNote ?? shortkey.explanation}
						</p>
						{shortkey.tools && shortkey.tools.length > 0 && (
							<p className='text-xs text-muted-foreground'>
								Apps die dit oplossen op Mac:{' '}
								<span className='text-foreground font-medium'>
									{shortkey.tools.map((t) => t.name).join(', ')}
								</span>
								.
							</p>
						)}
					</div>
				)}
			</div>

			<div className='flex items-center justify-between px-5 py-3 border-t border-border text-xs'>
				<Badge asChild variant='secondary' className='font-normal text-[11px]'>
					<Link href={`/categorie/${categorySlugs[shortkey.category]}`}>
						{categoryLabels[shortkey.category]}
					</Link>
				</Badge>
				{linkToDetail && (
					<>
						<Link
							href={winHref}
							className='os-only-windows font-medium text-muted-foreground hover:text-primary transition-colors'
						>
							Details →
						</Link>
						<Link
							href={macHref}
							className='os-only-mac font-medium text-muted-foreground hover:text-primary transition-colors'
						>
							Details →
						</Link>
					</>
				)}
			</div>
		</Card>
	)
}
