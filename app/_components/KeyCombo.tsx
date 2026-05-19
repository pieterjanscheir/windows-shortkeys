import { WindowsMark } from './OsToggle'

interface KeyComboProps {
	combination: string
	size?: 'sm' | 'md' | 'lg'
}

type Size = 'sm' | 'md' | 'lg'

/**
 * Mac modifier glyphs map to short text labels. Compact sizes (sm, md) render
 * the label only so Mac chips line up visually with Windows chips. The large
 * size used on detail pages also renders the Apple-style glyph alongside the
 * label so users see exactly which key to press.
 */
const MAC_MODIFIERS: Record<string, string> = {
	'⌘': 'Cmd',
	'⌥': 'Opt',
	'⌃': 'Ctrl',
	'⇧': 'Shift',
	'⏎': 'Return',
	'⏏': 'Eject',
}

function PartContent({ part, size }: { part: string; size: Size }) {
	const trimmed = part.trim()

	// Windows key: brand SVG + "Win" label (all sizes).
	const isWinKey = /^(⊞(\s*win)?|win|windows)$/i.test(trimmed) || /^⊞\s*\S+/.test(trimmed)
	if (isWinKey) {
		const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'
		return (
			<span className='inline-flex items-center gap-1.5'>
				<WindowsMark className={iconSize} />
				<span>Win</span>
			</span>
		)
	}

	// Mac modifier: glyph + label on lg (detail pages), label only otherwise.
	if (MAC_MODIFIERS[trimmed]) {
		if (size === 'lg') {
			return (
				<span className='inline-flex items-center gap-1.5 leading-none'>
					<span
						aria-hidden='true'
						className='text-lg leading-none translate-y-px font-medium'
					>
						{trimmed}
					</span>
					<span>{MAC_MODIFIERS[trimmed]}</span>
				</span>
			)
		}
		return <>{MAC_MODIFIERS[trimmed]}</>
	}

	return <>{trimmed}</>
}

export function KeyCombo({ combination, size = 'md' }: KeyComboProps) {
	const parts = combination
		.split('+')
		.map((p) => p.trim())
		.filter(Boolean)
	const padding =
		size === 'sm' ? 'px-1.5 min-h-[24px]' : size === 'lg' ? 'px-2.5 min-h-[36px]' : 'px-2 min-h-[28px]'
	const text = size === 'sm' ? 'text-[11px]' : size === 'lg' ? 'text-base' : 'text-[13px]'
	return (
		<div className='inline-flex flex-wrap items-center gap-1.5'>
			{parts.map((part, index) => (
				<span key={index} className='inline-flex items-center gap-1.5'>
					<kbd
						className={`${padding} ${text} inline-flex items-center justify-center font-geist-mono font-medium text-foreground bg-card border border-border border-b-2 rounded-md shadow-[inset_0_-1px_0_var(--border)] whitespace-nowrap`}
					>
						<PartContent part={part} size={size} />
					</kbd>
					{index < parts.length - 1 && (
						<span aria-hidden='true' className='text-muted-foreground text-xs'>
							+
						</span>
					)}
				</span>
			))}
		</div>
	)
}
