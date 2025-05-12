import { NodeModel } from "@nuido/models/node";
import { Default } from "@nuido/utils/registry";
export class ActiveDataNodeModel extends NodeModel {
    setup() {
        const auxOutId = "aux-out-" + this.id + "-1";
        this.addAuxOutPort(auxOutId, Default, 1, {
            role: "data"
        });
        this.key = "my_active_data";
        this.model = "";
        this.model_description = "";
        this.fields = [];
    }
}
