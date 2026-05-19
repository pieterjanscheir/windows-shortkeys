import type { MetadataRoute } from 'next'
import { categorySlugs, complexitySlugs, shortkeys } from '@/lib/shortkeys'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://windows-sneltoetsen.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date()
	const entries: MetadataRoute.Sitemap = [
		{
			url: `${siteUrl}/`,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${siteUrl}/over`,
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 0.4,
		},
	]

	for (const slug of Object.values(categorySlugs)) {
		entries.push({
			url: `${siteUrl}/categorie/${slug}`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.8,
		})
	}

	for (const slug of Object.values(complexitySlugs)) {
		entries.push({
			url: `${siteUrl}/niveau/${slug}`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.8,
		})
	}

	for (const k of shortkeys) {
		entries.push({
			url: `${siteUrl}/sneltoetsen/windows/${k.slug}`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.6,
		})
		// Always emit the Mac variant. When the shortkey has no native Mac
		// equivalent, the page still serves a useful "alternative apps" view.
		entries.push({
			url: `${siteUrl}/sneltoetsen/mac/${k.slug}`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: k.mac ? 0.6 : 0.4,
		})
	}

	return entries
}
