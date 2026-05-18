'use client'

import { createContext, useContext } from 'react'
import { parseAsString, useQueryState } from 'nuqs'

type SearchContextValue = {
	query: string
	setQuery: (q: string) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

/**
 * Search state lives in the URL (`?q=...`) via nuqs so it's shareable
 * and survives reloads. Header and Explorer both read/write through this
 * single context.
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [query, setQueryState] = useQueryState(
		'q',
		parseAsString.withDefault('').withOptions({ shallow: true, history: 'replace', throttleMs: 250 }),
	)
	const setQuery = (q: string) => setQueryState(q === '' ? null : q)
	return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>
}

export function useSearch(): SearchContextValue | null {
	return useContext(SearchContext)
}
