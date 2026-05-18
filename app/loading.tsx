import { Loader2 } from 'lucide-react'

export default function Loading() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center gap-4 text-muted-foreground'>
			<Loader2 className='w-6 h-6 animate-spin' aria-hidden='true' />
			<p className='text-sm'>Laden…</p>
		</div>
	)
}
