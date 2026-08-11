import urlJoin from 'url-join'
import { z } from 'zod'
import type { Post, PostMeta, Tag } from 'types'

const postMetaFields = [
    'id',
    'published',
    'title',
    'description',
    'modified',
    'tags',
    'limited',
]

type Params = Record<string, string>

const tagSchema: z.ZodType<Tag> = z.object({
    id: z.string(),
    text: z.string(),
})

const cmsPostMetaShape = {
    id: z.string(),
    published: z.string(),
    title: z.string(),
    description: z.string(),
    modified: z.string(),
    tags: z.array(tagSchema),
    limited: z.boolean(),
}

const postMetaSchema = z
    .object(cmsPostMetaShape)
    .transform(({ limited, ...post }): PostMeta => ({
        ...post,
        isLimited: limited,
    }))

const postSchema = z
    .object({
        ...cmsPostMetaShape,
        content: z.string(),
    })
    .transform(({ limited, ...post }): Post => ({
        ...post,
        isLimited: limited,
    }))

const idListSchema = z.object({
    contents: z.array(z.object({ id: z.string() })),
})

const postMetaListSchema = z.object({
    contents: z.array(postMetaSchema),
})

class MicroCmsRequestError extends Error {
    constructor(
        message: string,
        readonly status: number,
    ) {
        super(message)
        this.name = 'MicroCmsRequestError'
    }
}

function getConfig() {
    const endpoint = process.env.API_URL
    const apiKey = process.env.API_KEY

    if (!endpoint || !apiKey) {
        throw new Error(
            'microCMSの接続に必要な環境変数 API_URL と API_KEY を設定してください。',
        )
    }

    return { endpoint, apiKey }
}

async function requestJson(url: string, params: Params = {}): Promise<unknown> {
    const { apiKey } = getConfig()
    const searchParams = new URLSearchParams(params)
    if (searchParams.size > 0) {
        url = `${url}?${searchParams.toString()}`
    }

    const response = await fetch(url, {
        headers: { 'X-MICROCMS-API-KEY': apiKey },
    })

    if (!response.ok) {
        const detail = (await response.text()).slice(0, 300)
        throw new MicroCmsRequestError(
            `microCMS request failed: ${response.status} ${response.statusText}${detail ? ` - ${detail}` : ''}`,
            response.status,
        )
    }

    try {
        return await response.json()
    } catch (error) {
        throw new Error('microCMSから不正なJSONレスポンスを受け取りました。', {
            cause: error,
        })
    }
}

function endpointUrl(...paths: string[]): string {
    const { endpoint } = getConfig()
    return urlJoin(endpoint, ...paths)
}

export async function loadPostData(id: string): Promise<Post | null> {
    try {
        return postSchema.parse(await requestJson(endpointUrl('myblog', id)))
    } catch (error) {
        if (error instanceof MicroCmsRequestError && error.status === 404) {
            return null
        }
        throw error
    }
}

// limited記事も「URLを知っている人向け」として静的生成する。
export async function getAllPostIDs(): Promise<{ id: string }[]> {
    const data = await requestJson(endpointUrl('myblog'), {
        orders: '-published',
        limit: '500',
        fields: 'id',
    })

    return idListSchema.parse(data).contents
}

export async function getSortedPostMeta(limit: number): Promise<PostMeta[]> {
    const data = await requestJson(endpointUrl('myblog'), {
        orders: '-published',
        limit: limit.toString(),
        filters: 'limited[equals]false',
        fields: postMetaFields.join(','),
    })

    return postMetaListSchema.parse(data).contents
}

export async function getAllTagIds(): Promise<{ id: string }[]> {
    const data = await requestJson(endpointUrl('tags'), {
        limit: '500',
        fields: 'id',
    })

    return idListSchema.parse(data).contents
}

export async function getPostMetaByTag(slug: string): Promise<PostMeta[]> {
    const data = await requestJson(endpointUrl('myblog'), {
        orders: '-published',
        limit: '500',
        filters: `tags[contains]${slug}[and]limited[equals]false`,
        fields: postMetaFields.join(','),
    })

    return postMetaListSchema.parse(data).contents
}

export async function getTagProperty(id: string): Promise<Tag | null> {
    try {
        const data = await requestJson(endpointUrl('tags', id), {
            fields: 'id,text',
        })
        return tagSchema.parse(data)
    } catch (error) {
        if (error instanceof MicroCmsRequestError && error.status === 404) {
            return null
        }
        throw error
    }
}
