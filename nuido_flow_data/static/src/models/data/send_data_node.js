// THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// 
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
// DO NOT USE IT IN PRODUCTION.
import { Default } from "@nuido/utils/registry";
import { SpecAwareNodeModel } from "@nuido_flow/models/core/spec_aware_node";
import { HttpHeaderPort } from "@nuido_flow_data/components/ports/http_header_port";
export class SendDataNodeModel extends SpecAwareNodeModel {
    setup() {
        const inId = "in-" + this.id + "-1";
        this.addInPort(inId, Default, 1);
        const outId = "out-" + this.id + "-1";
        this.addOutPort(outId, Default, 1);
        const auxInId = "aux-in-" + this.id + "-1";
        this.addAuxInPort(auxInId, HttpHeaderPort.name, 1, {
            role: "header"
        });
        this.method = "POST";
        this.url = "";
    }
}
