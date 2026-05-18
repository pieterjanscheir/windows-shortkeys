'use client'

import { Suspense } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { OsProvider } from './OsContext'
import { SearchProvider } from './SearchContext'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextThemesProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			<NuqsAdapter>
				<OsProvider>
					{/* SearchProvider uses nuqs (useSearchParams) — needs Suspense for static prerender */}
					<Suspense fallback={null}>
						<SearchProvider>{children}</SearchProvider>
					</Suspense>
				</OsProvider>
			</NuqsAdapter>
		</NextThemesProvider>
	)
}
