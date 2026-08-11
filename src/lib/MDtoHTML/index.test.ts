import { describe, expect, it } from 'vitest'
import MDtoHTML from './index'

describe('MDtoHTML', () => {
    it('画像の幅と高さを同時に指定できる', async () => {
        const html = await MDtoHTML('![sample](image.png "=100x200")')

        expect(html).toContain('width="100"')
        expect(html).toContain('height="200"')
        expect(html).not.toContain('title=')
    })

    it('画像の片方の寸法だけを指定できる', async () => {
        const widthOnly = await MDtoHTML('![sample](image.png "=100x")')
        const heightOnly = await MDtoHTML('![sample](image.png "=x200")')

        expect(widthOnly).toContain('width="100"')
        expect(widthOnly).not.toContain('height=')
        expect(heightOnly).toContain('height="200"')
        expect(heightOnly).not.toContain('width=')
    })

    it('文書の先頭にあるテーブルもスクロール要素で囲む', async () => {
        const html = await MDtoHTML('| A | B |\n| - | - |\n| 1 | 2 |')

        expect(html).toContain('<div class="table-scroll"><table>')
    })

    it('入力された危険なHTMLを除去する', async () => {
        const html = await MDtoHTML('<script>alert(1)</script><p>safe</p>')

        expect(html).not.toContain('<script')
        expect(html).toContain('<p>safe</p>')
    })
})
