'use client'
import { useState, useMemo, useEffect } from 'react'
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
	User,
	Mic,
	Wifi,
	ClipboardList,
	Smile,
	Maximize2,
	Minimize2,
	SidebarOpen,
	SidebarClose,
	ArrowUpDown,
	ArrowLeftRight,
	Columns,
	Layout,
	GitMerge,
	Bookmark,
	Terminal,
	Code,
	Zap,
	Edit,
	Trash,
	Play,
	SkipBack,
	SkipForward,
	Power,
	List,
	RefreshCw,
	Save,
	Download,
	Check,
	Star,
	Gift,
} from 'lucide-react'
import Link from 'next/link'

// Define complexity levels
type ComplexityLevel = 'basic' | 'intermediate' | 'advanced' | 'expert'

// Define categories
type Category = 'general' | 'window' | 'text' | 'system' | 'browser' | 'media'

interface Shortkey {
	id: number
	combination: string
	description: string
	explanation?: string
	Icon: React.ComponentType<{ className?: string }>
	complexity: ComplexityLevel
	category: Category
}

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('')
	const [activeComplexity, setActiveComplexity] = useState<ComplexityLevel | 'all'>('all')
	const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
	const [shortcutOfTheDay, setShortcutOfTheDay] = useState<Shortkey | null>(null)

	const shortkeys: Shortkey[] = useMemo(
		() => [
			// Basic General
			{
				id: 1,
				combination: 'Alt + Tab',
				description: 'Wissel tussen vensters',
				explanation:
					'Houdt Alt ingedrukt en druk op Tab om door open vensters te bladeren. Laat Alt los om het geselecteerde venster te activeren.',
				Icon: Layers,
				complexity: 'basic',
				category: 'general',
			},
			{
				id: 2,
				combination: 'Ctrl + C',
				description: 'Kopieer selectie',
				explanation: 'Kopieert geselecteerde tekst of bestanden naar het klembord voor later gebruik.',
				Icon: Copy,
				complexity: 'basic',
				category: 'text',
			},
			{
				id: 3,
				combination: 'Ctrl + V',
				description: 'Plak inhoud',
				explanation: 'Plakt de inhoud van het klembord op de huidige positie van de cursor.',
				Icon: Copy,
				complexity: 'basic',
				category: 'text',
			},
			{
				id: 4,
				combination: 'Ctrl + X',
				description: 'Knip selectie',
				explanation: 'Verwijdert geselecteerde tekst of bestanden en plaatst ze op het klembord.',
				Icon: Scissors,
				complexity: 'basic',
				category: 'text',
			},
			{
				id: 5,
				combination: 'Ctrl + Z',
				description: 'Ongedaan maken',
				explanation: 'Maakt de meest recente actie ongedaan, handig voor het corrigeren van fouten.',
				Icon: Undo,
				complexity: 'basic',
				category: 'general',
			},

			// Window Management - Basic
			{
				id: 7,
				combination: '⊞ Win + D',
				description: 'Toon/verberg bureaublad',
				explanation:
					'Minimaliseert alle vensters om het bureaublad te tonen. Druk nogmaals om alle vensters te herstellen.',
				Icon: Monitor,
				complexity: 'basic',
				category: 'window',
			},
			{
				id: 8,
				combination: '⊞ Win + L',
				description: 'Vergrendel computer',
				explanation:
					'Vergrendelt je computer onmiddellijk, waardoor inloggegevens nodig zijn om terug te keren.',
				Icon: Lock,
				complexity: 'basic',
				category: 'system',
			},

			// Intermediate General
			{
				id: 6,
				combination: 'Ctrl + Y',
				description: 'Opnieuw uitvoeren',
				explanation:
					"Voert de laatst ongedaan gemaakte actie opnieuw uit. In sommige programma's is dit Ctrl+Shift+Z.",
				Icon: Redo,
				complexity: 'intermediate',
				category: 'general',
			},
			{
				id: 9,
				combination: '⊞ Win + E',
				description: 'Open Verkenner',
				explanation: 'Opent een nieuw Windows Verkenner-venster voor het bladeren door bestanden en mappen.',
				Icon: Folder,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 10,
				combination: '⊞ Win + I',
				description: 'Open Instellingen',
				explanation: 'Opent het Windows Instellingenmenu voor het configureren van je systeem.',
				Icon: Settings,
				complexity: 'intermediate',
				category: 'system',
			},

			// Advanced System
			{
				id: 11,
				combination: 'Ctrl + Shift + Esc',
				description: 'Open Taakbeheer',
				explanation:
					'Opent Taakbeheer direct, zonder het beveiligingsscherm. Handig voor het monitoren van processen.',
				Icon: Activity,
				complexity: 'advanced',
				category: 'system',
			},
			{
				id: 12,
				combination: 'Alt + F4',
				description: 'Sluit venster',
				explanation:
					'Sluit het actieve venster. Als geen venster actief is, wordt het dialoogvenster Afsluiten geopend.',
				Icon: X,
				complexity: 'intermediate',
				category: 'window',
			},

			// More Window Management
			{
				id: 31,
				combination: '⊞ Win + ←',
				description: 'Venster naar links',
				explanation:
					'Plaatst het actieve venster aan de linkerkant van het scherm, neemt de helft van het scherm in beslag.',
				Icon: SidebarOpen,
				complexity: 'intermediate',
				category: 'window',
			},
			{
				id: 32,
				combination: '⊞ Win + →',
				description: 'Venster naar rechts',
				explanation:
					'Plaatst het actieve venster aan de rechterkant van het scherm, neemt de helft van het scherm in beslag.',
				Icon: SidebarClose,
				complexity: 'intermediate',
				category: 'window',
			},
			{
				id: 33,
				combination: '⊞ Win + ↑',
				description: 'Venster maximaliseren',
				explanation: 'Maximaliseert het actieve venster om het volledige scherm te vullen.',
				Icon: Maximize2,
				complexity: 'intermediate',
				category: 'window',
			},
			{
				id: 34,
				combination: '⊞ Win + ↓',
				description: 'Venster minimaliseren',
				explanation:
					'Minimaliseert het actieve venster of herstelt een gemaximaliseerd venster naar zijn oorspronkelijke grootte.',
				Icon: Minimize2,
				complexity: 'intermediate',
				category: 'window',
			},
			{
				id: 35,
				combination: '⊞ Win + Shift + ←/→',
				description: 'Verplaats naar monitor',
				explanation:
					'Verplaatst het actieve venster naar een andere aangesloten monitor, behoudt de venstergrootte.',
				Icon: ArrowLeftRight,
				complexity: 'advanced',
				category: 'window',
			},
			{
				id: 36,
				combination: '⊞ Win + Home',
				description: 'Minimaliseer andere vensters',
				explanation:
					'Minimaliseert alle vensters behalve het actieve venster. Druk nogmaals om alle vensters te herstellen.',
				Icon: Layout,
				complexity: 'advanced',
				category: 'window',
			},
			{
				id: 37,
				combination: '⊞ Win + Shift + ↑',
				description: 'Verticaal uitrekken',
				explanation:
					'Rekt het venster verticaal uit tot de maximale hoogte terwijl de breedte behouden blijft.',
				Icon: ArrowUpDown,
				complexity: 'advanced',
				category: 'window',
			},

			// Expert Window Management
			{
				id: 38,
				combination: '⊞ Win + Ctrl + D',
				description: 'Nieuw virtueel bureaublad',
				explanation:
					'Creëert een nieuw virtueel bureaublad, handig voor het organiseren van verschillende werkruimten.',
				Icon: Columns,
				complexity: 'expert',
				category: 'window',
			},
			{
				id: 39,
				combination: '⊞ Win + Ctrl + ←/→',
				description: 'Wissel tussen bureaubladen',
				explanation: 'Navigeer tussen verschillende virtuele bureaubladen die je hebt aangemaakt.',
				Icon: GitMerge,
				complexity: 'expert',
				category: 'window',
			},
			{
				id: 40,
				combination: '⊞ Win + Ctrl + F4',
				description: 'Sluit virtueel bureaublad',
				explanation:
					'Sluit het huidige virtuele bureaublad en verplaats de open vensters naar een ander bureaublad.',
				Icon: X,
				complexity: 'expert',
				category: 'window',
			},

			// System Operations
			{
				id: 13,
				combination: '⊞ Win + R',
				description: 'Open Uitvoeren-venster',
				explanation: "Opent het Uitvoeren-dialoogvenster voor het snel starten van programma's of commando's.",
				Icon: Command,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 14,
				combination: '⊞ Win + S',
				description: 'Open Zoeken',
				explanation: "Opent de Windows-zoekfunctie voor het zoeken van bestanden, programma's en instellingen.",
				Icon: Search,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 15,
				combination: '⊞ Win + A',
				description: 'Open Actiecentrum',
				explanation: 'Opent het Windows Actiecentrum voor toegang tot snelle instellingen en meldingen.',
				Icon: Bell,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 16,
				combination: 'Ctrl + Alt + Del',
				description: 'Beveiligingsscherm',
				explanation: 'Opent het Windows-beveiligingsscherm voor vergrendelen, afmelden, taakbeheer, etc.',
				Icon: Shield,
				complexity: 'intermediate',
				category: 'system',
			},

			// Browser and Tabs
			{
				id: 17,
				combination: '⊞ Win + Tab',
				description: 'Taakweergave',
				explanation: 'Opent de taakweergave die alle open vensters en virtuele bureaubladen toont.',
				Icon: Grid,
				complexity: 'intermediate',
				category: 'window',
			},
			{
				id: 18,
				combination: 'Ctrl + W',
				description: 'Sluit tabblad',
				explanation: "Sluit het huidige tabblad in browsers en andere programma's met tabbladen.",
				Icon: X,
				complexity: 'intermediate',
				category: 'browser',
			},
			{
				id: 19,
				combination: 'Ctrl + T',
				description: 'Nieuw tabblad',
				explanation: "Opent een nieuw tabblad in de meeste browsers en programma's met tabbladen.",
				Icon: Plus,
				complexity: 'intermediate',
				category: 'browser',
			},
			{
				id: 20,
				combination: 'Ctrl + Shift + T',
				description: 'Heropen gesloten tabblad',
				explanation: 'Heropent het laatst gesloten tabblad in browsers. Kan meerdere keren worden gebruikt.',
				Icon: RotateCcw,
				complexity: 'advanced',
				category: 'browser',
			},
			{
				id: 41,
				combination: 'Ctrl + Tab',
				description: 'Volgende tabblad',
				explanation: "Wissel naar het volgende tabblad in browsers en andere programma's met tabbladen.",
				Icon: ArrowLeftRight,
				complexity: 'intermediate',
				category: 'browser',
			},
			{
				id: 42,
				combination: 'Ctrl + Shift + Tab',
				description: 'Vorige tabblad',
				explanation: "Wissel naar het vorige tabblad in browsers en andere programma's met tabbladen.",
				Icon: ArrowLeftRight,
				complexity: 'intermediate',
				category: 'browser',
			},
			{
				id: 43,
				combination: 'Ctrl + D',
				description: 'Bladwijzer toevoegen',
				explanation: 'Voegt de huidige webpagina toe aan je bladwijzers in de meeste browsers.',
				Icon: Bookmark,
				complexity: 'intermediate',
				category: 'browser',
			},

			// Expert Productivity
			{
				id: 44,
				combination: '⊞ Win + X',
				description: 'Geavanceerd menu',
				explanation: 'Opent het geavanceerde gebruikersmenu met toegang tot Taakbeheer, Opdrachtprompt, etc.',
				Icon: Terminal,
				complexity: 'expert',
				category: 'system',
			},
			{
				id: 45,
				combination: 'Alt + Space',
				description: 'Venster-besturingsmenu',
				explanation:
					'Opent het traditionele venstermenu voor verplaatsen, grootte wijzigen, minimaliseren, etc.',
				Icon: Layout,
				complexity: 'expert',
				category: 'window',
			},
			{
				id: 46,
				combination: 'F12 (in browser)',
				description: 'Ontwikkelaarshulpmiddelen',
				explanation:
					'Opent de ontwikkelaarshulpmiddelen in web browsers voor het inspecteren van elementen en debuggen.',
				Icon: Code,
				complexity: 'expert',
				category: 'browser',
			},
			{
				id: 47,
				combination: 'Ctrl + Shift + V',
				description: 'Plakken zonder opmaak',
				explanation: "Plakt tekst zonder opmaak, handig bij het kopiëren tussen verschillende programma's.",
				Icon: Copy,
				complexity: 'advanced',
				category: 'text',
			},

			// Other system functions
			{
				id: 21,
				combination: '⊞ Win',
				description: 'Open Startmenu',
				explanation: "Opent het Windows Startmenu met toegang tot alle programma's en zoekfunctie.",
				Icon: Menu,
				complexity: 'basic',
				category: 'system',
			},
			{
				id: 22,
				combination: 'Ctrl + P',
				description: 'Afdrukken',
				explanation: "Opent het afdrukvenster in de meeste programma's voor het afdrukken van documenten.",
				Icon: Printer,
				complexity: 'intermediate',
				category: 'general',
			},
			{
				id: 23,
				combination: 'Ctrl + F',
				description: 'Zoeken',
				explanation: 'Opent de zoekfunctie binnen het huidige document of de webpagina.',
				Icon: Search,
				complexity: 'intermediate',
				category: 'general',
			},
			{
				id: 24,
				combination: 'Alt + Enter',
				description: 'Eigenschappen',
				explanation: 'Toont de eigenschappen van het geselecteerde bestand, map of object.',
				Icon: Info,
				complexity: 'advanced',
				category: 'system',
			},
			{
				id: 26,
				combination: '⊞ Win + U',
				description: 'Toegankelijkheidscentrum',
				explanation: 'Opent het Toegankelijkheidscentrum voor toegankelijkheidsopties en -hulpmiddelen.',
				Icon: User,
				complexity: 'advanced',
				category: 'system',
			},
			{
				id: 27,
				combination: '⊞ Win + H',
				description: 'Dictaat',
				explanation: 'Start spraakherkenning om tekst te dicteren in plaats van te typen.',
				Icon: Mic,
				complexity: 'advanced',
				category: 'system',
			},
			{
				id: 28,
				combination: '⊞ Win + K',
				description: 'Verbinden',
				explanation:
					'Opent het Verbinden-venster voor het koppelen met draadloze apparaten zoals Bluetooth-apparaten.',
				Icon: Wifi,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 29,
				combination: '⊞ Win + V',
				description: 'Klembordgeschiedenis',
				explanation: 'Opent de klembordgeschiedenis om toegang te krijgen tot eerder gekopieerde items.',
				Icon: ClipboardList,
				complexity: 'advanced',
				category: 'system',
			},
			{
				id: 30,
				combination: '⊞ Win + .',
				description: 'Emoji-toetsenbord',
				explanation: "Opent het emoji-toetsenbord voor het invoegen van emoji's en speciale tekens.",
				Icon: Smile,
				complexity: 'intermediate',
				category: 'general',
			},
			{
				id: 48,
				combination: 'Ctrl + Shift + N',
				description: 'Nieuwe map maken',
				explanation: 'Maakt een nieuwe map in Windows Verkenner op de huidige locatie.',
				Icon: Folder,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 49,
				combination: 'F2',
				description: 'Hernoemen',
				explanation: 'Hernoemt het geselecteerde bestand of de geselecteerde map.',
				Icon: Edit,
				complexity: 'basic',
				category: 'general',
			},
			{
				id: 50,
				combination: 'F11',
				description: 'Volledig scherm',
				explanation: "Schakelt de volledig-schermmodus in of uit in browsers en sommige andere programma's.",
				Icon: Maximize2,
				complexity: 'intermediate',
				category: 'general',
			},
			{
				id: 51,
				combination: '⊞ Win + Shift + S',
				description: 'Schermafdruk maken',
				explanation: 'Opent de Knipprogramma om een schermafdruk van een deel van het scherm te maken.',
				Icon: Scissors,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 52,
				combination: 'Ctrl + Shift + Del',
				description: 'Browsergegevens wissen',
				explanation: 'Opent het venster om browsergeschiedenis, cookies en cache te wissen.',
				Icon: Trash,
				complexity: 'advanced',
				category: 'browser',
			},
			{
				id: 53,
				combination: '⊞ Win + G',
				description: 'Game Bar',
				explanation: 'Opent de Xbox Game Bar voor opname en screenshots tijdens het spelen van games.',
				Icon: Zap,
				complexity: 'advanced',
				category: 'system',
			},

			// NIEUW TOEGEVOEGDE SHORTKEYS
			// Media Control
			{
				id: 54,
				combination: '⊞ Win + Alt + P',
				description: 'Projectievenster',
				explanation: 'Opent het projectievenster voor het instellen van een tweede beeldscherm of projector.',
				Icon: Monitor,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 55,
				combination: 'Ctrl + Spatiebalk',
				description: 'Afspelen/Pauzeren',
				explanation: 'Speelt media af of pauzeert deze in veel mediaspelers en sommige webdiensten.',
				Icon: Play,
				complexity: 'basic',
				category: 'media',
			},
			{
				id: 56,
				combination: 'Alt + ←',
				description: 'Terug navigeren',
				explanation: 'Navigeert terug naar de vorige pagina in browsers en bestandsverkenners.',
				Icon: SkipBack,
				complexity: 'basic',
				category: 'browser',
			},
			{
				id: 57,
				combination: 'Alt + →',
				description: 'Vooruit navigeren',
				explanation: 'Navigeert vooruit naar de volgende pagina in browsers en bestandsverkenners.',
				Icon: SkipForward,
				complexity: 'basic',
				category: 'browser',
			},
			{
				id: 58,
				combination: 'F5',
				description: 'Vernieuwen',
				explanation: 'Vernieuwt de huidige webpagina, map of toepassing.',
				Icon: RefreshCw,
				complexity: 'basic',
				category: 'general',
			},
			{
				id: 59,
				combination: 'Ctrl + S',
				description: 'Opslaan',
				explanation: 'Slaat het huidige document of bestand op.',
				Icon: Save,
				complexity: 'basic',
				category: 'general',
			},
			{
				id: 60,
				combination: 'Ctrl + A',
				description: 'Alles selecteren',
				explanation: 'Selecteert alle tekst of alle bestanden in de huidige weergave.',
				Icon: Check,
				complexity: 'basic',
				category: 'text',
			},
			{
				id: 61,
				combination: '⊞ Win + Pauze',
				description: 'Systeemeigenschappen',
				explanation: 'Opent het venster Systeemeigenschappen met informatie over je computer.',
				Icon: Info,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 62,
				combination: 'Alt + F, Alt + E',
				description: 'Bestandsmenu openen',
				explanation: 'Opent het bestandsmenu in veel applicaties (werkt vaak met Alt + F of Alt + E).',
				Icon: List,
				complexity: 'intermediate',
				category: 'general',
			},
			{
				id: 63,
				combination: 'Ctrl + B',
				description: 'Vet maken',
				explanation: 'Maakt geselecteerde tekst vet in tekstverwerkers en veel webapplicaties.',
				Icon: Edit,
				complexity: 'basic',
				category: 'text',
			},
			{
				id: 64,
				combination: 'Ctrl + I',
				description: 'Cursief maken',
				explanation: 'Maakt geselecteerde tekst cursief in tekstverwerkers en veel webapplicaties.',
				Icon: Edit,
				complexity: 'basic',
				category: 'text',
			},
			{
				id: 65,
				combination: 'Ctrl + U',
				description: 'Onderstrepen',
				explanation: 'Onderstreept geselecteerde tekst in tekstverwerkers en veel webapplicaties.',
				Icon: Edit,
				complexity: 'basic',
				category: 'text',
			},
			{
				id: 66,
				combination: 'Ctrl + End',
				description: 'Naar documenteinde',
				explanation: 'Verplaatst de cursor naar het einde van het document of de webpagina.',
				Icon: ArrowUpDown,
				complexity: 'intermediate',
				category: 'text',
			},
			{
				id: 67,
				combination: 'Ctrl + Home',
				description: 'Naar documentbegin',
				explanation: 'Verplaatst de cursor naar het begin van het document of de webpagina.',
				Icon: ArrowUpDown,
				complexity: 'intermediate',
				category: 'text',
			},
			{
				id: 68,
				combination: 'Ctrl + J',
				description: 'Downloads openen',
				explanation: 'Opent het downloadvenster in veel browsers.',
				Icon: Download,
				complexity: 'intermediate',
				category: 'browser',
			},
			{
				id: 69,
				combination: 'Ctrl + K',
				description: 'Zoekbalk openen',
				explanation: 'Plaatst de cursor in de zoekbalk in veel browsers en toepassingen.',
				Icon: Search,
				complexity: 'intermediate',
				category: 'browser',
			},
			{
				id: 70,
				combination: 'Ctrl + Shift + B',
				description: 'Favorieten tonen/verbergen',
				explanation: 'Toont of verbergt de bladwijzerbalk in de meeste browsers.',
				Icon: Star,
				complexity: 'intermediate',
				category: 'browser',
			},
			{
				id: 71,
				combination: '⊞ Win + C',
				description: 'Cortana/Zoeken openen',
				explanation: 'Opent Cortana (of Microsoft Copilot) voor spraakherkenning of zoeken.',
				Icon: Mic,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 72,
				combination: '⊞ Win + Ctrl + F',
				description: 'Zoeken naar computers',
				explanation: 'Opent de zoekfunctie voor het vinden van computers in een netwerk.',
				Icon: Search,
				complexity: 'expert',
				category: 'system',
			},
			{
				id: 73,
				combination: 'Ctrl + Shift + 1',
				description: 'Nieuwe map openen',
				explanation: 'Opent een nieuwe map in Windows Verkenner (werkt in combinatie met geselecteerde map).',
				Icon: Folder,
				complexity: 'advanced',
				category: 'system',
			},
			{
				id: 74,
				combination: '⊞ Win + Ctrl + Q',
				description: 'Snelle Link',
				explanation: 'Opent Quick Assist voor hulp op afstand met een andere computer.',
				Icon: Zap,
				complexity: 'advanced',
				category: 'system',
			},
			{
				id: 75,
				combination: '⊞ Win + Alt + B',
				description: 'HDR in-/uitschakelen',
				explanation: 'Schakelt HDR-weergave in of uit op ondersteunde displays.',
				Icon: Monitor,
				complexity: 'expert',
				category: 'system',
			},
			{
				id: 76,
				combination: '⊞ Win + Ctrl + Shift + B',
				description: 'Reset grafisch stuurprogramma',
				explanation: 'Herstelt de grafische driver wanneer het scherm vastloopt zonder opnieuw op te starten.',
				Icon: RefreshCw,
				complexity: 'expert',
				category: 'system',
			},
			{
				id: 77,
				combination: '⊞ Win + Plus',
				description: 'Inzoomen (Vergrootglas)',
				explanation: 'Zoomt in met het Windows Vergrootglas voor betere leesbaarheid.',
				Icon: Search,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 78,
				combination: '⊞ Win + Min',
				description: 'Uitzoomen (Vergrootglas)',
				explanation: 'Zoomt uit met het Windows Vergrootglas voor een breder zicht.',
				Icon: Search,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 79,
				combination: '⊞ Win + Esc',
				description: 'Vergrootglas sluiten',
				explanation: 'Sluit het Windows Vergrootglas wanneer actief.',
				Icon: X,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 80,
				combination: 'Ctrl + Alt + Tab',
				description: 'App-switcher vastzetten',
				explanation: 'Toont de app-switcher zonder de Alt-toets ingedrukt te hoeven houden.',
				Icon: Layers,
				complexity: 'advanced',
				category: 'general',
			},
			{
				id: 81,
				combination: 'Ctrl + N',
				description: 'Nieuw document',
				explanation: 'Creëert een nieuw document, venster of instantie van de huidige toepassing.',
				Icon: Plus,
				complexity: 'basic',
				category: 'general',
			},
			{
				id: 82,
				combination: 'Alt + F4 (op bureaublad)',
				description: 'Computer uitschakelen',
				explanation:
					'Opent het dialoogvenster om de computer af te sluiten wanneer op het bureaublad gebruikt.',
				Icon: Power,
				complexity: 'basic',
				category: 'system',
			},
			{
				id: 83,
				combination: '⊞ Win + Shift + M',
				description: 'Geminimaliseerde vensters herstellen',
				explanation: 'Herstelt alle eerder geminimaliseerde vensters (tegenovergestelde van Win+M).',
				Icon: Maximize2,
				complexity: 'intermediate',
				category: 'window',
			},
			{
				id: 84,
				combination: '⊞ Win + B',
				description: 'Focus op systeemvak',
				explanation: 'Verplaatst de focus naar het systeemvak (rechteronderhoek van de taakbalk).',
				Icon: Layout,
				complexity: 'advanced',
				category: 'system',
			},
			{
				id: 85,
				combination: '⊞ Win + M',
				description: 'Alle vensters minimaliseren',
				explanation: 'Minimaliseert alle geopende vensters in één keer.',
				Icon: Minimize2,
				complexity: 'basic',
				category: 'window',
			},
			{
				id: 86,
				combination: '⊞ Win + nummer (1-9)',
				description: 'Start app op taakbalk',
				explanation: 'Start of schakelt naar de app die overeenkomt met de positie op de taakbalk.',
				Icon: Menu,
				complexity: 'intermediate',
				category: 'system',
			},
			{
				id: 87,
				combination: 'Ctrl + Alt + Pijltje',
				description: 'Scherm draaien',
				explanation: 'Draait het scherm in de richting van de pijltoets (werkt niet op alle systemen).',
				Icon: RefreshCw,
				complexity: 'expert',
				category: 'system',
			},
			{
				id: 88,
				combination: '⊞ Win + Ctrl + Shift + L',
				description: 'Vastgezet scherm ontgrendelen',
				explanation: 'Ontgrendelt een vastgezet scherm in de presentatiemodus (specifieke toepassingen).',
				Icon: Lock,
				complexity: 'expert',
				category: 'system',
			},
			{
				id: 89,
				combination: 'Ctrl + Shift + Enter',
				description: 'Als admin uitvoeren',
				explanation: 'Voert geselecteerd programma uit met administratorrechten (in Start of Uitvoeren).',
				Icon: Shield,
				complexity: 'advanced',
				category: 'system',
			},
			{
				id: 90,
				combination: '⊞ Win + ;',
				description: 'Emoji venster (alternatief)',
				explanation: 'Alternatieve sneltoets om het emoji-venster te openen (zelfde als Win+.).',
				Icon: Smile,
				complexity: 'intermediate',
				category: 'general',
			},
		],
		[],
	)

	const complexityLabels: Record<ComplexityLevel, string> = {
		basic: 'Basis',
		intermediate: 'Gemiddeld',
		advanced: 'Gevorderd',
		expert: 'Expert',
	}

	const categoryLabels: Record<Category, string> = {
		general: 'Algemeen',
		window: 'Vensters',
		text: 'Tekst',
		system: 'Systeem',
		browser: 'Browser',
		media: 'Media',
	}

	const filteredShortkeys = useMemo(() => {
		return shortkeys.filter((key) => {
			// Filter by search query
			const matchesSearch =
				key.combination.toLowerCase().includes(searchQuery.toLowerCase()) ||
				key.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(key.explanation && key.explanation.toLowerCase().includes(searchQuery.toLowerCase()))

			// Filter by complexity
			const matchesComplexity = activeComplexity === 'all' || key.complexity === activeComplexity

			// Filter by category
			const matchesCategory = activeCategory === 'all' || key.category === activeCategory

			return matchesSearch && matchesComplexity && matchesCategory
		})
	}, [searchQuery, shortkeys, activeComplexity, activeCategory])

	// Group shortkeys by complexity
	const shortkeysGroupedByComplexity = useMemo(() => {
		const grouped: Record<ComplexityLevel, Shortkey[]> = {
			basic: [],
			intermediate: [],
			advanced: [],
			expert: [],
		}

		filteredShortkeys.forEach((key) => {
			grouped[key.complexity].push(key)
		})

		return grouped
	}, [filteredShortkeys])

	// Determine which complexity levels have shortcuts after filtering
	const activeComplexityLevels = useMemo(() => {
		return (
			Object.entries(shortkeysGroupedByComplexity)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.filter(([_, keys]) => keys.length > 0)
				.map(([level]) => level as ComplexityLevel)
		)
	}, [shortkeysGroupedByComplexity])

	// Group shortkeys by category
	const shortkeysGroupedByCategory = useMemo<Record<Category, Shortkey[]>>(() => {
		const grouped: Record<Category, Shortkey[]> = {
			general: [],
			window: [],
			text: [],
			system: [],
			browser: [],
			media: [],
		}

		filteredShortkeys.forEach((key) => {
			grouped[key.category].push(key)
		})

		return grouped
	}, [filteredShortkeys])

	// Determine which categories have shortcuts after filtering
	const activeCategories = useMemo(() => {
		return (
			Object.entries(shortkeysGroupedByCategory)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.filter(([_, keys]) => (keys as Shortkey[]).length > 0)
				.map(([category]) => category as Category)
		)
	}, [shortkeysGroupedByCategory])

	// Generate random shortkey of the day (based on date)
	useEffect(() => {
		const today = new Date()
		const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

		// Create a simple hash from the date string
		const hash = Array.from(dateString).reduce((acc, char) => acc + char.charCodeAt(0), 0)
		// Use the hash to select a shortkey
		const randomIndex = hash % shortkeys.length
		setShortcutOfTheDay(shortkeys[randomIndex])
	}, [shortkeys])

	// Function to render a keyboard key
	const renderKey = (text: string) => {
		// Split the text by + to render each part as a separate key
		const parts = text.split('+').map((part) => part.trim())

		return (
			<div className='flex items-center'>
				{parts.map((part, index) => (
					<div
						key={index}
						className='flex items-center'
					>
						<kbd className='px-2 py-1.5 text-sm font-geist-mono bg-white border border-[--ghibli-tan] rounded-md shadow-sm'>
							{part}
						</kbd>
						{index < parts.length - 1 && <span className='mx-1'>+</span>}
					</div>
				))}
			</div>
		)
	}

	return (
		<div className='min-h-screen ghibli-gradient text-[--ghibli-text] font-geist-sans'>
			{/* Decorative elements inspired by Ghibli */}
			<div className="fixed top-0 right-0 w-32 h-32 bg-[url('/dust-sprite.png')] opacity-20 bg-contain bg-no-repeat float"></div>
			<div className="fixed bottom-0 left-0 w-40 h-40 bg-[url('/leaf-sprite.png')] opacity-20 bg-contain bg-no-repeat"></div>

			<div className='max-w-7xl mx-auto px-6 py-12'>
				<header className='mb-10 text-center'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4 text-[--ghibli-brown]'>
						Windows 10 Sneltoetsen
					</h1>
					<p className='text-lg text-[--ghibli-text] max-w-2xl mx-auto'>
						Handige toetsencombinaties om je dagelijkse taken sneller en efficiënter uit te voeren.
					</p>

					<div className='mt-8 max-w-md mx-auto'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Zoeken naar sneltoetsen...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full pl-12 pr-4 py-3 rounded-full border-2 border-[--ghibli-tan] 
                           bg-white text-[--ghibli-text] placeholder-[--ghibli-brown]/60
                           focus:outline-none focus:ring-2 focus:ring-[--ghibli-blue] focus:border-transparent
                           transition duration-300 shadow-sm hover:shadow-md'
							/>
							<Search className='w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-[--ghibli-brown]/60' />
						</div>
					</div>

					{/* Subtle Shortcut of the Day banner */}
					{shortcutOfTheDay && (
						<div className='mt-6 text-center'>
							<div className='inline-flex items-center px-3 py-1 bg-white/70 border border-[--ghibli-tan]/30 rounded-full text-sm text-[--ghibli-text]/80'>
								<Gift className='w-3.5 h-3.5 mr-1.5 text-[--ghibli-blue]/70' />
								<span className='font-medium mr-1.5'>Tip van de dag:</span>
								<span className='font-geist-mono'>{shortcutOfTheDay.combination}</span>
								<span className='mx-1.5'>•</span>
								<span>{shortcutOfTheDay.description}</span>
							</div>
						</div>
					)}

					{/* Filters */}
					<div className='mt-8 flex flex-col gap-4 items-center'>
						{/* Complexity filter */}
						<div className='flex flex-wrap justify-center gap-2'>
							<button
								onClick={() => setActiveComplexity('all')}
								className={`filter-button ${
									activeComplexity === 'all' ? 'filter-button-blue-active' : ''
								}`}
							>
								Alle niveaus
							</button>
							{Object.entries(complexityLabels).map(([key, label]) => {
								// Only show complexity levels that have shortcuts after filtering
								if (
									searchQuery &&
									!activeComplexityLevels.includes(key as ComplexityLevel) &&
									activeComplexity !== key
								) {
									return null
								}

								return (
									<button
										key={key}
										onClick={() => setActiveComplexity(key as ComplexityLevel)}
										className={`filter-button ${
											activeComplexity === key ? 'filter-button-blue-active' : ''
										}`}
									>
										{label}
									</button>
								)
							})}
						</div>

						{/* Category filter */}
						<div className='flex flex-wrap justify-center gap-2'>
							<button
								onClick={() => setActiveCategory('all')}
								className={`filter-button ${
									activeCategory === 'all' ? 'filter-button-brown-active' : ''
								}`}
							>
								Alle categorieën
							</button>
							{Object.entries(categoryLabels).map(([key, label]) => {
								// Only show categories that have shortcuts after filtering
								if (
									searchQuery &&
									!activeCategories.includes(key as Category) &&
									activeCategory !== key
								) {
									return null
								}

								return (
									<button
										key={key}
										onClick={() => setActiveCategory(key as Category)}
										className={`filter-button ${
											activeCategory === key ? 'filter-button-brown-active' : ''
										}`}
									>
										{label}
									</button>
								)
							})}
						</div>
					</div>
				</header>

				<main>
					{filteredShortkeys.length === 0 ? (
						<div className='text-center py-16 bg-white rounded-xl shadow-sm border border-[--ghibli-tan]'>
							<Info className='w-12 h-12 mx-auto text-[--ghibli-brown]/50' />
							<p className='mt-4 text-lg text-[--ghibli-text]'>
								Geen sneltoetsen gevonden voor &quot;{searchQuery}&quot;
							</p>
							<button
								onClick={() => {
									setSearchQuery('')
									setActiveComplexity('all')
									setActiveCategory('all')
								}}
								className='mt-4 px-6 py-2 bg-[--ghibli-blue] text-white rounded-full hover:bg-[--ghibli-dark-blue] transition-colors'
							>
								Filters wissen
							</button>
						</div>
					) : (
						<div className='space-y-10'>
							{activeComplexity === 'all' ? (
								// If showing all complexities, group by complexity level
								Object.entries(complexityLabels).map(([complexity, label]) => {
									const keysInGroup = shortkeysGroupedByComplexity[complexity as ComplexityLevel]
									if (keysInGroup.length === 0) return null

									return (
										<div
											key={complexity}
											className='space-y-6'
										>
											<div className='flex items-center'>
												<h2 className='text-2xl font-bold text-[--ghibli-brown]'>{label}</h2>
												<div className='ml-4 h-px flex-grow bg-[--ghibli-tan]'></div>
											</div>

											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
												{keysInGroup.map((key) => (
													<div
														key={key.id}
														className='group flex flex-col bg-white rounded-xl shadow-sm
                                    border border-[--ghibli-tan] hover:border-[--ghibli-blue] 
                                    transition-all duration-300 hover:shadow-lg
                                    hover:transform hover:scale-[1.02] overflow-hidden'
													>
														<div className='p-6'>
															<div className='flex items-center justify-between mb-4'>
																<div
																	className='p-3 rounded-full bg-[--ghibli-tan]/30 
                                             group-hover:bg-[--ghibli-blue]/20 transition-colors duration-300'
																>
																	<key.Icon
																		className='w-6 h-6 text-[--ghibli-text] 
                                                    group-hover:text-[--ghibli-dark-blue] transition-colors duration-300'
																	/>
																</div>
																<span className='px-3 py-1 text-xs rounded-full bg-[--ghibli-tan]/30 text-[--ghibli-brown]'>
																	{categoryLabels[key.category]}
																</span>
															</div>

															{renderKey(key.combination)}

															<h3 className='mt-4 font-semibold text-[--ghibli-brown]'>
																{key.description}
															</h3>

															{key.explanation && (
																<p className='mt-2 text-sm text-[--ghibli-text]/80'>
																	{key.explanation}
																</p>
															)}
														</div>
													</div>
												))}
											</div>
										</div>
									)
								})
							) : (
								// If filtering by complexity, just show the filtered list
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
									{filteredShortkeys.map((key) => (
										<div
											key={key.id}
											className='group flex flex-col bg-white rounded-xl shadow-sm
                               border border-[--ghibli-tan] hover:border-[--ghibli-blue] 
                               transition-all duration-300 hover:shadow-lg
                               hover:transform hover:scale-[1.02] overflow-hidden'
										>
											<div className='p-6'>
												<div className='flex items-center justify-between mb-4'>
													<div
														className='p-3 rounded-full bg-[--ghibli-tan]/30 
                                       group-hover:bg-[--ghibli-blue]/20 transition-colors duration-300'
													>
														<key.Icon
															className='w-6 h-6 text-[--ghibli-text] 
                                              group-hover:text-[--ghibli-dark-blue] transition-colors duration-300'
														/>
													</div>
													<span className='px-3 py-1 text-xs rounded-full bg-[--ghibli-tan]/30 text-[--ghibli-brown]'>
														{categoryLabels[key.category]}
													</span>
												</div>

												{renderKey(key.combination)}

												<h3 className='mt-4 font-semibold text-[--ghibli-brown]'>
													{key.description}
												</h3>

												{key.explanation && (
													<p className='mt-2 text-sm text-[--ghibli-text]/80'>
														{key.explanation}
													</p>
												)}
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					)}
				</main>

				<footer className='mt-16 text-center text-[--ghibli-brown]/70 py-6 border-t border-[--ghibli-tan]'>
					<p>&copy; {new Date().getFullYear()} Windows 10 Sneltoetsen</p>
					<p className='mt-2 text-sm'>Gemaakt voor efficiëntere workflows bij FOD Justitie</p>
					<p className='mt-1 text-sm'>
						Auteur:{' '}
						<Link
							href='https://scheir.eu'
							className='text-[--ghibli-blue] hover:underline'
							target='_blank'
						>
							scheir.eu (Pieter-Jan Scheir)
						</Link>
					</p>
				</footer>
			</div>
		</div>
	)
}
