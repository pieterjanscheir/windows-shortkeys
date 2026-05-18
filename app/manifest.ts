import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'shortkeys',
		short_name: 'shortkeys',
		description:
			'Complete Nederlandstalige gids met sneltoetsen voor Microsoft Windows en macOS, doorzoekbaar en gesorteerd op niveau.',
		start_url: '/',
		display: 'standalone',
		background_color: '#f7efdc',
		theme_color: '#f5e6c8',
		lang: 'nl-BE',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: '/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	}
}
