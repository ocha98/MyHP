import unified from "unified";
import { Node } from "unist";
import { visit } from "unist-util-visit";

interface exNode extends Node {
    children: exNode[];
    tagName: string,
    properties: string,
}

const wrapper: unified.Plugin = () => {
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