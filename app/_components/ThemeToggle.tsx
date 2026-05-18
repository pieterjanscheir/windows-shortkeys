'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	// next-themes mount-guard: only show the resolved theme after hydration
	// to avoid a SSR/CSR mismatch when the user has a non-system preference.
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true)
	}, [])

	const isDark = mounted && resolvedTheme === 'dark'
	const next = isDark ? 'lichte' : 'donkere'

	return (
		<button
			type='button'
			suppressHydrationWarning
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			aria-label={`Schakel naar ${next} modus`}
			title={`Schakel naar ${next} modus`}
			className='inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
		>
			{mounted ? (
				isDark ? (
					<Sun className='w-4 h-4' aria-hidden='true' />
				) : (
					<Moon className='w-4 h-4' aria-hidden='true' />
				)
			) : (
				<Moon className='w-4 h-4 opacity-0' aria-hidden='true' />
			)}
		</button>
	)
}
