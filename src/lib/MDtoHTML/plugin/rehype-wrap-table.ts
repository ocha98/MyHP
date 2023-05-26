import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { Root, Element } from "hast";


interface Options {
    className: string | undefined
};

const rehypeImageSize: Plugin<Options[], Root> = (options) => {
    const className = options.className || 'table-wrapper';
    return(tree) => {
        visit(tree, 'element', (node, index, parent)  => {
            if(node.tagName === "table"){
                if(!index)return;
                const wrapped: Element = {
                    type: 'element',
                    tagName: "div",
                    properties: {
                        className: [className],
                    },
                    children: [node]
                };

                parent?.children.splice(index, 1, wrapped);
            }
        })
    }
}
export default rehypeImageSize