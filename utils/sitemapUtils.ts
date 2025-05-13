import { APIRequestContext } from '@playwright/test';
import { parseStringPromise } from 'xml2js';

export async function getSitemapUrls(request: APIRequestContext): Promise<string[]> {
    const response = await request.get('https://www.netlify.com/sitemap.xml');
    const xml = await response.text();
    const parsed = await parseStringPromise(xml);
    return parsed.urlset.url.map((entry: any) => entry.loc[0]);
}
