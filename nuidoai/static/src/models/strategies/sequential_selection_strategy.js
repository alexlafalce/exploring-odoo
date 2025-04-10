// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { uuidv4 } from "@nuido/utils/utils";
import { SectionedNodeWithRoleModel } from "@nuidoai/models/nodes/SectionedNodeWithRoleModel";
import { LabelSection } from "@nuidoai/components/sections/label_section";
import { TextInputSection } from "@nuidoai/components/sections/text_section";
export class SequentialSelectionStrategyNodeModel extends SectionedNodeWithRoleModel {
    setup() {
        let sectionId = uuidv4();
        this.addSection(sectionId, TextInputSection.name, {
            label: "Name",
            default: "selection",
            role: "strategy-name" /* SectionRole.StrategyName */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, LabelSection.name, {
            label: "Connect to a chat group from here.",
            direction: "out" /* SectionDirectionType.Out */,
            maxOut: Number.MAX_SAFE_INTEGER,
            role: "chat-group-selection-strategy" /* SectionRole.ChatGroupSelectionStrategy */
        });
    }
}
