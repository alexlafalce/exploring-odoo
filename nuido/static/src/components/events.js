// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

export var SelectionEventType;
(function (SelectionEventType) {
    SelectionEventType["select"] = "/select";
    SelectionEventType["unselect"] = "/unselect";
    SelectionEventType["clear"] = "/clear";
    SelectionEventType["toggle"] = "/toggle";
})(SelectionEventType || (SelectionEventType = {}));
;
export const EdgeTypeEventType = "/edge-type";
export var NewEdgeEventType;
(function (NewEdgeEventType) {
    NewEdgeEventType["start"] = "/edge-start";
    NewEdgeEventType["complete"] = "/edge-complete";
})(NewEdgeEventType || (NewEdgeEventType = {}));
;
export var DocumentEventType;
(function (DocumentEventType) {
    DocumentEventType["new"] = "/new";
    DocumentEventType["delete"] = "/delete";
    DocumentEventType["reset"] = "/reset";
})(DocumentEventType || (DocumentEventType = {}));
;
export var NuidoEventType;
(function (NuidoEventType) {
    NuidoEventType["translation_changed"] = "/translation_changed";
    NuidoEventType["zoom_reset"] = "/zoom_reset";
})(NuidoEventType || (NuidoEventType = {}));
export const DebugEventType = "/debug";
export const AdjustEdgeEndpointEventType = "/adjust-edge-end-point";
export const RecalculateEdgeEndpointsEventType = "/recalc-edge-end-points";
export const NodeMovedEventType = "/node-moved";
