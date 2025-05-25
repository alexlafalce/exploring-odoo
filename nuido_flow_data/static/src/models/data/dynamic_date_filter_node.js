// THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// 
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
// DO NOT USE IT IN PRODUCTION.
import { NodeModel } from "@nuido/models/node";
import { DataFilterPort } from "@nuido_flow_data/components/ports/data_filter_port";
export class DynamicDateFilterNodeModel extends NodeModel {
    setup() {
        const auxOutId = "aux-out-" + this.id + "-1";
        this.addAuxOutPort(auxOutId, DataFilterPort.name, 1, {
            role: "data-filter"
        });
        this.model = "";
        this.model_description = "";
        this.dynamic_date_field = "";
        this.dynamic_date_interval = "" /* DateIntervalType.None */;
    }
}
