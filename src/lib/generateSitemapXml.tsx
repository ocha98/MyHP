import { getSortedPostMeta } from "./microcmsAPI"
import { PostMeta } from "types";
import urlJoin from "url-join";
import { format } from "date-fns";

export async function generateSitemapXml(): Promise<string> {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    const metas: PostMeta[] = await getSortedPostMeta(100);
    metas.forEach((meta) =>{
        const url = urlJoin(process.env.NEXT_PUBLIC_DOMAIN, "posts", meta.id)
        const date = new Date(meta.modified)
        xml += `
            <url>
                <loc>${url}</loc>
                <lastmod>${format(date, 'yyyy-MM-dd')}</lastmod>
            </url>
        `
    })
    
    xml += `</urlset>`;
    return xml;
}