import { Component, useRef } from "@odoo/owl";
import { useBus } from "@web/core/utils/hooks";
import { DebugEventType, EdgeTypeEventType } from "@nuido/components/events";
import { PortModel } from "@nuido/models/port";
import { Default, DefaultAux } from "@nuido/utils/registry";
export class Port extends Component {
    static template = "nuido.port";
    static props = {
        port: PortModel
    };
    rootRef;
    setup() {
        this.rootRef = useRef("root");
        useBus(this.env.bus, this.env.channel + DebugEventType, this.onDebug.bind(this));
    }
    get cssClass() {
        let css = 'port my-2';
        css = css + ' ' + this.props.port.id;
        if (this.props.port.direction === "aux-in" /* PortDirection.auxIn */ || this.props.port.direction === "aux-out" /* PortDirection.auxOut */) {
            css = css + ' mx-2';
        }
        css = css + ' ' + this.props.port.direction;
        return css;
    }
    onMouseDown(event) {
        if ((this.props.port.direction === "output" /* PortDirection.out */ || this.props.port.direction === "aux-out" /* PortDirection.auxOut */)
            && this.props.port.canAddLink()) {
            if (this.props.port.direction === "aux-out" /* PortDirection.auxOut */) {
                this.env.bus.trigger(this.env.channel + EdgeTypeEventType, {
                    edgeType: DefaultAux
                });
            }
            else {
                this.env.bus.trigger(this.env.channel + EdgeTypeEventType, {
                    edgeType: Default
                });
            }
            const docElement = document.querySelector(".nuido-doc");
            const docRect = docElement.getBoundingClientRect();
            const elRect = event.target.getBoundingClientRect();
            const x = ((elRect.left - docRect.left) + elRect.width / 2) / this.env.ui.zoom;
            const y = ((elRect.top - docRect.top) + elRect.height / 2) / this.env.ui.zoom;
            this.env.bus.trigger(this.env.channel + "/edge-start" /* NewEdgeEventType.start */, {
                id: this.props.port.id,
                nodeId: this.props.port.nodeId,
                x: x,
                y: y
            });
        }
    }
    onMouseUp(event) {
        if ((this.props.port.direction === "input" /* PortDirection.in */ || this.props.port.direction === "aux-in" /* PortDirection.auxIn */)
            && this.props.port.canAddLink()) {
            const docElement = document.querySelector(".nuido-doc");
            const docRect = docElement.getBoundingClientRect();
            const elRect = event.target.getBoundingClientRect();
            const x = ((elRect.left - docRect.left) + elRect.width / 2) / this.env.ui.zoom;
            const y = ((elRect.top - docRect.top) + elRect.height / 2) / this.env.ui.zoom;
            this.env.bus.trigger(this.env.channel + "/edge-complete" /* NewEdgeEventType.complete */, {
                id: this.props.port.id,
                nodeId: this.props.port.nodeId,
                x: x,
                y: y
            });
        }
    }
    onDebug(event) {
        console.log("debug");
    }
}
