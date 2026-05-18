'use client'

import { useMemo } from 'react'
import { SearchX } from 'lucide-react'
import { parseAsStringEnum, useQueryState } from 'nuqs'
import {
	buildShortkeyHaystack,
	categoryLabels,
	categorySlugs,
	complexityLabels,
	complexitySlugs,
	matchesQuery,
	shortkeys,
	type Category,
	type ComplexityLevel,
	type Shortkey,
} from '@/lib/shortkeys'
import { ShortkeyCard } from './ShortkeyCard'
import { useSearch } from './SearchContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const ALL_COMPLEXITY = ['all', 'basic', 'intermediate', 'advanced', 'expert'] as const
const ALL_CATEGORY = ['all', 'general', 'window', 'text', 'system', 'browser', 'media'] as const

export function ShortkeyExplorer() {
	const search = useSearch()
	const query = search?.query ?? ''
	const setQuery = search?.setQuery ?? (() => {})

	const [activeComplexity, setActiveComplexity] = useQueryState(
		'niveau',
		parseAsStringEnum([...ALL_COMPLEXITY])
			.withDefault('all')
			.withOptions({ shallow: true, history: 'replace' }),
	)
	const [activeCategory, setActiveCategory] = useQueryState(
		'cat',
		parseAsStringEnum([...ALL_CATEGORY])
			.withDefault('all')
			.withOptions({ shallow: true, history: 'replace' }),
	)
	const filtered = useMemo(() => {
		return shortkeys.filter((k) => {
			const haystack = buildShortkeyHaystack(k)
			const matchesSearch = matchesQuery(haystack, query)
			const matchesComplexity = activeComplexity === 'all' || k.complexity === activeComplexity
			const matchesCategory = activeCategory === 'all' || k.category === activeCategory
			return matchesSearch && matchesComplexity && matchesCategory
		})
	}, [query, activeComplexity, activeCategory])

	const grouped = useMemo<Record<ComplexityLevel, Shortkey[]>>(() => {
		const acc: Record<ComplexityLevel, Shortkey[]> = {
			basic: [],
			intermediate: [],
			advanced: [],
			expert: [],
		}
		for (const k of filtered) acc[k.complexity].push(k)
		return acc
	}, [filtered])

	const clearFilters = () => {
		setQuery('')
		setActiveComplexity('all')
		setActiveCategory('all')
	}

	return (
		<div className='shortkey-explorer'>
			{/* Filter chips */}
			<div className='-mx-4 px-4 sm:mx-0 sm:px-0 space-y-2'>
				<FilterRow
					label='Niveaus'
					all='Alle niveaus'
					value={activeComplexity}
					onChange={(v) => setActiveComplexity(v as ComplexityLevel | 'all')}
					options={Object.entries(complexityLabels) as [ComplexityLevel, string][]}
					linkBase='/niveau'
					slugs={complexitySlugs}
				/>
				<FilterRow
					label='Categorieën'
					all='Alle categorieën'
					value={activeCategory}
					onChange={(v) => setActiveCategory(v as Category | 'all')}
					options={Object.entries(categoryLabels) as [Category, string][]}
					linkBase='/categorie'
					slugs={categorySlugs}
				/>
			</div>

			<div className='mt-8'>
				{filtered.length === 0 ? (
					<EmptyState query={query} onClear={clearFilters} />
				) : activeComplexity === 'all' ? (
					<div className='space-y-12'>
						{(Object.entries(complexityLabels) as [ComplexityLevel, string][]).map(([level, label]) => {
							const items = grouped[level]
							if (items.length === 0) return null
							return (
								<section key={level}>
									<div className='flex items-baseline justify-between mb-5'>
										<h2 className='text-lg sm:text-xl font-semibold text-foreground tracking-tight inline-flex items-baseline gap-2'>
											{label}
											<Badge variant='secondary' className='font-normal'>
												{items.length}
											</Badge>
										</h2>
										<Link
											href={`/niveau/${complexitySlugs[level]}`}
											className='text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
										>
											Bekijk alles →
										</Link>
									</div>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
										{items.map((k) => (
											<ShortkeyCard key={k.id} shortkey={k} />
										))}
									</div>
								</section>
							)
						})}
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
						{filtered.map((k) => (
							<ShortkeyCard key={k.id} shortkey={k} />
						))}
					</div>
				)}
			</div>

			{filtered.length > 0 && (
				<p className='mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground'>
					{filtered.length} sneltoets{filtered.length === 1 ? '' : 'en'}
				</p>
			)}
		</div>
	)
}

interface FilterRowProps<T extends string> {
	label: string
	all: string
	value: string
	onChange: (v: T | 'all') => void
	options: [T, string][]
	linkBase: string
	slugs: Record<T, string>
}

function FilterRow<T extends string>({ label, all, value, onChange, options, linkBase, slugs }: FilterRowProps<T>) {
	return (
		<div
			role='group'
			aria-label={label}
			className='flex gap-2 overflow-x-auto sm:flex-wrap sm:justify-center pb-1 scroll-px-4 snap-x'
		>
			<FilterChip active={value === 'all'} onClick={() => onChange('all')}>
				{all}
			</FilterChip>
			{options.map(([key, lbl]) => (
				<Link
					key={key}
					href={`${linkBase}/${slugs[key]}`}
					prefetch={false}
					onClick={(e) => {
						e.preventDefault()
						onChange(key)
					}}
					className={chipClass(value === key)}
				>
					{lbl}
				</Link>
			))}
		</div>
	)
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
	return (
		<button type='button' onClick={onClick} className={chipClass(active)}>
			{children}
		</button>
	)
}

function chipClass(active: boolean) {
	return cn(
		'shrink-0 snap-start inline-flex items-center px-3.5 py-2 rounded-full text-sm font-medium transition-colors',
		'border',
		active
			? 'bg-primary text-primary-foreground border-primary'
			: 'bg-transparent text-muted-foreground border-border hover:bg-muted hover:text-foreground',
	)
}

function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
	const popularCategories: Category[] = ['window', 'system', 'browser', 'text']
	return (
		<div className='text-center py-14 bg-card rounded-2xl border border-border px-6'>
			<div className='mx-auto inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted'>
				<SearchX className='w-7 h-7 text-muted-foreground' aria-hidden='true' />
			</div>
			<h2 className='mt-5 text-lg font-semibold text-foreground'>
				{query ? <>Niets gevonden voor &quot;{query}&quot;</> : <>Geen sneltoetsen gevonden</>}
			</h2>
			<p className='mt-2 text-sm text-muted-foreground max-w-md mx-auto'>
				Probeer een ander zoekwoord, schakel van besturingssysteem of bekijk een populaire categorie:
			</p>
			<div className='mt-5 flex flex-wrap items-center justify-center gap-2'>
				{popularCategories.map((c) => (
					<Badge key={c} asChild variant='outline' className='text-sm py-1 px-3'>
						<Link href={`/categorie/${categorySlugs[c]}`}>{categoryLabels[c]}</Link>
					</Badge>
				))}
			</div>
			<Button onClick={onClear} className='mt-6'>
				Wis zoekopdracht &amp; filters
			</Button>
		</div>
	)
}
