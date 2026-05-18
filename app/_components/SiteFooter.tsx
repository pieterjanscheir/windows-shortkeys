import Link from 'next/link'

export function SiteFooter() {
	return (
		<footer className='mt-20 border-t border-[--border-soft]'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[--text-muted]'>
				<p>
					&copy; {new Date().getFullYear()} shortkeys · door{' '}
					<Link
						href='https://scheir.eu'
						target='_blank'
						rel='noopener'
						className='text-[--text-strong] hover:text-[--accent] transition-colors underline decoration-dotted underline-offset-2'
					>
						Pieter-Jan Scheir
					</Link>
				</p>
				<nav className='flex items-center gap-5'>
					<Link href='/over' className='hover:text-[--text-strong] transition-colors'>
						Over
					</Link>
					<Link
						href='https://scheir.eu'
						target='_blank'
						rel='noopener'
						className='hover:text-[--text-strong] transition-colors'
					>
						scheir.eu
					</Link>
				</nav>
			</div>
		</footer>
	)
}
