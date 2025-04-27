// THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// 
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
// DO NOT USE IT IN PRODUCTION.
import { NodeModel } from "@nuido/models/node";
import { Default } from "@nuido/utils/registry";
import { TriggerPort } from "@nuido_flow/components/ports/trigger_port";
export class StartNodeModel extends NodeModel {
    setup() {
        const triggerId = "trigger-" + this.id + "-1";
        this.addInPort(triggerId, TriggerPort.name, 1);
        const outId = "out-" + this.id + "-1";
        this.addOutPort(outId, Default, 1);
    }
    canAddInput(portId, edge, sourceNode) {
        const sourcePort = sourceNode.outPorts.find(o => o.id === edge.outPortId);
        let res = false;
        if ((sourcePort === null || sourcePort === void 0 ? void 0 : sourcePort.direction) === "output" /* PortDirection.out */) {
            const port = this.inPorts.find(o => o.id == portId);
            if (port) {
                res = port.canAddLink();
            }
            else {
                res = false;
            }
        }
        else {
            res = false;
        }
        if ("role" in sourcePort["spec"]) {
            res = res && (sourcePort.spec["role"] === "trigger");
        }
        else {
            res = false;
        }
        return res;
    }
}
