// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { uuidv4 } from "@nuido/utils/utils";
import { SectionedNodeWithRoleModel } from "@nuidoai/models/nodes/SectionedNodeWithRoleModel";
import { LabelSection } from "@nuidoai/components/sections/label_section";
import { TextInputSection } from "@nuidoai/components/sections/text_section";
export class ChatGroupNodeModel extends SectionedNodeWithRoleModel {
    setup() {
        let sectionId = uuidv4();
        this.addSection(sectionId, TextInputSection.name, {
            label: "Group Name",
            default: "Nuido Chat Group",
            role: "chat-group-name" /* SectionRole.ChatGroupName */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, LabelSection.name, {
            label: "Connect Selection Strategy here.",
            direction: "in" /* SectionDirectionType.In */,
            role: "chat-group-selection-strategy" /* SectionRole.ChatGroupSelectionStrategy */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, LabelSection.name, {
            label: "Connect Termination Strategy here.",
            direction: "in" /* SectionDirectionType.In */,
            role: "chat-group-termination-strategy" /* SectionRole.ChatGroupTerminationStrategy */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, LabelSection.name, {
            label: "Connect Agents here.",
            direction: "in" /* SectionDirectionType.In */,
            maxIn: Number.MAX_SAFE_INTEGER,
            role: "chat-group-agent" /* SectionRole.ChatGroupAgent */
        });
    }
}
