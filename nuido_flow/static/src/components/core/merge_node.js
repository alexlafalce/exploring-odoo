// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { Node } from "@nuido/components/node";
export class MergeNode extends Node {
    onAddAuxIn() {
        this.props.node.newAuxInPort();
        this.refreshEdges();
    }
    onRemoveAuxIn() {
        if (this.props.node.auxInPorts.length > 1) {
            const port = this.props.node.auxInPorts[this.props.node.auxInPorts.length - 1];
            const currentDoc = this.env.documents[this.env.documents.length - 1];
            while (port.links.length > 0) {
                const link = port.links.pop();
                currentDoc.removeEdge(link.id);
            }
            this.props.node.removeAuxInPort();
            this.refreshEdges();
        }
    }
}
MergeNode.template = "nuido_flow.merge-node";
