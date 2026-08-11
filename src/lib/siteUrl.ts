import urlJoin from 'url-join'

export function siteUrl(...paths: string[]): string {
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    if (!domain) {
        throw new Error(
            'サイトURLの生成に必要な環境変数 NEXT_PUBLIC_DOMAIN を設定してください。',
        )
    }

    return urlJoin(domain, ...paths)
}
