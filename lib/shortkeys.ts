import {
	Activity,
	ArrowLeftRight,
	ArrowUpDown,
	Bell,
	Bookmark,
	Check,
	ClipboardList,
	Code,
	Columns,
	Command,
	Copy,
	Download,
	Edit,
	Folder,
	GitMerge,
	Gift,
	Grid,
	Info,
	Layers,
	Layout,
	List,
	Lock,
	Maximize2,
	Menu,
	Mic,
	Minimize2,
	Monitor,
	Play,
	Plus,
	Power,
	Printer,
	RefreshCw,
	RotateCcw,
	Save,
	Scissors,
	Search,
	Settings,
	Shield,
	SidebarClose,
	SidebarOpen,
	SkipBack,
	SkipForward,
	Smile,
	Star,
	Terminal,
	Trash,
	Undo,
	Redo,
	User,
	Wifi,
	X,
	Zap,
} from 'lucide-react'
import type { ComponentType } from 'react'

export type ComplexityLevel = 'basic' | 'intermediate' | 'advanced' | 'expert'
export type Category = 'general' | 'window' | 'text' | 'system' | 'browser' | 'media'
export type OS = 'windows' | 'mac'

export interface ToolRecommendation {
	/** App name, e.g. "Raycast" */
	name: string
	/** Homepage URL */
	url: string
	/** Which OS this tool is for. Defaults to mac since most tools recommended are Mac apps that fill a Windows-feature gap. */
	os?: OS
	/** Why this tool helps for this specific shortkey. */
	description: string
}

export interface Shortkey {
	id: number
	slug: string
	windows: string
	/** Mac equivalent, or null when there is no native Mac shortcut. */
	mac: string | null
	description: string
	/** OS-neutral fallback explanation. Used when windowsExplanation/macExplanation are absent. */
	explanation: string
	/** Windows-only explanation. Replaces `explanation` when OS toggle is set to Windows. */
	windowsExplanation?: string
	/** Mac-only explanation. Replaces `explanation` when OS toggle is set to Mac. */
	macExplanation?: string
	/** Additional Mac-only caveat shown beneath the Mac explanation. */
	macNote?: string
	/** Recommended third-party apps that improve on the native experience for this shortkey. Shown on the detail page only. */
	tools?: ToolRecommendation[]
	Icon: ComponentType<{ className?: string }>
	complexity: ComplexityLevel
	category: Category
}

export const complexityLabels: Record<ComplexityLevel, string> = {
	basic: 'Basis',
	intermediate: 'Gemiddeld',
	advanced: 'Gevorderd',
	expert: 'Expert',
}

export const categoryLabels: Record<Category, string> = {
	general: 'Algemeen',
	window: 'Vensters',
	text: 'Tekst',
	system: 'Systeem',
	browser: 'Browser',
	media: 'Media',
}

export const complexityDescriptions: Record<ComplexityLevel, string> = {
	basic: 'Onmisbare sneltoetsen die elke gebruiker dagelijks gebruikt.',
	intermediate: 'Handige toetsencombinaties voor wie al wat ervaring heeft.',
	advanced: 'Tijdwinst voor power-users die hun workflow optimaliseren.',
	expert: 'Verborgen pareltjes en geavanceerde combinaties voor specialisten.',
}

export const categoryDescriptions: Record<Category, string> = {
	general: 'Algemene sneltoetsen die je in vrijwel elke toepassing kunt gebruiken.',
	window: 'Vensterbeheer: snappen, virtuele bureaubladen en monitor-navigatie.',
	text: 'Tekstbewerking, opmaak en navigatie binnen documenten.',
	system: 'Systeembeheer, instellingen, Startmenu, Verkenner en meer.',
	browser: 'Sneltoetsen voor webbrowsers en toepassingen met tabbladen.',
	media: 'Media-afspelen, opnames, audio en video.',
}

export const complexitySlugs: Record<ComplexityLevel, string> = {
	basic: 'basis',
	intermediate: 'gemiddeld',
	advanced: 'gevorderd',
	expert: 'expert',
}

export const categorySlugs: Record<Category, string> = {
	general: 'algemeen',
	window: 'vensters',
	text: 'tekst',
	system: 'systeem',
	browser: 'browser',
	media: 'media',
}

export const complexityBySlug: Record<string, ComplexityLevel> = Object.fromEntries(
	Object.entries(complexitySlugs).map(([k, v]) => [v, k as ComplexityLevel]),
)

export const categoryBySlug: Record<string, Category> = Object.fromEntries(
	Object.entries(categorySlugs).map(([k, v]) => [v, k as Category]),
)

export const osLabels: Record<OS, string> = {
	windows: 'Microsoft Windows',
	mac: 'macOS',
}

/**
 * Search aliases for keys and modifier glyphs. Lets a user type "option"
 * or "command" and still match Mac shortcuts that contain ⌥ or ⌘, and vice
 * versa for Windows vs Mac modifier naming.
 */
const KEY_ALIASES: Record<string, string[]> = {
	'⌘': ['command', 'cmd', 'meta', 'super'],
	'⌥': ['option', 'opt', 'alt'],
	'⌃': ['control', 'ctrl'],
	'⇧': ['shift'],
	'⏎': ['enter', 'return'],
	'⏏': ['eject'],
	'⊞': ['windows', 'win', 'super', 'meta'],
	win: ['windows', 'cmd', 'command'],
	windows: ['win', 'cmd', 'command'],
	ctrl: ['control'],
	alt: ['option', 'opt'],
	shift: ['shift'],
	spatie: ['space', 'spacebar', 'spatiebalk'],
	enter: ['return', 'enter'],
	esc: ['escape'],
	del: ['delete'],
	prtscn: ['printscreen', 'print screen', 'schermafdruk', 'screenshot'],
	tab: ['tab'],
	'←': ['left', 'links', 'pijl links'],
	'→': ['right', 'rechts', 'pijl rechts'],
	'↑': ['up', 'omhoog', 'pijl omhoog'],
	'↓': ['down', 'omlaag', 'pijl omlaag'],
}

function expandKeyAliases(text: string): string {
	let out = text
	for (const [key, aliases] of Object.entries(KEY_ALIASES)) {
		// Word-boundary-ish match: works for both single-character glyphs and
		// alphanumeric key names. Glyphs use literal contains; words use \b.
		if (/^[a-z]+$/i.test(key)) {
			const regex = new RegExp(`\\b${key}\\b`, 'gi')
			if (regex.test(out)) out += ' ' + aliases.join(' ')
		} else if (out.includes(key)) {
			out += ' ' + aliases.join(' ')
		}
	}
	return out
}

/**
 * Build a lowercase searchable haystack for one shortkey, including alias-
 * expanded combo strings so "option" finds ⌥ and "command" finds ⌘.
 */
export function buildShortkeyHaystack(k: Shortkey): string {
	const parts: string[] = [
		k.description,
		k.windows,
		k.mac ?? '',
		k.explanation,
		k.windowsExplanation ?? '',
		k.macExplanation ?? '',
		k.macNote ?? '',
		expandKeyAliases(k.windows),
		k.mac ? expandKeyAliases(k.mac) : '',
		(k.tools ?? []).map((t) => `${t.name} ${t.description}`).join(' '),
		categoryLabels[k.category],
		complexityLabels[k.complexity],
	]
	return parts.join(' ').toLowerCase()
}

/**
 * Multi-term AND match. "win shift s" requires all three terms in the
 * haystack, in any order. Empty query matches everything.
 */
export function matchesQuery(haystack: string, query: string): boolean {
	const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
	if (terms.length === 0) return true
	return terms.every((t) => haystack.includes(t))
}

export const shortkeys: Shortkey[] = [
	// ── Basic general ───────────────────────────────
	{
		id: 1,
		slug: 'alt-tab',
		windows: 'Alt + Tab',
		mac: '⌘ + Tab',
		description: 'Wissel tussen vensters',
		explanation:
			'Bladert door geopende vensters of apps. Houd de modifier ingedrukt, druk meerdere keren op Tab en laat los om het geselecteerde item te activeren.',
		windowsExplanation:
			'Houd Alt ingedrukt en druk op Tab om door alle open vensters te bladeren. Shift + Tab gaat terug.',
		macExplanation:
			'Houd ⌘ ingedrukt en druk op Tab om door geopende apps te wisselen (niet per los venster — daarvoor binnen een app ⌘ + ` gebruiken).',
		Icon: Layers,
		complexity: 'basic',
		category: 'general',
	},
	{
		id: 2,
		slug: 'ctrl-c',
		windows: 'Ctrl + C',
		mac: '⌘ + C',
		description: 'Kopieer selectie',
		explanation: 'Kopieert geselecteerde tekst of bestanden naar het klembord voor later gebruik.',
		Icon: Copy,
		complexity: 'basic',
		category: 'text',
	},
	{
		id: 3,
		slug: 'ctrl-v',
		windows: 'Ctrl + V',
		mac: '⌘ + V',
		description: 'Plak inhoud',
		explanation: 'Plakt de inhoud van het klembord op de huidige positie van de cursor.',
		Icon: Copy,
		complexity: 'basic',
		category: 'text',
	},
	{
		id: 4,
		slug: 'ctrl-x',
		windows: 'Ctrl + X',
		mac: '⌘ + X',
		description: 'Knip selectie',
		explanation: 'Verwijdert geselecteerde tekst of bestanden en plaatst ze op het klembord.',
		macNote: 'In Finder bestaat geen knippen — gebruik ⌘ + C en daarna ⌘ + ⌥ + V om bestanden te verplaatsen.',
		Icon: Scissors,
		complexity: 'basic',
		category: 'text',
	},
	{
		id: 5,
		slug: 'ctrl-z',
		windows: 'Ctrl + Z',
		mac: '⌘ + Z',
		description: 'Ongedaan maken',
		explanation: 'Maakt de meest recente actie ongedaan, handig voor het corrigeren van fouten.',
		Icon: Undo,
		complexity: 'basic',
		category: 'general',
	},
	{
		id: 6,
		slug: 'ctrl-y',
		windows: 'Ctrl + Y',
		mac: '⌘ + ⇧ + Z',
		description: 'Opnieuw uitvoeren',
		explanation: 'Voert de laatst ongedaan gemaakte actie opnieuw uit (redo).',
		Icon: Redo,
		complexity: 'intermediate',
		category: 'general',
	},

	// ── Window basics ───────────────────────────────
	{
		id: 7,
		slug: 'win-d',
		windows: '⊞ Win + D',
		mac: 'F11',
		description: 'Toon/verberg bureaublad',
		explanation: 'Minimaliseert alle vensters in één keer om het bureaublad te tonen.',
		windowsExplanation:
			'Minimaliseert direct alle vensters zodat je het bureaublad ziet. Druk nogmaals om alle vensters te herstellen.',
		macExplanation:
			'Toont het bureaublad. Gebruik anders een vier-vinger-spread op het trackpad om hetzelfde te doen.',
		Icon: Monitor,
		complexity: 'basic',
		category: 'window',
	},
	{
		id: 8,
		slug: 'win-l',
		windows: '⊞ Win + L',
		mac: '⌃ + ⌘ + Q',
		description: 'Vergrendel computer',
		explanation:
			'Vergrendelt je computer onmiddellijk, waardoor inloggegevens nodig zijn om terug te keren.',
		Icon: Lock,
		complexity: 'basic',
		category: 'system',
	},
	{
		id: 9,
		slug: 'win-e',
		windows: '⊞ Win + E',
		mac: '⌘ + ⌥ + Spatie',
		description: 'Open Verkenner / Finder',
		explanation: 'Opent een nieuw bestandsbeheer-venster.',
		windowsExplanation: 'Opent direct een nieuw Windows Verkenner-venster om door bestanden en mappen te bladeren.',
		macExplanation: 'Opent een nieuw Finder-zoekvenster om door bestanden en mappen te bladeren.',
		Icon: Folder,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 10,
		slug: 'win-i',
		windows: '⊞ Win + I',
		mac: '⌘ + ,',
		description: 'Open Instellingen / Voorkeuren',
		explanation: 'Opent het instellingen- of voorkeurenscherm.',
		windowsExplanation: 'Opent het Windows Instellingenmenu om je systeem te configureren.',
		macExplanation: 'Opent het voorkeurenvenster van de actieve app (het standaard Mac-equivalent).',
		Icon: Settings,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 11,
		slug: 'ctrl-shift-esc',
		windows: 'Ctrl + Shift + Esc',
		mac: '⌘ + ⌥ + Esc',
		description: 'Open Taakbeheer / Forceer stop',
		explanation: 'Toont actieve processen en laat je vastgelopen apps afsluiten.',
		windowsExplanation:
			'Opent Taakbeheer direct, zonder het beveiligingsscherm. Ideaal voor het monitoren van processen of het afsluiten van vastgelopen apps.',
		macExplanation:
			'Opent het venster "Forceer stop" om vastgelopen apps direct af te sluiten zonder een omweg via het Apple-menu.',
		Icon: Activity,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 12,
		slug: 'alt-f4',
		windows: 'Alt + F4',
		mac: '⌘ + Q',
		description: 'Sluit venster / app',
		explanation: 'Sluit het actieve venster of stopt de huidige toepassing.',
		windowsExplanation:
			'Sluit het actieve venster. Als er geen venster actief is, opent het Afsluiten-dialoogvenster.',
		macExplanation:
			'Stopt de huidige app volledig. Wil je enkel het venster sluiten, gebruik dan ⌘ + W.',
		Icon: X,
		complexity: 'intermediate',
		category: 'window',
	},

	// ── Window management ───────────────────────────
	{
		id: 31,
		slug: 'win-left',
		windows: '⊞ Win + ←',
		mac: '⌃ + ⌥ + ←',
		description: 'Venster naar links',
		explanation:
			'Snapt het actieve venster naar de linkerhelft van het scherm. Op macOS Sequoia (15+) tegelt ⌃ + ⌥ + ← het venster naar links.',
		tools: [
			{
				name: 'Raycast',
				url: 'https://www.raycast.com/core-features/window-management',
				description:
					'Window Management met snappen, eigen presets, gridindelingen en multi-monitor support. Krachtiger dan macOS\' ingebouwde tegelen.',
			},
			{
				name: 'Rectangle',
				url: 'https://rectangleapp.com',
				description: 'Open-source, gratis. Bekend om de halve/kwart-snaps via ⌃ + ⌥ + arrows — exact zoals Windows-snap.',
			},
			{
				name: 'Magnet',
				url: 'https://magnet.crowdcafe.com',
				description: 'Mac App Store-app met sneltoetsen voor halve, kwart en zesde-schermplaatsing.',
			},
		],
		Icon: SidebarOpen,
		complexity: 'intermediate',
		category: 'window',
	},
	{
		id: 32,
		slug: 'win-right',
		windows: '⊞ Win + →',
		mac: '⌃ + ⌥ + →',
		description: 'Venster naar rechts',
		explanation: 'Snapt het actieve venster naar de rechterhelft van het scherm.',
		Icon: SidebarClose,
		complexity: 'intermediate',
		category: 'window',
	},
	{
		id: 33,
		slug: 'win-up',
		windows: '⊞ Win + ↑',
		mac: '⌃ + ⌘ + F',
		description: 'Venster maximaliseren',
		explanation: 'Vergroot het actieve venster naar het volledige scherm.',
		windowsExplanation: 'Maximaliseert het actieve venster om het volledige scherm te vullen.',
		macExplanation:
			'Schakelt naar echte volledig-schermmodus — de menubalk en het Dock verbergen. Druk nogmaals om terug te keren.',
		Icon: Maximize2,
		complexity: 'intermediate',
		category: 'window',
	},
	{
		id: 34,
		slug: 'win-down',
		windows: '⊞ Win + ↓',
		mac: '⌘ + M',
		description: 'Venster minimaliseren',
		explanation:
			'Minimaliseert het actieve venster, of herstelt een gemaximaliseerd venster naar zijn oorspronkelijke grootte.',
		Icon: Minimize2,
		complexity: 'intermediate',
		category: 'window',
	},
	{
		id: 35,
		slug: 'win-shift-arrow',
		windows: '⊞ Win + Shift + ←/→',
		mac: null,
		description: 'Verplaats naar andere monitor',
		explanation:
			'Verplaatst het actieve venster naar een andere aangesloten monitor met behoud van de venstergrootte.',
		macNote: 'macOS heeft geen ingebouwde sneltoets.',
		tools: [
			{
				name: 'Raycast',
				url: 'https://www.raycast.com/core-features/window-management',
				description: '"Move to Next Display" met een eigen sneltoets — exact wat ⊞ + Shift + → op Windows doet.',
			},
			{
				name: 'Rectangle',
				url: 'https://rectangleapp.com',
				description: 'Bind ⌃ + ⌥ + ⌘ + → aan "Next Display" voor een 1-op-1 equivalent.',
			},
		],
		Icon: ArrowLeftRight,
		complexity: 'advanced',
		category: 'window',
	},
	{
		id: 36,
		slug: 'win-home',
		windows: '⊞ Win + Home',
		mac: '⌘ + ⌥ + H',
		description: 'Verberg andere vensters',
		explanation: 'Brengt alleen het actieve venster naar voren door de rest te verbergen.',
		windowsExplanation:
			'Minimaliseert alle vensters behalve het actieve. Druk nogmaals om alle vensters te herstellen.',
		macExplanation:
			'Verbergt alle vensters van andere apps. Handig om focus te krijgen op één app.',
		Icon: Layout,
		complexity: 'advanced',
		category: 'window',
	},
	{
		id: 37,
		slug: 'win-shift-up',
		windows: '⊞ Win + Shift + ↑',
		mac: null,
		description: 'Verticaal uitrekken',
		explanation:
			'Rekt het venster verticaal uit tot de maximale hoogte terwijl de breedte behouden blijft.',
		Icon: ArrowUpDown,
		complexity: 'advanced',
		category: 'window',
	},

	// ── Virtual desktops / Mission Control ───────────
	{
		id: 38,
		slug: 'win-ctrl-d',
		windows: '⊞ Win + Ctrl + D',
		mac: '⌃ + ↑',
		description: 'Nieuw virtueel bureaublad',
		explanation: 'Voegt een nieuwe virtuele werkruimte toe om je vensters te organiseren.',
		windowsExplanation:
			'Creëert direct een nieuw virtueel bureaublad, handig om je werk per project op te delen.',
		macExplanation:
			'⌃ + ↑ opent Mission Control. Beweeg de muis naar de bovenrand en klik op de + om een nieuwe Space toe te voegen — macOS heeft geen sneltoets die in één keer een Space aanmaakt.',
		Icon: Columns,
		complexity: 'expert',
		category: 'window',
	},
	{
		id: 39,
		slug: 'win-ctrl-arrow',
		windows: '⊞ Win + Ctrl + ←/→',
		mac: '⌃ + ←/→',
		description: 'Wissel tussen bureaubladen',
		explanation: 'Navigeert tussen virtuele bureaubladen (Windows) of Spaces (macOS).',
		Icon: GitMerge,
		complexity: 'expert',
		category: 'window',
	},
	{
		id: 40,
		slug: 'win-ctrl-f4',
		windows: '⊞ Win + Ctrl + F4',
		mac: null,
		description: 'Sluit virtueel bureaublad',
		explanation:
			'Sluit het huidige virtuele bureaublad en verplaatst de open vensters naar een ander bureaublad.',
		macNote: 'Op Mac via Mission Control (⌃ + ↑) op het kruisje van een Space klikken.',
		Icon: X,
		complexity: 'expert',
		category: 'window',
	},

	// ── System operations ───────────────────────────
	{
		id: 13,
		slug: 'win-r',
		windows: '⊞ Win + R',
		mac: '⌘ + Spatie',
		description: 'Uitvoeren / Spotlight',
		explanation: 'Opent een snelle invoer voor het starten van programma\'s en commando\'s.',
		windowsExplanation:
			"Opent het Uitvoeren-dialoogvenster om programma's, mappen of commando's snel te starten.",
		macExplanation:
			'Opent Spotlight om razendsnel apps, bestanden, instellingen of berekeningen op te zoeken.',
		tools: [
			{
				name: 'Raycast',
				url: 'https://www.raycast.com',
				description:
					'Vervang Spotlight: snellere zoekresultaten, calculator, snippets, scripts en honderden extensies (GitHub, Linear, Notion, Google Workspace…).',
			},
			{
				name: 'Alfred',
				url: 'https://www.alfredapp.com',
				description: 'De originele Spotlight-vervanger. Workflows, clipboard history en hotkeys met de Powerpack.',
			},
		],
		Icon: Command,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 14,
		slug: 'win-s',
		windows: '⊞ Win + S',
		mac: '⌘ + Spatie',
		description: 'Open Zoeken',
		explanation: 'Doorzoekt het hele systeem op bestanden, apps en instellingen.',
		windowsExplanation:
			"Opent de Windows-zoekfunctie om bestanden, programma's en instellingen te vinden.",
		macExplanation: 'Opent Spotlight, de centrale zoekfunctie van macOS.',
		Icon: Search,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 15,
		slug: 'win-a',
		windows: '⊞ Win + A',
		mac: null,
		description: 'Snelle instellingen',
		explanation: 'Toont snelle systeeminstellingen zoals wifi, volume en helderheid.',
		windowsExplanation:
			'Opent in Windows 11 het paneel Snelle instellingen met wifi, bluetooth, volume en helderheid. Vervangt het oude Actiecentrum.',
		macNote: 'Op Mac klik je op het Control Center-icoon in de menubalk — er is geen toetsenbordsneltoets.',
		Icon: Bell,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 16,
		slug: 'ctrl-alt-del',
		windows: 'Ctrl + Alt + Del',
		mac: '⌘ + ⌥ + Esc',
		description: 'Beveiligingsscherm / Forceer stop',
		explanation: 'Opent een systeemmenu om de computer te beheren bij problemen.',
		windowsExplanation:
			'Opent het Windows-beveiligingsscherm met opties als vergrendelen, afmelden, wachtwoord wijzigen en Taakbeheer.',
		macExplanation: 'Opent het Forceer stop-venster om vastgelopen apps direct af te sluiten.',
		Icon: Shield,
		complexity: 'intermediate',
		category: 'system',
	},

	// ── Browser & tabs ──────────────────────────────
	{
		id: 17,
		slug: 'win-tab',
		windows: '⊞ Win + Tab',
		mac: 'F3 / ⌃ + ↑',
		description: 'Taakweergave / Mission Control',
		explanation: 'Toont een overzicht van alle open vensters en virtuele werkruimten.',
		windowsExplanation:
			'Opent Taakweergave met alle open vensters en virtuele bureaubladen op één scherm.',
		macExplanation: 'Opent Mission Control: alle open vensters en Spaces in één oogopslag.',
		Icon: Grid,
		complexity: 'intermediate',
		category: 'window',
	},
	{
		id: 18,
		slug: 'ctrl-w',
		windows: 'Ctrl + W',
		mac: '⌘ + W',
		description: 'Sluit tabblad / venster',
		explanation: "Sluit het huidige tabblad of venster in browsers en andere programma's.",
		Icon: X,
		complexity: 'intermediate',
		category: 'browser',
	},
	{
		id: 19,
		slug: 'ctrl-t',
		windows: 'Ctrl + T',
		mac: '⌘ + T',
		description: 'Nieuw tabblad',
		explanation: "Opent een nieuw tabblad in browsers en programma's met tabbladen.",
		Icon: Plus,
		complexity: 'intermediate',
		category: 'browser',
	},
	{
		id: 20,
		slug: 'ctrl-shift-t',
		windows: 'Ctrl + Shift + T',
		mac: '⌘ + ⇧ + T',
		description: 'Heropen gesloten tabblad',
		explanation: 'Heropent het laatst gesloten tabblad in browsers. Kan meerdere keren worden gebruikt.',
		Icon: RotateCcw,
		complexity: 'advanced',
		category: 'browser',
	},
	{
		id: 41,
		slug: 'ctrl-tab',
		windows: 'Ctrl + Tab',
		mac: '⌃ + Tab',
		description: 'Volgende tabblad',
		explanation: "Wissel naar het volgende tabblad in browsers en andere programma's met tabbladen.",
		Icon: ArrowLeftRight,
		complexity: 'intermediate',
		category: 'browser',
	},
	{
		id: 42,
		slug: 'ctrl-shift-tab',
		windows: 'Ctrl + Shift + Tab',
		mac: '⌃ + ⇧ + Tab',
		description: 'Vorige tabblad',
		explanation: 'Wissel naar het vorige tabblad.',
		Icon: ArrowLeftRight,
		complexity: 'intermediate',
		category: 'browser',
	},
	{
		id: 43,
		slug: 'ctrl-d',
		windows: 'Ctrl + D',
		mac: '⌘ + D',
		description: 'Bladwijzer toevoegen',
		explanation: 'Voegt de huidige webpagina toe aan je bladwijzers in de meeste browsers.',
		Icon: Bookmark,
		complexity: 'intermediate',
		category: 'browser',
	},

	// ── Expert productivity ─────────────────────────
	{
		id: 44,
		slug: 'win-x',
		windows: '⊞ Win + X',
		mac: null,
		description: 'Geavanceerd menu (Power User)',
		explanation:
			'Opent het Power User-menu met snelle toegang tot Taakbeheer, Apparaatbeheer, Opdrachtprompt, PowerShell en meer.',
		Icon: Terminal,
		complexity: 'expert',
		category: 'system',
	},
	{
		id: 45,
		slug: 'alt-space',
		windows: 'Alt + Spatie',
		mac: null,
		description: 'Venster-besturingsmenu',
		explanation:
			'Opent het traditionele venstermenu voor verplaatsen, grootte wijzigen, minimaliseren en sluiten.',
		Icon: Layout,
		complexity: 'expert',
		category: 'window',
	},
	{
		id: 46,
		slug: 'f12-browser',
		windows: 'F12',
		mac: '⌘ + ⌥ + I',
		description: 'Ontwikkelaarshulpmiddelen',
		explanation:
			'Opent de ontwikkelaarshulpmiddelen in browsers voor het inspecteren van HTML, CSS en JavaScript.',
		Icon: Code,
		complexity: 'expert',
		category: 'browser',
	},
	{
		id: 47,
		slug: 'ctrl-shift-v',
		windows: 'Ctrl + Shift + V',
		mac: '⌘ + ⇧ + ⌥ + V',
		description: 'Plakken zonder opmaak',
		explanation: 'Plakt tekst zonder opmaak — perfect bij het kopiëren tussen verschillende toepassingen.',
		Icon: Copy,
		complexity: 'advanced',
		category: 'text',
	},

	// ── Start / Finder / system ─────────────────────
	{
		id: 21,
		slug: 'win',
		windows: '⊞ Win',
		mac: '⌘ + Spatie',
		description: 'Open Startmenu / Spotlight',
		explanation: 'Opent de centrale launcher van het besturingssysteem.',
		windowsExplanation:
			"Opent het Windows Startmenu met toegang tot alle programma's, instellingen en de zoekfunctie.",
		macExplanation: 'Opent Spotlight als universele launcher en zoekbalk voor je Mac.',
		tools: [
			{
				name: 'Raycast',
				url: 'https://www.raycast.com',
				description:
					'Volwaardige Spotlight-vervanger met snellere zoekresultaten, AI-commando\'s, snippets en extensies voor je hele toolchain.',
			},
			{
				name: 'Alfred',
				url: 'https://www.alfredapp.com',
				description: 'Klassieke launcher met workflows en een sterk power-user-ecosysteem.',
			},
		],
		Icon: Menu,
		complexity: 'basic',
		category: 'system',
	},
	{
		id: 22,
		slug: 'ctrl-p',
		windows: 'Ctrl + P',
		mac: '⌘ + P',
		description: 'Afdrukken',
		explanation: "Opent het afdrukvenster in de meeste programma's.",
		Icon: Printer,
		complexity: 'intermediate',
		category: 'general',
	},
	{
		id: 23,
		slug: 'ctrl-f',
		windows: 'Ctrl + F',
		mac: '⌘ + F',
		description: 'Zoeken in document',
		explanation: 'Opent de zoekfunctie binnen het huidige document of de webpagina.',
		Icon: Search,
		complexity: 'intermediate',
		category: 'general',
	},
	{
		id: 24,
		slug: 'alt-enter',
		windows: 'Alt + Enter',
		mac: '⌘ + I',
		description: 'Eigenschappen / Info',
		explanation: 'Toont metadata van het geselecteerde bestand of de geselecteerde map.',
		windowsExplanation: 'Toont de eigenschappen van het geselecteerde bestand, map of object.',
		macExplanation: 'Toont een Get Info-venster met details over het geselecteerde Finder-item.',
		Icon: Info,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 26,
		slug: 'win-u',
		windows: '⊞ Win + U',
		mac: '⌘ + ⌥ + F5',
		description: 'Toegankelijkheid',
		explanation: 'Opent toegankelijkheidsopties zoals vergrootglas, schermlezer en kleurfilters.',
		windowsExplanation:
			'Opent het Toegankelijkheidscentrum met opties voor vergrootglas, Verteller, contrast en meer.',
		macExplanation: 'Opent het paneel Toegankelijkheid met opties voor VoiceOver, Zoom en kleurfilters.',
		Icon: User,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 27,
		slug: 'win-h',
		windows: '⊞ Win + H',
		mac: 'fn fn',
		description: 'Dictaat / Voice typing',
		explanation:
			'Start spraakherkenning om tekst te dicteren. Op Mac: druk twee keer snel op de fn-toets.',
		Icon: Mic,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 28,
		slug: 'win-k',
		windows: '⊞ Win + K',
		mac: null,
		description: 'Verbinden met draadloos scherm',
		explanation:
			'Opent het Verbinden-paneel om te koppelen met draadloze beeldschermen of Bluetooth-apparaten.',
		Icon: Wifi,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 29,
		slug: 'win-v',
		windows: '⊞ Win + V',
		mac: null,
		description: 'Klembordgeschiedenis',
		explanation:
			'Opent de klembordgeschiedenis om eerder gekopieerde items terug te halen — vereist eenmalig activeren.',
		macNote: 'macOS heeft geen ingebouwde klembordgeschiedenis.',
		tools: [
			{
				name: 'Raycast',
				url: 'https://www.raycast.com/core-features/clipboard-history',
				description:
					'Clipboard History met afbeeldingen, tekst en links. Bind hem op ⌃⌘V voor parity met ⊞ + V.',
			},
			{
				name: 'Maccy',
				url: 'https://maccy.app',
				description: 'Lichte open-source klembordmanager. Volledig sneltoets-gedreven, gratis.',
			},
			{
				name: 'Paste',
				url: 'https://pasteapp.io',
				description: 'Mooi gestileerde, gesynchroniseerde klembordmanager voor Mac, iPhone en iPad.',
			},
		],
		Icon: ClipboardList,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 30,
		slug: 'win-dot',
		windows: '⊞ Win + .',
		mac: '⌃ + ⌘ + Spatie',
		description: 'Emoji-toetsenbord',
		explanation: "Opent het emoji- en symbolen-paneel voor het invoegen van emoji's en speciale tekens.",
		tools: [
			{
				name: 'Raycast',
				url: 'https://www.raycast.com/extensions/store/emoji-symbols',
				description: 'Raycast Emoji & Symbols is sneller met fuzzy zoeken, recent-gebruikt en aliassen.',
			},
		],
		Icon: Smile,
		complexity: 'intermediate',
		category: 'general',
	},
	{
		id: 48,
		slug: 'ctrl-shift-n',
		windows: 'Ctrl + Shift + N',
		mac: '⌘ + ⇧ + N',
		description: 'Nieuwe map maken',
		explanation: 'Maakt een nieuwe map in Verkenner (Windows) of Finder (Mac) op de huidige locatie.',
		Icon: Folder,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 49,
		slug: 'f2',
		windows: 'F2',
		mac: 'Enter',
		description: 'Hernoemen',
		explanation: 'Hernoemt het geselecteerde bestand of de geselecteerde map.',
		macExplanation:
			'Selecteer een bestand of map in Finder en druk op Enter om het te hernoemen — geen dubbelklik nodig.',
		Icon: Edit,
		complexity: 'basic',
		category: 'general',
	},
	{
		id: 50,
		slug: 'f11',
		windows: 'F11',
		mac: '⌃ + ⌘ + F',
		description: 'Volledig scherm',
		explanation: 'Schakelt de volledig-schermmodus aan/uit in browsers en veel andere apps.',
		Icon: Maximize2,
		complexity: 'intermediate',
		category: 'general',
	},
	{
		id: 51,
		slug: 'win-shift-s',
		windows: '⊞ Win + Shift + S',
		mac: '⌘ + ⇧ + 4',
		description: 'Schermafdruk van gebied',
		explanation: 'Maak een schermafdruk van een door jou geselecteerd gebied.',
		windowsExplanation:
			'Opent het Knipprogramma om een rechthoekig, vrij of vensterspecifiek gebied uit te knippen. De afbeelding komt op het klembord én verschijnt in een melding voor verdere bewerking.',
		macExplanation:
			'Verandert de cursor in een dradenkruis om een gebied te selecteren. De schermafdruk wordt opgeslagen op het bureaublad (of klembord met ⌃ erbij).',
		Icon: Scissors,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 52,
		slug: 'ctrl-shift-del',
		windows: 'Ctrl + Shift + Del',
		mac: '⌘ + ⇧ + Delete',
		description: 'Browsergegevens wissen',
		explanation: 'Opent in de meeste browsers het venster om geschiedenis, cookies en cache te wissen.',
		Icon: Trash,
		complexity: 'advanced',
		category: 'browser',
	},
	{
		id: 53,
		slug: 'win-g',
		windows: '⊞ Win + G',
		mac: null,
		description: 'Xbox Game Bar',
		explanation: 'Opent de Xbox Game Bar voor opname, screenshots en performance-overlay tijdens games.',
		Icon: Zap,
		complexity: 'advanced',
		category: 'system',
	},

	// ── Media & projection ──────────────────────────
	{
		id: 54,
		slug: 'win-alt-p',
		windows: '⊞ Win + Alt + P',
		mac: null,
		description: 'Projectievenster',
		explanation: 'Opent het projectievenster voor het instellen van een tweede beeldscherm of projector.',
		Icon: Monitor,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 55,
		slug: 'ctrl-space',
		windows: 'Ctrl + Spatie',
		mac: 'Spatie',
		description: 'Afspelen / Pauzeren',
		explanation: 'Speelt media af of pauzeert deze in veel spelers.',
		windowsExplanation: 'Speelt media af of pauzeert deze in veel mediaspelers en sommige webdiensten.',
		macExplanation:
			'In QuickTime, YouTube en de meeste webspelers volstaat de spatiebalk. Ctrl + Spatie wordt op Mac vooral gebruikt voor woordsuggesties.',
		Icon: Play,
		complexity: 'basic',
		category: 'media',
	},
	{
		id: 56,
		slug: 'alt-left',
		windows: 'Alt + ←',
		mac: '⌘ + [',
		description: 'Terug navigeren',
		explanation: 'Navigeert terug naar de vorige pagina in browsers en bestandsverkenners.',
		Icon: SkipBack,
		complexity: 'basic',
		category: 'browser',
	},
	{
		id: 57,
		slug: 'alt-right',
		windows: 'Alt + →',
		mac: '⌘ + ]',
		description: 'Vooruit navigeren',
		explanation: 'Navigeert vooruit naar de volgende pagina in browsers en bestandsverkenners.',
		Icon: SkipForward,
		complexity: 'basic',
		category: 'browser',
	},
	{
		id: 58,
		slug: 'f5',
		windows: 'F5',
		mac: '⌘ + R',
		description: 'Vernieuwen',
		explanation: 'Vernieuwt de huidige webpagina, map of toepassing.',
		Icon: RefreshCw,
		complexity: 'basic',
		category: 'general',
	},
	{
		id: 59,
		slug: 'ctrl-s',
		windows: 'Ctrl + S',
		mac: '⌘ + S',
		description: 'Opslaan',
		explanation: 'Slaat het huidige document of bestand op.',
		Icon: Save,
		complexity: 'basic',
		category: 'general',
	},
	{
		id: 60,
		slug: 'ctrl-a',
		windows: 'Ctrl + A',
		mac: '⌘ + A',
		description: 'Alles selecteren',
		explanation: 'Selecteert alle tekst of alle bestanden in de huidige weergave.',
		Icon: Check,
		complexity: 'basic',
		category: 'text',
	},
	{
		id: 61,
		slug: 'win-pause',
		windows: '⊞ Win + Pauze',
		mac: null,
		description: 'Systeemeigenschappen',
		explanation: 'Toont informatie over je computer (processor, geheugen, versie).',
		windowsExplanation:
			'Opent in Windows 11 de pagina "Over" in Instellingen met systeeminformatie zoals processor en RAM.',
		macNote:
			'Geen sneltoets op Mac — gebruik Apple-menu → Over deze Mac voor dezelfde informatie.',
		Icon: Info,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 62,
		slug: 'alt-menu',
		windows: 'Alt + (letter)',
		mac: '⌃ + F2',
		description: 'Menubalk bedienen',
		explanation: 'Bedien menu-items met het toetsenbord in plaats van de muis.',
		windowsExplanation:
			'Alt + onderstreepte letter opent het bijbehorende menu (bijvoorbeeld Alt + F voor Bestand).',
		macExplanation:
			'⌃ + F2 verplaatst de focus naar de menubalk. Navigeer dan met ←/→ en open een menu met Enter.',
		Icon: List,
		complexity: 'intermediate',
		category: 'general',
	},
	{
		id: 63,
		slug: 'ctrl-b',
		windows: 'Ctrl + B',
		mac: '⌘ + B',
		description: 'Vet maken',
		explanation: 'Maakt geselecteerde tekst vet in tekstverwerkers en webapplicaties.',
		Icon: Edit,
		complexity: 'basic',
		category: 'text',
	},
	{
		id: 64,
		slug: 'ctrl-i',
		windows: 'Ctrl + I',
		mac: '⌘ + I',
		description: 'Cursief maken',
		explanation: 'Maakt geselecteerde tekst cursief.',
		Icon: Edit,
		complexity: 'basic',
		category: 'text',
	},
	{
		id: 65,
		slug: 'ctrl-u',
		windows: 'Ctrl + U',
		mac: '⌘ + U',
		description: 'Onderstrepen',
		explanation: 'Onderstreept geselecteerde tekst.',
		Icon: Edit,
		complexity: 'basic',
		category: 'text',
	},
	{
		id: 66,
		slug: 'ctrl-end',
		windows: 'Ctrl + End',
		mac: '⌘ + ↓',
		description: 'Naar documenteinde',
		explanation: 'Verplaatst de cursor naar het einde van het document.',
		Icon: ArrowUpDown,
		complexity: 'intermediate',
		category: 'text',
	},
	{
		id: 67,
		slug: 'ctrl-home',
		windows: 'Ctrl + Home',
		mac: '⌘ + ↑',
		description: 'Naar documentbegin',
		explanation: 'Verplaatst de cursor naar het begin van het document.',
		Icon: ArrowUpDown,
		complexity: 'intermediate',
		category: 'text',
	},
	{
		id: 68,
		slug: 'ctrl-j',
		windows: 'Ctrl + J',
		mac: '⌘ + ⇧ + J',
		description: 'Downloads openen',
		explanation: 'Opent het downloadvenster in veel browsers.',
		windowsExplanation: 'Opent in Chrome, Edge en Firefox direct het downloadvenster.',
		macExplanation:
			'Werkt in Chrome (⌘ + ⇧ + J). In Safari gebruik je ⌘ + ⌥ + L voor het Downloads-paneel.',
		Icon: Download,
		complexity: 'intermediate',
		category: 'browser',
	},
	{
		id: 69,
		slug: 'ctrl-k',
		windows: 'Ctrl + K',
		mac: '⌘ + L',
		description: 'Adres-/zoekbalk',
		explanation: 'Plaatst de cursor direct in de adres- of zoekbalk van de browser.',
		windowsExplanation: 'Plaatst de cursor in de zoekbalk in veel browsers (alternatief voor Ctrl + L).',
		macExplanation: 'Plaatst de cursor in de adresbalk van Safari, Chrome, Firefox en de meeste andere browsers.',
		Icon: Search,
		complexity: 'intermediate',
		category: 'browser',
	},
	{
		id: 70,
		slug: 'ctrl-shift-b',
		windows: 'Ctrl + Shift + B',
		mac: '⌘ + ⇧ + B',
		description: 'Bladwijzerbalk tonen',
		explanation: 'Toont of verbergt de bladwijzerbalk in de meeste browsers.',
		Icon: Star,
		complexity: 'intermediate',
		category: 'browser',
	},
	{
		id: 71,
		slug: 'win-c',
		windows: '⊞ Win + C',
		mac: null,
		description: 'Copilot openen',
		explanation: 'Opent een AI-assistent in een zijbalk.',
		windowsExplanation:
			'Opent Microsoft Copilot als zijbalk-assistent in Windows 11 voor vragen, samenvattingen en automatiseringen.',
		macNote:
			'macOS heeft geen ingebouwde sneltoets voor Copilot — installeer de Copilot-app of gebruik bv. ChatGPT-app met een eigen sneltoets.',
		Icon: Mic,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 77,
		slug: 'win-plus',
		windows: '⊞ Win + Plus',
		mac: '⌥ + ⌘ + =',
		description: 'Inzoomen (Vergrootglas)',
		explanation: 'Zoomt in met het ingebouwde vergrootglas voor betere leesbaarheid.',
		macNote: 'Op Mac moet je Zoom inschakelen in Systeeminstellingen → Toegankelijkheid.',
		Icon: Search,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 78,
		slug: 'win-minus',
		windows: '⊞ Win + Min',
		mac: '⌥ + ⌘ + -',
		description: 'Uitzoomen (Vergrootglas)',
		explanation: 'Zoomt uit met het ingebouwde vergrootglas.',
		Icon: Search,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 79,
		slug: 'win-esc',
		windows: '⊞ Win + Esc',
		mac: '⌥ + ⌘ + 8',
		description: 'Vergrootglas sluiten / Zoom toggle',
		explanation: 'Schakelt het systeem-vergrootglas aan of uit.',
		windowsExplanation: 'Sluit het Windows Vergrootglas onmiddellijk wanneer dit actief is.',
		macExplanation: 'Schakelt de Zoom-functie van macOS aan/uit (in te schakelen via Toegankelijkheid).',
		Icon: X,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 80,
		slug: 'ctrl-alt-tab',
		windows: 'Ctrl + Alt + Tab',
		mac: '⌘ + Tab',
		description: 'App-switcher vastzetten',
		explanation: 'Toont de app-switcher zonder dat je een toets moet vasthouden om te navigeren.',
		Icon: Layers,
		complexity: 'advanced',
		category: 'general',
	},
	{
		id: 81,
		slug: 'ctrl-n',
		windows: 'Ctrl + N',
		mac: '⌘ + N',
		description: 'Nieuw document / venster',
		explanation: 'Creëert een nieuw document, venster of instantie van de huidige toepassing.',
		Icon: Plus,
		complexity: 'basic',
		category: 'general',
	},
	{
		id: 82,
		slug: 'alt-f4-desktop',
		windows: 'Alt + F4',
		mac: '⌃ + ⌘ + Power',
		description: 'Afsluit-dialoog',
		explanation: 'Toont opties om de computer af te sluiten, opnieuw op te starten of in slaapstand te zetten.',
		windowsExplanation:
			'Opent vanaf het bureaublad het Afsluiten-dialoogvenster met opties voor uitschakelen, opnieuw opstarten en slaapstand.',
		macExplanation: 'Forceert een herstart van de Mac (gebruik met beleid — werk wordt niet opgeslagen).',
		Icon: Power,
		complexity: 'basic',
		category: 'system',
	},
	{
		id: 83,
		slug: 'win-shift-m',
		windows: '⊞ Win + Shift + M',
		mac: null,
		description: 'Geminimaliseerde vensters herstellen',
		explanation: 'Herstelt alle eerder geminimaliseerde vensters (omgekeerde van ⊞ Win + M).',
		Icon: Maximize2,
		complexity: 'intermediate',
		category: 'window',
	},
	{
		id: 84,
		slug: 'win-b',
		windows: '⊞ Win + B',
		mac: '⌃ + F8',
		description: 'Focus systeemvak / menubalk',
		explanation: 'Verplaatst de focus naar de systeemicoontjes voor toetsenbordnavigatie.',
		windowsExplanation:
			'Verplaatst de focus naar het systeemvak (rechteronderhoek van de taakbalk). Navigeer met pijltoetsen.',
		macExplanation:
			'Verplaatst de focus naar de statusmenu-items rechts in de menubalk. Navigeer met ←/→.',
		Icon: Layout,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 85,
		slug: 'win-m',
		windows: '⊞ Win + M',
		mac: '⌘ + ⌥ + M',
		description: 'Alle vensters minimaliseren',
		explanation: 'Minimaliseert alle geopende vensters in één keer.',
		Icon: Minimize2,
		complexity: 'basic',
		category: 'window',
	},
	{
		id: 86,
		slug: 'win-number',
		windows: '⊞ Win + 1..9',
		mac: null,
		description: 'Start app op taakbalk',
		explanation:
			'Start of activeer de app die op die positie in de Windows-taakbalk staat (1 = eerste app, etc.).',
		macNote: 'macOS heeft geen ingebouwde positie-shortcut voor het Dock — gebruik tools als BetterTouchTool.',
		Icon: Menu,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 87,
		slug: 'ctrl-alt-arrow',
		windows: 'Ctrl + Alt + pijl',
		mac: null,
		description: 'Scherm draaien',
		explanation: 'Draait het scherm in de richting van de pijltoets (werkt niet op alle systemen).',
		Icon: RefreshCw,
		complexity: 'expert',
		category: 'system',
	},
	{
		id: 89,
		slug: 'ctrl-shift-enter',
		windows: 'Ctrl + Shift + Enter',
		mac: null,
		description: 'Als administrator uitvoeren',
		explanation: 'Voert een geselecteerd programma uit met verhoogde rechten.',
		windowsExplanation:
			'Start een geselecteerd programma vanuit Start of Uitvoeren met administratorrechten — alternatief voor "Uitvoeren als administrator".',
		macNote:
			'macOS heeft geen equivalente sneltoets. Verhoogde rechten gaan via een authenticatie-prompt of `sudo` in Terminal.',
		Icon: Shield,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 90,
		slug: 'win-semicolon',
		windows: '⊞ Win + ;',
		mac: '⌃ + ⌘ + Spatie',
		description: 'Emoji-venster (alternatief)',
		explanation: 'Alternatieve sneltoets om het emoji-venster te openen (zelfde als ⊞ Win + .).',
		Icon: Smile,
		complexity: 'intermediate',
		category: 'general',
	},

	// ── Windows 11-specifiek ────────────────────────
	{
		id: 91,
		slug: 'win-w',
		windows: '⊞ Win + W',
		mac: null,
		description: 'Widgets-paneel',
		explanation:
			'Opent het Widgets-paneel in Windows 11 met weer, nieuws, agenda, taken en sportuitslagen.',
		macNote: 'Op Mac open je widgets via de bureaubladrand of het meldingencentrum.',
		Icon: Layout,
		complexity: 'basic',
		category: 'system',
	},
	{
		id: 92,
		slug: 'win-n',
		windows: '⊞ Win + N',
		mac: 'fn + N',
		description: 'Meldingencentrum en agenda',
		explanation: 'Toont je recente meldingen en aankomende agenda-items.',
		windowsExplanation:
			'Opent in Windows 11 het meldingencentrum samen met de agenda (vroeger onderdeel van het Actiecentrum).',
		macExplanation:
			'Opent het Notification Center aan de rechterkant met meldingen en widgets.',
		Icon: Bell,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 93,
		slug: 'win-z',
		windows: '⊞ Win + Z',
		mac: null,
		description: 'Snap Layouts',
		explanation:
			'Toont de Snap Layouts (vensterindelingen) van Windows 11 zodat je het actieve venster snel in een raster kunt plaatsen.',
		macNote: 'macOS 15+ heeft Window Tiling: ⌃ + ⌥ + pijlen, of klik en houd de groene venster-knop.',
		tools: [
			{
				name: 'Raycast',
				url: 'https://www.raycast.com/core-features/window-management',
				description:
					'Eigen layouts (Left Half, Right Half, Maximize, Centered, custom grids) met aanpasbare sneltoetsen — een vollediger Snap Layouts-equivalent.',
			},
			{
				name: 'Rectangle Pro',
				url: 'https://rectangleapp.com/pro',
				description: 'Maak je eigen multi-monitor "snap zones" net als Snap Layouts in Windows 11.',
			},
		],
		Icon: Grid,
		complexity: 'intermediate',
		category: 'window',
	},
	{
		id: 94,
		slug: 'win-alt-up',
		windows: '⊞ Win + Alt + ↑',
		mac: '⌃ + ⌥ + ↑',
		description: 'Venster naar bovenste helft',
		explanation: 'Snapt het actieve venster naar de bovenste helft van het scherm.',
		Icon: Maximize2,
		complexity: 'advanced',
		category: 'window',
	},
	{
		id: 95,
		slug: 'win-alt-down',
		windows: '⊞ Win + Alt + ↓',
		mac: '⌃ + ⌥ + ↓',
		description: 'Venster naar onderste helft',
		explanation: 'Snapt het actieve venster naar de onderste helft van het scherm.',
		Icon: Minimize2,
		complexity: 'advanced',
		category: 'window',
	},
	{
		id: 96,
		slug: 'win-printscreen',
		windows: '⊞ Win + PrtScn',
		mac: '⌘ + ⇧ + 3',
		description: 'Schermafdruk opslaan',
		explanation: 'Maakt direct een schermafdruk van het volledige scherm en slaat hem op.',
		windowsExplanation:
			'Maakt een schermafdruk van het volledige scherm en slaat deze op in Afbeeldingen → Schermopnamen.',
		macExplanation:
			'Maakt een schermafdruk van het volledige scherm en slaat deze als PNG op het bureaublad op.',
		Icon: Save,
		complexity: 'basic',
		category: 'system',
	},
	{
		id: 97,
		slug: 'printscreen',
		windows: 'PrtScn',
		mac: '⌃ + ⌘ + ⇧ + 3',
		description: 'Hele scherm kopiëren',
		explanation: 'Kopieert een schermafdruk van het volledige scherm naar het klembord.',
		Icon: Scissors,
		complexity: 'basic',
		category: 'system',
	},
	{
		id: 98,
		slug: 'alt-printscreen',
		windows: 'Alt + PrtScn',
		mac: '⌘ + ⇧ + 4',
		description: 'Actief venster kopiëren',
		explanation:
			'Kopieert een schermafdruk van enkel het actieve venster.',
		windowsExplanation:
			'Kopieert een schermafdruk van enkel het actieve venster naar het klembord, zonder de rest van het scherm.',
		macExplanation:
			'Druk op ⌘ + ⇧ + 4, daarna op Spatie en klik vervolgens op het venster dat je wil vastleggen.',
		Icon: Scissors,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 99,
		slug: 'win-alt-r',
		windows: '⊞ Win + Alt + R',
		mac: '⌘ + ⇧ + 5',
		description: 'Schermopname starten',
		explanation: 'Start of stopt een video-opname van wat er op je scherm gebeurt.',
		windowsExplanation:
			'Start of stopt een schermopname via de Xbox Game Bar. Handig om snel een instructievideo te maken.',
		macExplanation:
			'Opent het Screenshot-paneel met opties voor schermafbeelding én videopname van het volledige scherm of een gebied.',
		Icon: Play,
		complexity: 'advanced',
		category: 'media',
	},
	{
		id: 100,
		slug: 'win-t',
		windows: '⊞ Win + T',
		mac: '⌃ + F3',
		description: 'Focus op taakbalk / Dock',
		explanation:
			'Verplaatst de focus naar de app-balk onderaan. Gebruik pijltoetsen en Enter om apps te openen.',
		windowsExplanation:
			'Plaatst de focus op de eerste app in de Windows-taakbalk. Navigeer met de pijltoetsen en open met Enter.',
		macExplanation:
			'Plaatst de focus op het Dock. Navigeer met ←/→ en open een app met Enter.',
		Icon: Layout,
		complexity: 'intermediate',
		category: 'window',
	},
	{
		id: 101,
		slug: 'win-space',
		windows: '⊞ Win + Spatie',
		mac: '⌃ + Spatie',
		description: 'Toetsenbordindeling wisselen',
		explanation:
			'Wisselt tussen geïnstalleerde toetsenbordindelingen of invoertalen (bv. AZERTY ↔ QWERTY).',
		Icon: RefreshCw,
		complexity: 'intermediate',
		category: 'system',
	},
	{
		id: 102,
		slug: 'win-ctrl-enter',
		windows: '⊞ Win + Ctrl + Enter',
		mac: '⌘ + F5',
		description: 'Verteller / VoiceOver',
		explanation: 'Schakelt de schermlezer in of uit, die alles op het scherm voorleest.',
		windowsExplanation: 'Start of stopt de Windows Verteller die schermtekst hardop voorleest.',
		macExplanation: 'Schakelt VoiceOver aan/uit — Mac\'s ingebouwde schermlezer.',
		Icon: Mic,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 103,
		slug: 'win-ctrl-o',
		windows: '⊞ Win + Ctrl + O',
		mac: null,
		description: 'Schermtoetsenbord',
		explanation: 'Opent een virtueel toetsenbord op het scherm.',
		windowsExplanation:
			'Opent het schermtoetsenbord van Windows, bruikbaar zonder fysiek toetsenbord (bv. op een touchscreen).',
		macNote:
			'Op Mac geen sneltoets — schakel het Toetsenbordviewer in via Systeeminstellingen → Toetsenbord → Invoerbronnen.',
		Icon: Layout,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 104,
		slug: 'win-slash',
		windows: '⊞ Win + /',
		mac: null,
		description: 'IME herconversie',
		explanation:
			'Start IME-herconversie voor het invoeren van bv. Aziatische tekens. Nuttig voor meertalige invoer.',
		Icon: Edit,
		complexity: 'expert',
		category: 'system',
	},
	{
		id: 106,
		slug: 'win-shift-down',
		windows: '⊞ Win + Shift + ↓',
		mac: null,
		description: 'Verticaal verkleinen',
		explanation:
			'Herstelt of minimaliseert het actieve venster verticaal, terwijl de breedte behouden blijft.',
		Icon: ArrowUpDown,
		complexity: 'advanced',
		category: 'window',
	},
	{
		id: 107,
		slug: 'win-shift-space',
		windows: '⊞ Win + Shift + Spatie',
		mac: '⌃ + ⇧ + Spatie',
		description: 'Vorige toetsenbordindeling',
		explanation: 'Schakelt naar de vorige toetsenbordindeling of invoertaal in de lijst.',
		Icon: RefreshCw,
		complexity: 'advanced',
		category: 'system',
	},
	{
		id: 109,
		slug: 'f7',
		windows: 'F7',
		mac: '⌥ + ⌘ + F7',
		description: 'Caret-navigatie',
		explanation:
			'Schakelt caret-navigatie aan/uit in browsers — je kunt dan met pijltoetsen door tekst op een webpagina navigeren.',
		Icon: ArrowLeftRight,
		complexity: 'expert',
		category: 'browser',
	},
	{
		id: 110,
		slug: 'ctrl-f4',
		windows: 'Ctrl + F4',
		mac: '⌘ + W',
		description: 'Subvenster / tabblad sluiten',
		explanation:
			'Sluit het huidige tabblad of subvenster binnen een toepassing (bv. een document in Word).',
		Icon: X,
		complexity: 'intermediate',
		category: 'general',
	},
	{
		id: 111,
		slug: 'win-ctrl-v',
		windows: '⊞ Win + Ctrl + V',
		mac: null,
		description: 'Audio-uitvoer wisselen',
		explanation:
			'Opent in Windows 11 het uitvoerapparaat-paneel. Mac: ⌥ + klik op het volume-icoon in de menubalk.',
		Icon: Wifi,
		complexity: 'advanced',
		category: 'media',
	},
	{
		id: 112,
		slug: 'win-f',
		windows: '⊞ Win + F',
		mac: null,
		description: 'Feedback Hub',
		explanation:
			'Opent de Feedback Hub om problemen of suggesties over Windows 11 rechtstreeks aan Microsoft te melden.',
		Icon: Bell,
		complexity: 'advanced',
		category: 'system',
	},
]

// Build-time sanity check: slug uniqueness
const slugSet = new Set<string>()
for (const k of shortkeys) {
	if (slugSet.has(k.slug)) {
		throw new Error(`Duplicate shortkey slug: ${k.slug}`)
	}
	slugSet.add(k.slug)
}

export function findShortkeyBySlug(slug: string): Shortkey | undefined {
	return shortkeys.find((k) => k.slug === slug)
}

export function shortkeysByCategory(category: Category): Shortkey[] {
	return shortkeys.filter((k) => k.category === category)
}

export function shortkeysByComplexity(complexity: ComplexityLevel): Shortkey[] {
	return shortkeys.filter((k) => k.complexity === complexity)
}

export function relatedShortkeys(slug: string, limit = 6): Shortkey[] {
	const current = findShortkeyBySlug(slug)
	if (!current) return []
	return shortkeys
		.filter((k) => k.slug !== slug && k.category === current.category)
		.slice(0, limit)
}

export const GiftIcon = Gift
