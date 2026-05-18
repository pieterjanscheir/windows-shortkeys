import { ArrowUpRight } from 'lucide-react'
import type { ToolRecommendation } from '@/lib/shortkeys'

interface Props {
	tools: ToolRecommendation[]
}

/**
 * Detail-page block listing third-party apps that augment a shortkey.
 * Compact, neutral-toned, with one link per app.
 */
export function Tools({ tools }: Props) {
	if (tools.length === 0) return null
	return (
		<section className='mt-8 pt-6 border-t border-border'>
			<div className='flex items-center gap-2 mb-4'>
				<span className='text-[11px] uppercase tracking-[0.08em] font-semibold text-muted-foreground'>
					Apps die hier nog beter in zijn
				</span>
			</div>
			<ul className='space-y-3'>
				{tools.map((t) => (
					<li
						key={t.url}
						className='rounded-lg border border-border bg-muted/40 hover:bg-muted/70 transition-colors'
					>
						<a
							href={t.url}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-start gap-3 p-3'
						>
							<span className='shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-background border border-border text-[11px] font-semibold uppercase tracking-wide text-muted-foreground'>
								{t.name.slice(0, 2)}
							</span>
							<div className='flex-1 min-w-0'>
								<div className='flex items-center gap-1.5 text-sm font-semibold text-foreground'>
									{t.name}
									<ArrowUpRight className='w-3.5 h-3.5 text-muted-foreground' aria-hidden='true' />
								</div>
								<p className='text-xs sm:text-[13px] text-muted-foreground leading-relaxed mt-0.5'>
									{t.description}
								</p>
							</div>
						</a>
					</li>
				))}
			</ul>
		</section>
	)
}
