import type {Plugin} from "unified";
import type { Root } from "hast"
import { Node } from "unist";
import { visit } from "unist-util-visit";

interface exNode extends Node {
    children: exNode[];
    tagName: string,
    properties: string,
}

const wrapper: Plugin<[], Root>  = () => {
    return (tree: Node) => {

        visit(tree, "root", visitor)

        function visitor(node: exNode) {
            node.children = node.children.map(node => {
                if (node.tagName !== "table") return node

                const table = JSON.parse(JSON.stringify(node))
                node.tagName = "div"
                node.children = [table]
                node.properties = JSON.parse(JSON.stringify({ class: "table-scroll" }))
                return node
            }
            )
        }
    };
};

export default wrapper;