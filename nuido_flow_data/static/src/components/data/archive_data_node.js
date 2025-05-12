// THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// 
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
// DO NOT USE IT IN PRODUCTION.
import { useState } from "@odoo/owl";
import { Node } from "@nuido/components/node";
import { ModelSelectorEx } from "@nuido_flow/components/ui/model_selector_ex";
export class ArchiveDataNode extends Node {
    setup() {
        super.setup();
        this.state = useState({
            model: this.props.node.model,
            modelDescription: this.props.node.model_description,
        });
    }
    onModelSelected(model) {
        const { label, technical } = model;
        this.props.node.fields = [];
        this.state.model = technical;
        this.state.modelDescription = label;
        this.props.node.model = technical;
        this.props.node.model_description = label;
    }
    get modelSelectorId() {
        return `input-${this.props.node.id}}-model-selector`;
    }
}
ArchiveDataNode.template = "nuido_flow_data.archive-data-node";
ArchiveDataNode.components = {
    ...Node.components,
    ModelSelectorEx,
};
