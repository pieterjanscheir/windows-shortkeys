'use client'

import { Search, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useSearch } from './SearchContext'

/**
 * Plain search input that lives in the header.
 *  - Updates ?q= via the SearchContext (nuqs-backed) so the explorer
 *    on the home page filters in real time.
 *  - When typing on any page other than home, navigates to `/?q=...`
 *    so the user immediately sees the filtered grid.
 *  - Pressing Enter clears focus.
 */
export function HeaderSearch() {
	const ctx = useSearch()
	const router = useRouter()
	const pathname = usePathname()
	const query = ctx?.query ?? ''
	const setQuery = ctx?.setQuery

	const onChange = useCallback(
		(value: string) => {
			setQuery?.(value)
			if (pathname !== '/' && value.length > 0) {
				router.push(`/?q=${encodeURIComponent(value)}`)
			}
		},
		[setQuery, pathname, router],
	)

	if (!ctx) return null

	return (
		<div className='relative w-full md:w-full md:max-w-md'>
			<input
				type='search'
				value={query}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						;(e.target as HTMLInputElement).blur()
						if (pathname !== '/') router.push(`/?q=${encodeURIComponent(query)}`)
					}
					if (e.key === 'Escape') {
						setQuery?.('')
						;(e.target as HTMLInputElement).blur()
					}
				}}
				placeholder='Zoek "option", "schermafdruk", "win shift s"…'
				aria-label='Sneltoetsen doorzoeken'
				inputMode='search'
				autoComplete='off'
				className='w-full pl-9 pr-9 py-2 md:py-1.5 rounded-full text-sm border border-border bg-muted text-foreground placeholder-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition'
			/>
			<Search
				className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none'
				aria-hidden='true'
			/>
			{query && (
				<button
					type='button'
					onClick={() => setQuery?.('')}
					aria-label='Zoekopdracht wissen'
					className='absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition'
				>
					<X className='w-3.5 h-3.5' />
				</button>
			)}
		</div>
	)
}
