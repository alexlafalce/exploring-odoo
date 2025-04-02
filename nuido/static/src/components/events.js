export var NewEdgeEventType;
(function (NewEdgeEventType) {
    NewEdgeEventType["start"] = "/edge-start";
    NewEdgeEventType["complete"] = "/edge-complete";
})(NewEdgeEventType || (NewEdgeEventType = {}));
;
export var SelectionEventType;
(function (SelectionEventType) {
    SelectionEventType["select"] = "/select";
    SelectionEventType["unselect"] = "/unselect";
    SelectionEventType["clear"] = "/clear";
    SelectionEventType["toggle"] = "/toggle";
})(SelectionEventType || (SelectionEventType = {}));
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
export const EdgeTypeEventType = "/edge-type";
export const DebugEventType = "/debug";
