// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { NodeSection } from "@nuido/components/node_section";
import { NodeSectionWithRoleModel } from "@nuidoai/models/sections/node_section_with_role";
export class LabelSectionModel extends NodeSectionWithRoleModel {
    constructor() {
        super(...arguments);
        this.label = "Label";
    }
}
export class LabelSection extends NodeSection {
}
LabelSection.template = "nuidoai.label-section";
