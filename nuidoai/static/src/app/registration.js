// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { registry } from "@web/core/registry";
import { NuidoNodeRegistryName, NuidoNodeSectionRegistryName } from "@nuido/utils/registry";
import { ChatCompletionAgentNode } from "@nuidoai/components/agents/chat_completion_agent";
import { ChatGroupNode } from "@nuidoai/components/agents/chat_group";
import { ChatCompletionAgentNodeModel } from "@nuidoai/models/agents/chat_completion_agent";
import { ChatGroupNodeModel } from "@nuidoai/models/agents/chat_group";
import { OpenAiChatCompletionServiceNode } from "@nuidoai/components/services/openai_chat_completion_service";
import { OpenAiChatCompletionServiceModel } from "@nuidoai/models/services/openai_chat_completion_service";
import { DatePluginNode } from "@nuidoai/components/plugins/date_plugin";
import { MathPluginNode } from "@nuidoai/components/plugins/math_plugin";
import { RandomNumberPluginNode } from "@nuidoai/components/plugins/rondom_number_plugin";
import { DatePluginNodeModel } from "@nuidoai/models/plugins/date_plugin";
import { MathPluginNodeModel } from "@nuidoai/models/plugins/math_plugin";
import { RandomNumberPluginNodeModel } from "@nuidoai/models/plugins/random_number_plugin";
import { SequentialSelectionStrategyNodeModel } from "@nuidoai/models/strategies/sequential_selection_strategy";
import { SequentialSelectionStrategyNode } from "@nuidoai/components/strategies/sequential_selection_strategy";
import { TextInputSection, TextInputSectionModel } from "@nuidoai/components/sections/text_section";
import { DropdownSection, DropdownSectionModel } from "@nuidoai/components/sections/dropdown_section";
import { TextDialogInputSection, TextDialogInputSectionModel } from "@nuidoai/components/sections/text_dialog_section";
import { LabelSection, LabelSectionModel } from "@nuidoai/components/sections/label_section";
import { PromptSelectionStrategyNodeModel } from "@nuidoai/models/strategies/prompt_selection_strategy";
import { PromptSelectionStrategyNode } from "@nuidoai/components/strategies/prompt_selection_strategy";
import { PromptTerminationStrategyNode } from "@nuidoai/components/strategies/prompt_termination_strategy";
import { PromptTerminationStrategyNodeModel } from "@nuidoai/models/strategies/prompt_termination_strategy";
// Agents
registry.category(NuidoNodeRegistryName).add(ChatCompletionAgentNode.name, {
    component: ChatCompletionAgentNode,
    model: ChatCompletionAgentNodeModel
});
registry.category(NuidoNodeRegistryName).add(ChatGroupNode.name, {
    component: ChatGroupNode,
    model: ChatGroupNodeModel
});
// Services
registry.category(NuidoNodeRegistryName).add(OpenAiChatCompletionServiceNode.name, {
    component: OpenAiChatCompletionServiceNode,
    model: OpenAiChatCompletionServiceModel
});
// Plugins
registry.category(NuidoNodeRegistryName).add(DatePluginNode.name, {
    component: DatePluginNode,
    model: DatePluginNodeModel
});
registry.category(NuidoNodeRegistryName).add(MathPluginNode.name, {
    component: MathPluginNode,
    model: MathPluginNodeModel
});
registry.category(NuidoNodeRegistryName).add(RandomNumberPluginNode.name, {
    component: RandomNumberPluginNode,
    model: RandomNumberPluginNodeModel
});
//  Node Sections
registry.category(NuidoNodeSectionRegistryName).add(LabelSection.name, {
    component: LabelSection,
    model: LabelSectionModel
});
registry.category(NuidoNodeSectionRegistryName).add(TextInputSection.name, {
    component: TextInputSection,
    model: TextInputSectionModel
});
registry.category(NuidoNodeSectionRegistryName).add(TextDialogInputSection.name, {
    component: TextDialogInputSection,
    model: TextDialogInputSectionModel
});
registry.category(NuidoNodeSectionRegistryName).add(DropdownSection.name, {
    component: DropdownSection,
    model: DropdownSectionModel
});
// Strategies
registry.category(NuidoNodeRegistryName).add(SequentialSelectionStrategyNode.name, {
    component: SequentialSelectionStrategyNode,
    model: SequentialSelectionStrategyNodeModel
});
registry.category(NuidoNodeRegistryName).add(PromptSelectionStrategyNode.name, {
    component: PromptSelectionStrategyNode,
    model: PromptSelectionStrategyNodeModel
});
registry.category(NuidoNodeRegistryName).add(PromptTerminationStrategyNode.name, {
    component: PromptTerminationStrategyNode,
    model: PromptTerminationStrategyNodeModel
});
// Menu items
registry.category("nuidoai_sidebar_menu_item").category("Agents" /* NuidoAiSideMenuCategory.AGENTS */).add(ChatCompletionAgentNode.name, {
    title: "Chat Completion",
    icon: "/nuidoai/static/images/robot.svg",
    type: ChatCompletionAgentNode.name
});
registry.category("nuidoai_sidebar_menu_item").category("Agents" /* NuidoAiSideMenuCategory.AGENTS */).add(ChatGroupNode.name, {
    title: "Group Chat",
    icon: "/nuidoai/static/images/group-chat.svg",
    type: ChatGroupNode.name
});
registry.category("nuidoai_sidebar_menu_item").category("Selection Strategies" /* NuidoAiSideMenuCategory.SELECTION_STRATEGIES */).add(PromptSelectionStrategyNode.name, {
    title: "Prompt Selection Strategy",
    icon: "/nuidoai/static/images/select.svg",
    type: PromptSelectionStrategyNode.name
});
registry.category("nuidoai_sidebar_menu_item").category("Selection Strategies" /* NuidoAiSideMenuCategory.SELECTION_STRATEGIES */).add(SequentialSelectionStrategyNode.name, {
    title: "Sequential Selection Strategy",
    icon: "/nuidoai/static/images/list.svg",
    type: SequentialSelectionStrategyNode.name
});
registry.category("nuidoai_sidebar_menu_item").category("Termination Strategies" /* NuidoAiSideMenuCategory.TERMINATION_STRATEGIES */).add(PromptTerminationStrategyNode.name, {
    title: "Prompt Termination Strategy",
    icon: "/nuidoai/static/images/stop-circle-line.svg",
    type: PromptTerminationStrategyNode.name
});
registry.category("nuidoai_sidebar_menu_item").category("Services" /* NuidoAiSideMenuCategory.SERVICES */).add(OpenAiChatCompletionServiceNode.name, {
    title: "OpenAI Chat Completion",
    icon: "/nuidoai/static/images/openai.svg",
    type: OpenAiChatCompletionServiceNode.name
});
registry.category("nuidoai_sidebar_menu_item").category("Plugins" /* NuidoAiSideMenuCategory.PLUGINS */).add(DatePluginNode.name, {
    title: "Date Plugin",
    icon: "/nuidoai/static/images/date.svg",
    type: DatePluginNode.name
});
registry.category("nuidoai_sidebar_menu_item").category("Plugins" /* NuidoAiSideMenuCategory.PLUGINS */).add(MathPluginNode.name, {
    title: "Math Plugin",
    icon: "/nuidoai/static/images/math-operations.svg",
    type: MathPluginNode.name
});
registry.category("nuidoai_sidebar_menu_item").category("Plugins" /* NuidoAiSideMenuCategory.PLUGINS */).add(RandomNumberPluginNode.name, {
    title: "Random Number Plugin",
    icon: "/nuidoai/static/images/random.svg",
    type: RandomNumberPluginNode.name
});
