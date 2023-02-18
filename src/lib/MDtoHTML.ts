import { unified } from 'unified'
import remarkParse from 'remark-parse'       // パーサー(文字列をremarkの構文木に変換)
import remarkMath from 'remark-math'
import remark2rehype from 'remark-rehype' // トランスフォーマー(マークダウンからHTMLに変換)
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
import rehypeSlug from 'rehype-slug'  //章idをつける
import rehypeStringify from 'rehype-stringify'       // コンパイラー(HTML構文木を文字列に変換)
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePicture from 'rehype-picture'
import rehypeWrapTable from "../plugin/rehype-wrap-table/rehype-wrap-table"
import rehypeHighlight from'rehype-highlight'
import hjs_latex from 'highlight.js/lib/languages/latex'

export function MDtoHtml(markdown: string): string {
    const html =
        unified()
            .use(remarkParse)//markdown -> mdast
            // ==mdast===
            .use(remarkMath) //math形式を解析
            .use(remarkGfm)
            .use(remarkEmoji)
            // ==========
            .use(remark2rehype, { allowDangerousHtml: true })// mdast -> hast
            //==hast==
            //.use(rehypeImgSize, { dir: path.join(currentdirectory, "public") })
            .use(rehypeSlug)
            .use(rehypeExternalLinks, { target: "_blank", rel: ['noopener noreferrer nofollow'] })//トランスフォーマー外部リンクに属性を追加
            .use(rehypePicture, { jpg: { webp: "image/webp" }, png: { webp: "image/webp" } })// add alternative image
            .use(rehypeKatex, {strict: false})
            .use(rehypeHighlight, {languages:{hjs_latex}})
            .use(rehypeWrapTable)
            //.use(SectionWrapper)
            //.use(LinkCard)
            //.use(rehypecssTocssmodule, { pair: Object.assign(hightlightCSS) })
            //.use(ASTprint)
            //.use(rehypePresetMinify)
            //.use(rehypeSanitize)
            //========
            .use(rehypeStringify, { allowDangerousHtml: true })// hast -> html
            .processSync(markdown)

    return html.toString()
}