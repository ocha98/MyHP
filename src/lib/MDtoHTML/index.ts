import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm"
import remarkCodeTitles from "remark-flexible-code-titles";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema, Options } from "rehype-sanitize";
import rehypeImageSize from "./plugin/rehype-image-size"
import rehypeWrapTable from "./plugin/rehype-wrap-table"
import rehypeStringify from "rehype-stringify";
import { all } from 'lowlight'

const sanitizeOptions: Options = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        div: [
            ...(defaultSchema.attributes &&  defaultSchema.attributes.div || []),
            ['className', 'math', 'math-display', 'math-inline', 'table-scroll']
        ],
        span: [
            ...(defaultSchema.attributes && defaultSchema.attributes.span || []),
            ['className', 'math', 'math-inline', /^hljs-./]
        ],
        code: [
            ['className', 'hljs', /^language-./],
        ]
    }
}

export default async function MDtoHTML (text: string): Promise<string> {
    if(!text) return '';
    const html = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkCodeTitles, {titleClassName:"code-title"})
        .use(remarkMath)
        .use(remarkRehype, {allowDangerousHtml: true, })
        .use(rehypeRaw)
        .use(rehypeSlug)
        .use(rehypeExternalLinks, { target: "_blank", rel: ['noopener noreferrer nofollow'] })
        .use(rehypeHighlight, {languages: {...all}})
        .use(rehypeImageSize)
        .use(rehypeWrapTable, {className: "table-scroll"})
        .use(rehypeSanitize, sanitizeOptions)
        .use(rehypeKatex, {strict: false})
        .use(rehypeStringify)
        .process(text);

    return html.toString()
}

