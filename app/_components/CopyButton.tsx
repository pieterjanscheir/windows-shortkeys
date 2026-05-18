'use client'

import { Check, Copy as CopyIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface CopyButtonProps {
	value: string
	label?: string
	className?: string
}

export function CopyButton({ value, label = 'Kopieer combinatie', className = '' }: CopyButtonProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(value)
			setCopied(true)
			toast.success('Gekopieerd', { description: value, duration: 1500 })
			setTimeout(() => setCopied(false), 1500)
		} catch {
			toast.error('Kopiëren mislukt', { description: 'Clipboard niet beschikbaar in deze context.' })
		}
	}

	return (
		<button
			type='button'
			onClick={handleCopy}
			aria-label={copied ? 'Gekopieerd' : label}
			title={label}
			className={`inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ${className}`}
		>
			{copied ? <Check className='w-4 h-4' aria-hidden='true' /> : <CopyIcon className='w-4 h-4' aria-hidden='true' />}
			<span className='sr-only'>{copied ? 'Gekopieerd' : label}</span>
		</button>
	)
}
