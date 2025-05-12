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
import { ModelFieldSelectorEx } from "@nuido_flow/components/ui/model_field_selector_ex";
import { ModelFieldTags } from "@nuido_flow/components/ui/model_field_tags";
import { DomainDialogInput } from "@nuido_flow/components/ui/domain_dialog_input";
export class DataNode extends Node {
    setup() {
        super.setup();
        this.state = useState({
            model: this.props.node.model,
            modelDescription: this.props.node.model_description
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
    onFieldDeleted(fieldName) {
        const idx = this.props.node.fields.findIndex(o => o.technical === fieldName);
        if (idx > -1) {
            this.props.node.fields.splice(idx, 1);
        }
        this.refreshEdges();
    }
    onFieldAdded(fieldInfo) {
        this.props.node.fields.push(fieldInfo);
        this.refreshEdges();
    }
    onDomainChanged(domain) {
        this.props.node.domain = domain;
    }
    dynamicDateFieldFilter(value) {
        return value.searchable && (["date", "datetime"].find(o => o === value.type));
    }
    onDynamicDateFieldUpdate(path, info) {
        this.props.node.dynamic_date_field = info.fieldDef ? info.fieldDef.name : "";
    }
    onDynamicDateIntervalChanged(ev) {
        this.props.node.dynamic_date_interval = ev.target.value;
    }
    get dynamicDateIntervalInputId() {
        return `input-${this.props.node.id}-dynamic-date-interval`;
    }
    get modelSelectorId() {
        return `input-${this.props.node.id}-model-selector`;
    }
}
DataNode.template = "nuido_flow_data.data-node";
DataNode.components = {
    ...Node.components,
    ModelSelectorEx,
    DomainDialogInput,
    ModelFieldSelectorEx,
    ModelFieldTags
};
