// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { uuidv4 } from "@nuido/utils/utils";
import { SectionedNodeWithRoleModel } from "@nuidoai/models/nodes/SectionedNodeWithRoleModel";
import { LabelSection } from "@nuidoai/components/sections/label_section";
import { TextInputSection } from "@nuidoai/components/sections/text_section";
import { DropdownSection } from "@nuidoai/components/sections/dropdown_section";
export class OpenAiChatCompletionServiceModel extends SectionedNodeWithRoleModel {
    setup() {
        let sectionId = uuidv4();
        this.addSection(sectionId, TextInputSection.name, {
            label: "Service Id",
            default: "ai-chat",
            role: "service-id" /* SectionRole.ServiceId */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, TextInputSection.name, {
            label: "Base Url",
            default: "http://localhost:1234/v1",
            role: "service-base-url" /* SectionRole.ServiceBaseUrl */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, TextInputSection.name, {
            label: "API Key",
            default: "__NOT_USED__",
            role: "service-api-key" /* SectionRole.ServiceApiKey */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, DropdownSection.name, {
            label: "Model",
            default: "qwen2.5-7b-instruct",
            options: [
                {
                    name: "QWen 2.5 7b Instruct",
                    value: "qwen2.5-7b-instruct"
                },
                {
                    name: "Meta Llama 3.1 8b instruct",
                    value: "meta-llama-3.1-8b-instruct"
                }
            ],
            role: "service-model" /* SectionRole.ServiceModel */
        });
        sectionId = uuidv4();
        this.addSection(sectionId, LabelSection.name, {
            label: "Connect to agents from here.",
            direction: "out" /* SectionDirectionType.Out */,
            maxOut: Number.MAX_SAFE_INTEGER,
            role: "chat-completion-service" /* SectionRole.ChatCompletionService */
        });
    }
}
