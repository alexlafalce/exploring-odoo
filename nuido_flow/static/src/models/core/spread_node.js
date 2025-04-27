// THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// 
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
// DO NOT USE IT IN PRODUCTION.
import { NodeModel } from "@nuido/models/node";
import { Default } from "@nuido/utils/registry";
export class SpreadNodeModel extends NodeModel {
    constructor() {
        super(...arguments);
        this.nextId = 1;
    }
    setup() {
        const inId = "in-" + this.id + "-1";
        this.addInPort(inId, Default, 1);
        this.newOutPort();
    }
    newOutPort() {
        const outId = "out-" + this.id + "-" + this.nextId;
        const port = this.addOutPort(outId, Default, 1);
        this.nextId = this.nextId + 1;
        return port;
    }
    removeOutPort() {
        if (this.outPorts.length > 1) {
            const port = this.outPorts[this.outPorts.length - 1];
            if (port.links.length == 0) {
                this.outPorts.pop();
                this.nextId = this.nextId - 1;
            }
        }
    }
}
