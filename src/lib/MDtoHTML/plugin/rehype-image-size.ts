import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { Root } from "hast";


const rehypeImageSize: Plugin<[], Root> = () => {
    return(tree) => {
        visit(tree, 'element', (node)  => {
            if(node.tagName === "img"){
                if(!node.properties)return;
                if(!node.properties.title)return;
                const title = node.properties.title as string;
                const sizePattern = /^=(\d+)?x(\d+)?$/
                const matchResult = sizePattern.exec(title)
                if(!matchResult)return;

                if(matchResult[1]){
                    node.properties.width = Number(matchResult[1]);
                }
                if(matchResult[2]){
                    node.properties.height = Number(matchResult[2]);
                }
                delete node.properties.title
            }
        })
    }
}
export default rehypeImageSize
