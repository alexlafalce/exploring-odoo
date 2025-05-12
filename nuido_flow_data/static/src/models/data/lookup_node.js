// THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// 
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
// DO NOT USE IT IN PRODUCTION.
import { NodeModel } from "@nuido/models/node";
import { LookupPort } from "@nuido_flow_data/components/ports/lookup_port";
export class LookupNodeModel extends NodeModel {
    setup() {
        const auxOutId = "aux-out-" + this.id + "-1";
        this.addAuxOutPort(auxOutId, LookupPort.name, 1, {
            role: "lookup"
        });
        this.key = "my_lookup";
        this.model = "";
        this.model_description = "";
        this.lookup_field = "";
        this.value_field = "";
    }
}
