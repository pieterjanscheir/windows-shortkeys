'use client'

import { useEffect } from 'react'
import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='max-w-xl mx-auto px-4 sm:px-6 py-20 text-center'>
			<div className='mx-auto inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive'>
				<TriangleAlert className='w-8 h-8' aria-hidden='true' />
			</div>
			<p className='mt-6 text-sm font-medium uppercase tracking-wider text-muted-foreground'>
				Er ging iets mis
			</p>
			<h1 className='mt-2 text-2xl sm:text-3xl font-semibold text-foreground tracking-tight'>
				Onverwachte fout
			</h1>
			<p className='mt-3 text-muted-foreground'>
				Sorry, er trad een onverwachte fout op. Je kan de pagina opnieuw proberen of teruggaan naar
				de homepage.
			</p>
			{error.digest && (
				<p className='mt-2 text-xs text-muted-foreground/80'>
					Foutcode: <span className='font-geist-mono'>{error.digest}</span>
				</p>
			)}
			<div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
				<Button onClick={() => reset()}>Probeer opnieuw</Button>
				<Button asChild variant='outline'>
					<Link href='/'>Naar de homepage</Link>
				</Button>
			</div>
		</div>
	)
}
