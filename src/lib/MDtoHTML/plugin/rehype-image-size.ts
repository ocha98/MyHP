import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { Root } from "hast";


interface Options {};

const rehypeImageSize: Plugin<Options[], Root> = (options = {}) => {
    return(tree) => {
        visit(tree, 'element', (node)  => {
            if(node.tagName === "img"){
                if(!node.properties)return;
                if(!node.properties.title)return;
                const title = node.properties.title as string;
                const sizePattern = /^=(\d*)?x(\d*)?$/
                const matchResult = sizePattern.exec(title)
                if(!matchResult)return;

                const width = parseInt(matchResult[1], 10);
                const height = parseInt(matchResult[2], 10);

                if(!height){
                    node.properties.width = width;
                }
                if(!width){
                    node.properties.height = height;
                }
                delete node.properties.title
            }
        })
    }
}
export default rehypeImageSize