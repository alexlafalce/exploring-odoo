// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { NodeModel } from "@nuido/models/node";
import { Default } from "@nuido/utils/registry";
export class MergeNodeModel extends NodeModel {
    constructor() {
        super(...arguments);
        this.nextId = 1;
    }
    setup() {
        const inId = "in-" + this.id + "-1";
        this.addInPort(inId, Default, 1);
        const outId = "out-" + this.id + "-1";
        this.addOutPort(outId, Default, 1);
        this.newAuxInPort();
    }
    canAddAuxIn(portId, edge, sourceNode) {
        const sourcePort = sourceNode.auxOutPorts.find(o => o.id === edge.outPortId);
        let res = false;
        if ((sourcePort === null || sourcePort === void 0 ? void 0 : sourcePort.direction) === "aux-out" /* PortDirection.auxOut */) {
            const port = this.auxInPorts.find(o => o.id == portId);
            if (port) {
                res = port.canAddLink();
            }
        }
        else {
            return res;
        }
        if (res && "spec" in sourcePort) {
            if ("role" in sourcePort["spec"]) {
                res = res && (sourcePort.spec["role"] === "data");
            }
        }
        return res;
    }
    newAuxInPort() {
        const auxInId = "aux-in-" + this.id + "-" + this.nextId;
        const port = this.addAuxInPort(auxInId, Default, 1);
        this.nextId = this.nextId + 1;
        return port;
    }
    removeAuxInPort() {
        if (this.auxInPorts.length > 1) {
            const port = this.auxInPorts[this.auxInPorts.length - 1];
            if (port.links.length == 0) {
                this.auxInPorts.pop();
                this.nextId = this.nextId - 1;
            }
        }
    }
}
