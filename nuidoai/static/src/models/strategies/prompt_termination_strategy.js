// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { uuidv4 } from "@nuido/utils/utils";
import { SectionedNodeWithRoleModel } from "@nuidoai/models/nodes/SectionedNodeWithRoleModel";
import { LabelSection } from "@nuidoai/components/sections/label_section";
import { TextInputSection } from "@nuidoai/components/sections/text_section";
import { TextDialogInputSection } from "@nuidoai/components/sections/text_dialog_section";
export class PromptTerminationStrategyNodeModel extends SectionedNodeWithRoleModel {
    setup() {
        let sectionId = uuidv4();
        this.addSection(sectionId, TextInputSection.name, {
            label: "Name",
            default: "termination",
            role: "strategy-name" /* SectionRole.StrategyName */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, TextInputSection.name, {
            label: "Termination Keyword",
            default: "finished",
            role: "strategy-termination-keyword" /* SectionRole.StrategyTerminationKeyword */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, TextInputSection.name, {
            label: "Maximum Iteration",
            default: "10",
            role: "strategy-max-iteration" /* SectionRole.StrategyMaxIteration */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, TextDialogInputSection.name, {
            label: "Prompt",
            default: `
Determine if the conversation is finished.  If so, respond with a single word: {${"termination_keyword" /* StrategyVariableName.TerminationKeyword */}}

History:
{{${"$history" /* StrategyVariableName.History */}}}
`,
            role: "strategy-prompt" /* SectionRole.StrategyPrompt */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, LabelSection.name, {
            label: "Connect Chat Completion Service here.",
            direction: "in" /* SectionDirectionType.In */,
            role: "chat-completion-service" /* SectionRole.ChatCompletionService */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, LabelSection.name, {
            label: "Connect termination agent here.",
            direction: "in" /* SectionDirectionType.In */,
            role: "strategy-termination-agent" /* SectionRole.StrategyTerminationAgent */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, LabelSection.name, {
            label: "Connect to a chat group from here.",
            direction: "out" /* SectionDirectionType.Out */,
            role: "chat-group-termination-strategy" /* SectionRole.ChatGroupTerminationStrategy */
        });
    }
}
