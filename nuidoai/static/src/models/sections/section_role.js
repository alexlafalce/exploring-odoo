// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

export var SectionRole;
(function (SectionRole) {
    SectionRole["ChatCompletionService"] = "chat-completion-service";
    SectionRole["AgentName"] = "agent-name";
    SectionRole["AgentPlugin"] = "agent-plugin";
    SectionRole["AgentInstruction"] = "agent-instruction";
    SectionRole["ChatGroupName"] = "chat-group-name";
    SectionRole["ChatGroupAgent"] = "chat-group-agent";
    SectionRole["ChatGroupTerminationStrategy"] = "chat-group-termination-strategy";
    SectionRole["ChatGroupSelectionStrategy"] = "chat-group-selection-strategy";
    SectionRole["StrategyName"] = "strategy-name";
    SectionRole["StrategyPrompt"] = "strategy-prompt";
    SectionRole["StrategyTerminationKeyword"] = "strategy-termination-keyword";
    SectionRole["StrategyTerminationAgent"] = "strategy-termination-agent";
    SectionRole["StrategyMaxIteration"] = "strategy-max-iteration";
    SectionRole["StrategyInitialAgent"] = "strategy-initial-agent";
    SectionRole["StrategyHistoryVariableName"] = "strategy-history-variable-name";
    SectionRole["ServiceId"] = "service-id";
    SectionRole["ServiceBaseUrl"] = "service-base-url";
    SectionRole["ServiceApiKey"] = "service-api-key";
    SectionRole["ServiceModel"] = "service-model";
})(SectionRole || (SectionRole = {}));
export var StrategyVariableName;
(function (StrategyVariableName) {
    StrategyVariableName["TerminationKeyword"] = "termination_keyword";
    StrategyVariableName["History"] = "$history";
})(StrategyVariableName || (StrategyVariableName = {}));
