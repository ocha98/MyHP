import { afterEach, describe, expect, it, vi } from 'vitest'
import { getSortedPostMeta } from './microcmsAPI'

const cmsPost = {
    id: 'post-id',
    published: '2026-01-01T00:00:00.000Z',
    modified: '2026-01-02T00:00:00.000Z',
    title: 'title',
    description: 'description',
    tags: [{ id: 'tag-id', text: 'tag' }],
    limited: false,
}

describe('microcmsAPI', () => {
    afterEach(() => {
        vi.unstubAllEnvs()
        vi.unstubAllGlobals()
    })

    it('CMSのlimitedをアプリ内のisLimitedへ変換する', async () => {
        vi.stubEnv('API_URL', 'https://example.test/api/v1')
        vi.stubEnv('API_KEY', 'secret')
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(
                new Response(JSON.stringify({ contents: [cmsPost] }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }),
            ),
        )

        await expect(getSortedPostMeta(4)).resolves.toEqual([
            {
                id: 'post-id',
                published: cmsPost.published,
                modified: cmsPost.modified,
                title: 'title',
                description: 'description',
                tags: [{ id: 'tag-id', text: 'tag' }],
                isLimited: false,
            },
        ])
    })

    it('HTTPエラーにステータスを含める', async () => {
        vi.stubEnv('API_URL', 'https://example.test/api/v1')
        vi.stubEnv('API_KEY', 'secret')
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(
                new Response('Unauthorized', {
                    status: 401,
                    statusText: 'Unauthorized',
                }),
            ),
        )

        await expect(getSortedPostMeta(4)).rejects.toThrow(
            'microCMS request failed: 401 Unauthorized',
        )
    })

    it('CMSレスポンスがスキーマと異なる場合は拒否する', async () => {
        vi.stubEnv('API_URL', 'https://example.test/api/v1')
        vi.stubEnv('API_KEY', 'secret')
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(
                new Response(
                    JSON.stringify({
                        contents: [{ ...cmsPost, limited: 'false' }],
                    }),
                    {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    },
                ),
            ),
        )

        await expect(getSortedPostMeta(4)).rejects.toThrow('limited')
    })

    it('必須の環境変数がなければ分かりやすく失敗する', async () => {
        vi.stubEnv('API_URL', '')
        vi.stubEnv('API_KEY', '')

        await expect(getSortedPostMeta(4)).rejects.toThrow(
            '環境変数 API_URL と API_KEY',
        )
    })
})
