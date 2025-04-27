// THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// 
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
// DO NOT USE IT IN PRODUCTION.
import { Node } from "@nuido/components/node";
export class SpreadNode extends Node {
    onAddOutput() {
        this.props.node.newOutPort();
        this.refreshEdges();
    }
    onRemoveOutput() {
        if (this.props.node.outPorts.length > 1) {
            const port = this.props.node.outPorts[this.props.node.outPorts.length - 1];
            const currentDoc = this.env.documents[this.env.documents.length - 1];
            while (port.links.length > 0) {
                const link = port.links.pop();
                currentDoc.removeEdge(link.id);
            }
            this.props.node.removeOutPort();
            this.refreshEdges();
        }
    }
}
SpreadNode.template = "nuido_flow.spread-node";
