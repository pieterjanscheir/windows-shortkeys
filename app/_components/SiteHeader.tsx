'use client'

import Link from 'next/link'
import { Info } from 'lucide-react'
import { OsToggle, WindowsMark, AppleMark } from './OsToggle'
import { ThemeToggle } from './ThemeToggle'
import { HeaderSearch } from './HeaderSearch'
import { useOs } from './OsContext'

function BrandMark() {
	const { os } = useOs()
	return (
		<span aria-hidden='true' className='inline-flex items-center justify-center w-5 h-5 text-[--accent]'>
			{os === 'mac' ? (
				<AppleMark className='w-4 h-4' />
			) : (
				<WindowsMark className='w-3.5 h-3.5' />
			)}
		</span>
	)
}

export function SiteHeader() {
	return (
		<header className='sticky top-0 z-30 border-b border-[--border-soft] bg-[--surface-0]/85 backdrop-blur-md'>
			{/* Row 1 */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3'>
				<Link
					href='/'
					className='inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-[--text-strong] hover:text-[--accent] transition-colors'
				>
					<BrandMark />
					<span>shortkeys</span>
				</Link>

				{/* Desktop-only inline search */}
				<div className='hidden md:flex flex-1 justify-center'>
					<HeaderSearch />
				</div>

				<div className='ml-auto md:ml-0 flex items-center gap-2'>
					<OsToggle />
					<div className='hidden md:flex items-center gap-2'>
						<ThemeToggle />
					</div>
					<Link
						href='/over'
						aria-label='Over shortkeys'
						title='Over shortkeys'
						className='inline-flex items-center justify-center w-9 h-9 rounded-full border border-[--border-soft] bg-[--surface-1] text-[--text-muted] hover:text-[--text-strong] hover:bg-[--surface-2] transition-colors'
					>
						<Info className='w-4 h-4' aria-hidden='true' />
					</Link>
				</div>
			</div>

			{/* Row 2 (mobile only): full-width search + theme toggle */}
			<div className='md:hidden px-4 pb-3 flex items-center gap-2'>
				<HeaderSearch />
				<ThemeToggle />
			</div>
		</header>
	)
}
