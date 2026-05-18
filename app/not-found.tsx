import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
	return (
		<div className='max-w-xl mx-auto px-4 sm:px-6 py-20 text-center'>
			<div className='mx-auto inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted'>
				<SearchX className='w-8 h-8 text-muted-foreground' aria-hidden='true' />
			</div>
			<p className='mt-6 text-sm font-medium uppercase tracking-wider text-muted-foreground'>
				404 · niet gevonden
			</p>
			<h1 className='mt-2 text-2xl sm:text-3xl font-semibold text-foreground tracking-tight'>
				Deze sneltoets bestaat (nog) niet
			</h1>
			<p className='mt-3 text-muted-foreground'>
				De pagina die je zocht is verplaatst, gewist, of bestond nooit. Geen probleem, alle
				sneltoetsen vind je op de homepage.
			</p>
			<div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
				<Button asChild>
					<Link href='/'>Naar alle sneltoetsen</Link>
				</Button>
				<Button asChild variant='outline'>
					<Link href='/over'>Over shortkeys</Link>
				</Button>
			</div>
		</div>
	)
}
