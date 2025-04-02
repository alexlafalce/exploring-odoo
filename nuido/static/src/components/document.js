import { Component, useRef, onMounted, onWillUnmount } from "@odoo/owl";
import { useBus } from "@web/core/utils/hooks";
import { useDebounced, useThrottleForAnimation } from "@web/core/utils/timing";
import { registry } from "@web/core/registry";
import { uuidv4 } from "@nuido/utils/utils";
import { Edge } from "@nuido/components/edge";
import { DebugEventType, EdgeTypeEventType } from "@nuido/components/events";
import { DocumentModel } from "@nuido/models/document";
import { NuidoNodeRegistryName } from "@nuido/utils/registry";
export class Document extends Component {
    static template = "nuido.document";
    static props = {
        document: DocumentModel
    };
    rootRef;
    selected;
    setup() {
        this.rootRef = useRef("root");
        useBus(this.env.bus, this.env.channel + "/new" /* DocumentEventType.new */, this.onNewNode.bind(this));
        useBus(this.env.bus, this.env.channel + "/delete" /* DocumentEventType.delete */, this.onDeleteSelected.bind(this));
        useBus(this.env.bus, this.env.channel + "/reset" /* DocumentEventType.reset */, this.onReset.bind(this));
        useBus(this.env.bus, this.env.channel + EdgeTypeEventType, this.onEdgeTypeChanged.bind(this));
        useBus(this.env.bus, this.env.channel + "/toggle" /* SelectionEventType.toggle */, this.onToggleSelection.bind(this));
        useBus(this.env.bus, this.env.channel + "/select" /* SelectionEventType.select */, this.onSelect.bind(this));
        useBus(this.env.bus, this.env.channel + "/unselect" /* SelectionEventType.unselect */, this.onUnselect.bind(this));
        useBus(this.env.bus, this.env.channel + "/clear" /* SelectionEventType.clear */, this.onClearSelected.bind(this));
        useBus(this.env.bus, this.env.channel + "/edge-start" /* NewEdgeEventType.start */, this.onStartConnect.bind(this));
        useBus(this.env.bus, this.env.channel + "/edge-complete" /* NewEdgeEventType.complete */, this.onCompleteConnect.bind(this));
        useBus(this.env.bus, this.env.channel + DebugEventType, this.onDebug.bind(this));
        this.onMouseUp = useDebounced(this.onMouseUp, "animationFrame");
        this.onMouseMove = useThrottleForAnimation(this.onMouseMove);
        onMounted(() => {
            document.addEventListener("mousemove", this.onMouseMove.bind(this));
            document.addEventListener("mouseup", this.onMouseUp.bind(this));
        });
        onWillUnmount(() => {
            document.removeEventListener("mousemove", this.onMouseMove.bind(this));
            document.removeEventListener("mouseup", this.onMouseUp.bind(this));
        });
    }
    get edgeComponent() {
        return Edge;
    }
    onEdgeTypeChanged(event) {
        const doc = this.props.document;
        doc.edgeType = event.detail.edgeType;
    }
    getNodeComponent(nodeType) {
        const res = registry.category(NuidoNodeRegistryName).get(nodeType).component;
        return res;
    }
    onNewNode(event) {
        const icon = event.detail.icon;
        const title = event.detail.title;
        const nodeType = event.detail.type;
        const x = event.detail.x;
        const y = event.detail.y;
        const id = uuidv4();
        const doc = this.props.document;
        doc.addNode(id, icon, title, nodeType, x, y);
    }
    clearSelected() {
        let els = document.getElementsByClassName("selected");
        while (els.length > 0) {
            els[0].classList.remove("selected");
            els = document.getElementsByClassName("selected");
        }
        const doc = this.props.document;
        doc.clearSelected();
    }
    onClearSelected() {
        this.clearSelected();
    }
    onToggleSelection(event) {
        this.clearSelected();
        const el = document.getElementById(event.detail.id);
        if (el) {
            el.classList.toggle("selected");
            const doc = this.props.document;
            doc.toggleSelect(event.detail.type, event.detail.id);
        }
    }
    onSelect(event) {
        const el = document.getElementById(event.detail.id);
        if (el) {
            el.classList.add("selected");
            const doc = this.props.document;
            doc.select(event.detail.type, event.detail.id);
        }
        else {
            this.clearSelected();
        }
    }
    onUnselect(event) {
        const el = document.getElementById(event.detail.id);
        if (el) {
            el.classList.remove("selected");
            const doc = this.props.document;
            doc.unselect(event.detail.id);
        }
        else {
            this.clearSelected();
        }
    }
    onDeleteSelected() {
        const doc = this.props.document;
        doc.deleteSelected();
        this.clearSelected();
    }
    onReset() {
        const doc = this.props.document;
        doc.reset();
    }
    onStartConnect(event) {
        const id = uuidv4();
        const portId = event.detail.id;
        const nodeId = event.detail.nodeId;
        const doc = this.props.document;
        doc.prepareEdge(id, doc.edgeType, portId, nodeId, event.detail.x, event.detail.y);
    }
    onCompleteConnect(event) {
        const portId = event.detail.id;
        const nodeId = event.detail.nodeId;
        const doc = this.props.document;
        doc.completeEdge(portId, nodeId, event.detail.x, event.detail.y);
    }
    onMouseMove(event) {
        const doc = this.props.document;
        if (doc && doc.newEdge !== undefined) {
            const docElement = document.querySelector(".nuido-doc");
            const docRect = docElement.getBoundingClientRect();
            const x = (event.clientX - docRect.left) / this.env.ui.zoom;
            const y = (event.clientY - docRect.top) / this.env.ui.zoom;
            doc.updateNewEdge(x, y);
        }
    }
    onMouseUp(event) {
        const doc = this.props.document;
        if (doc && doc.newEdge !== undefined) {
            doc.clearNewEdge();
        }
    }
    onDebug(event) {
        console.log("debug");
    }
}
