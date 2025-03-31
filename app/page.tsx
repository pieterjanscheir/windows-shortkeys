'use client'
import { useState, useMemo } from 'react'
import {
	Layers,
	Copy,
	Scissors,
	Undo,
	Redo,
	Monitor,
	Lock,
	Folder,
	Settings,
	Activity,
	X,
	Command,
	Search,
	Bell,
	Shield,
	Grid,
	Plus,
	RotateCcw,
	Menu,
	Printer,
	Info,
	MoreHorizontal,
	User,
	Mic,
	Wifi,
	ClipboardList,
	Smile,
} from 'lucide-react'

interface Shortkey {
	id: number
	combination: string
	description: string
	Icon: React.ComponentType<{ className?: string }>
}

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('')

	const shortkeys: Shortkey[] = useMemo(
		() => [
			{
				id: 1,
				combination: 'Alt + Tab',
				description: 'Wissel snel tussen alle openstaande vensters en tabbladen.',
				Icon: Layers,
			},
			{ id: 2, combination: 'Ctrl + C', description: 'Kopieer de geselecteerde tekst of objecten.', Icon: Copy },
			{ id: 3, combination: 'Ctrl + V', description: 'Plak de eerder gekopieerde inhoud.', Icon: Copy },
			{ id: 4, combination: 'Ctrl + X', description: 'Knip de geselecteerde tekst of objecten.', Icon: Scissors },
			{ id: 5, combination: 'Ctrl + Z', description: 'Maak de laatste actie ongedaan.', Icon: Undo },
			{ id: 6, combination: 'Ctrl + Y', description: 'Voer de laatste actie opnieuw uit.', Icon: Redo },
			{ id: 7, combination: 'Win + D', description: 'Toon of verberg het bureaublad.', Icon: Monitor },
			{ id: 8, combination: 'Win + L', description: 'Vergrendel je computer voor extra veiligheid.', Icon: Lock },
			{ id: 9, combination: 'Win + E', description: 'Open de Windows Verkenner.', Icon: Folder },
			{ id: 10, combination: 'Win + I', description: 'Open het instellingenmenu.', Icon: Settings },
			{ id: 11, combination: 'Ctrl + Shift + Esc', description: 'Open het Taakbeheer.', Icon: Activity },
			{ id: 12, combination: 'Alt + F4', description: 'Sluit het huidige venster.', Icon: X },
			{ id: 13, combination: 'Win + R', description: "Open het 'Uitvoeren' dialoogvenster.", Icon: Command },
			{ id: 14, combination: 'Win + S', description: 'Activeer de zoekfunctie.', Icon: Search },
			{ id: 15, combination: 'Win + A', description: 'Open het actiecentrum.', Icon: Bell },
			{ id: 16, combination: 'Ctrl + Alt + Del', description: 'Open het beveiligingsmenu.', Icon: Shield },
			{
				id: 17,
				combination: 'Win + Tab',
				description: 'Bekijk een overzicht van alle open vensters.',
				Icon: Grid,
			},
			{ id: 18, combination: 'Ctrl + W', description: 'Sluit het huidige tabblad.', Icon: X },
			{ id: 19, combination: 'Ctrl + T', description: 'Open een nieuw tabblad in je browser.', Icon: Plus },
			{
				id: 20,
				combination: 'Ctrl + Shift + T',
				description: 'Heropen het laatst gesloten tabblad.',
				Icon: RotateCcw,
			},
			{ id: 21, combination: 'Win', description: 'Open het Startmenu.', Icon: Menu },
			{ id: 22, combination: 'Ctrl + P', description: 'Druk het huidige document af.', Icon: Printer },
			{ id: 23, combination: 'Ctrl + F', description: 'Zoek in het huidige document.', Icon: Search },
			{
				id: 24,
				combination: 'Alt + Enter',
				description: 'Bekijk de eigenschappen van het geselecteerde object.',
				Icon: Info,
			},
			{ id: 25, combination: 'Win + X', description: 'Open het Quick Link menu.', Icon: MoreHorizontal },
			{ id: 26, combination: 'Win + U', description: 'Open het Ease of Access center.', Icon: User },
			{ id: 27, combination: 'Win + H', description: 'Activeer de dictaatmodus.', Icon: Mic },
			{
				id: 28,
				combination: 'Win + K',
				description: 'Verbind met draadloze displays en audio-apparaten.',
				Icon: Wifi,
			},
			{ id: 29, combination: 'Win + V', description: 'Open de klembordgeschiedenis.', Icon: ClipboardList },
			{ id: 30, combination: 'Win + .', description: 'Open de emoji picker.', Icon: Smile },
		],
		[],
	)

	const filteredShortkeys = useMemo(() => {
		return shortkeys.filter(
			(key) =>
				key.combination.toLowerCase().includes(searchQuery.toLowerCase()) ||
				key.description.toLowerCase().includes(searchQuery.toLowerCase()),
		)
	}, [searchQuery, shortkeys])

	return (
		<div className='min-h-screen bg-gradient-to-b from-[#f8f4e9] to-[#eae2d1] text-[#3a4047] font-geist-sans'>
			{/* Decorative elements inspired by Ghibli */}
			<div className="fixed top-0 right-0 w-32 h-32 bg-[url('/dust-sprite.png')] opacity-20 bg-contain bg-no-repeat"></div>
			<div className="fixed bottom-0 left-0 w-40 h-40 bg-[url('/leaf-sprite.png')] opacity-20 bg-contain bg-no-repeat"></div>

			<div className='max-w-6xl mx-auto px-6 py-12'>
				<header className='mb-12 text-center'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4 text-[#594a3c]'>Windows 10 Sneltoetsen</h1>
					<p className='text-lg text-[#6d7a8c] max-w-2xl mx-auto'>
						Handige toetsencombinaties om je dagelijkse taken sneller en efficiënter uit te voeren.
					</p>
					<div className='mt-8'>
						<div className='relative max-w-md mx-auto'>
							<input
								type='text'
								placeholder='Zoeken...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full pl-12 pr-4 py-3 rounded-full border-2 border-[#d9d0c1] 
                           bg-[#fcfaf5] text-[#594a3c] placeholder-[#a99d8d]
                           focus:outline-none focus:ring-2 focus:ring-[#8ab6d6] focus:border-transparent
                           transition duration-300 shadow-sm hover:shadow-md'
							/>
							<Search className='w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a99d8d]' />
						</div>
					</div>
				</header>

				<main className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredShortkeys.length === 0 ? (
						<div className='col-span-full text-center py-16'>
							<p className='text-lg text-[#6d7a8c]'>
								Geen sneltoetsen gevonden voor &quot;{searchQuery}&quot;
							</p>
						</div>
					) : (
						filteredShortkeys.map((key) => (
							<div
								key={key.id}
								className='group flex flex-col items-center p-6 bg-white rounded-xl shadow-sm
                           border border-[#e8e1d4] hover:border-[#8ab6d6] 
                           transition-all duration-300 hover:shadow-lg
                           hover:transform hover:scale-[1.02]'
							>
								<div className='p-3 rounded-full bg-[#f4f0e8] mb-4 group-hover:bg-[#e1eef7] transition-colors duration-300'>
									<key.Icon className='w-8 h-8 text-[#6d7a8c] group-hover:text-[#5c91b0] transition-colors duration-300' />
								</div>
								<h2 className='text-lg font-semibold text-[#594a3c] font-geist-mono'>
									{key.combination}
								</h2>
								<p className='mt-3 text-center text-[#6d7a8c]'>{key.description}</p>
							</div>
						))
					)}
				</main>

				<footer className='mt-16 text-center text-[#a99d8d] py-6 border-t border-[#e8e1d4]'>
					<p>&copy; {new Date().getFullYear()} Windows 10 Sneltoetsen</p>
					<p className='mt-2 text-sm'>Met liefde gemaakt voor efficiëntere workflows</p>
				</footer>
			</div>
		</div>
	)
}
