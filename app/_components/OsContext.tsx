'use client'

import { createContext, useContext, useState } from 'react'
import type { OS } from '@/lib/shortkeys'

type OsContextValue = {
	os: OS
	setOs: (os: OS) => void
}

const OsContext = createContext<OsContextValue | null>(null)

export const OS_STORAGE_KEY = 'sneltoetsen-os'

/**
 * Inline script that runs before hydration. Sets <html data-os="..."> from
 * localStorage so first paint matches the user's preference and no flash occurs.
 * Mirrors the next-themes pattern.
 */
export const OS_INIT_SCRIPT = `(function(){try{var v=localStorage.getItem('${OS_STORAGE_KEY}');if(v!=='mac')v='windows';document.documentElement.dataset.os=v;}catch(e){document.documentElement.dataset.os='windows';}})();`

function readInitialOs(): OS {
	if (typeof document === 'undefined') return 'windows'
	const v = document.documentElement.dataset.os
	return v === 'mac' ? 'mac' : 'windows'
}

export function OsProvider({ children }: { children: React.ReactNode }) {
	const [os, setOsState] = useState<OS>(readInitialOs)

	const setOs = (next: OS) => {
		setOsState(next)
		document.documentElement.dataset.os = next
		try {
			window.localStorage.setItem(OS_STORAGE_KEY, next)
		} catch {
			// Storage unavailable — preference is in-memory only.
		}
	}

	return <OsContext.Provider value={{ os, setOs }}>{children}</OsContext.Provider>
}

export function useOs(): OsContextValue {
	const ctx = useContext(OsContext)
	if (!ctx) throw new Error('useOs must be used inside OsProvider')
	return ctx
}
