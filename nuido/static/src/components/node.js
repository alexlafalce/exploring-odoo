import { Component, useRef, useState } from "@odoo/owl";
import { useBus } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { NuidoPortRegistryName } from "@nuido/utils/registry";
import { useDraggable } from "@nuido/utils/utils";
import { NodeModel } from "@nuido/models/node";
import { DebugEventType } from "@nuido/components/events";
import { Port } from "@nuido/components/port";
export class Node extends Component {
    static template = "nuido.node";
    static components = { Port };
    static props = {
        node: NodeModel
    };
    ui;
    rootRef;
    position;
    setup() {
        this.rootRef = useRef("root");
        this.position = useState({
            left: `${this.props.node.vprops.left}px`,
            top: `${this.props.node.vprops.top}px`,
        });
        useDraggable({
            ref: this.rootRef,
            handle: ".node-title",
            elements: ".node-container",
            onWillStartDrag: ({ element: ctx, getRect, x, y }) => {
                const elRect = getRect(ctx);
                const docRect = getRect(ctx.closest(".nuido-doc"));
                const left = elRect.left - docRect.left;
                const top = elRect.top - docRect.top;
                ctx.startLeft = left / this.env.ui.zoom;
                ctx.startTop = top / this.env.ui.zoom;
                ctx.startPointerX = x;
                ctx.startPointerY = y;
                ctx.lastPointerX = x;
                ctx.lastPointerY = y;
            },
            onDrag: ({ element: ctx, x, y }) => {
                const deltaX = (x - ctx.startPointerX) / this.env.ui.zoom;
                const deltaY = (y - ctx.startPointerY) / this.env.ui.zoom;
                const left = (ctx.startLeft + deltaX);
                const top = (ctx.startTop + deltaY);
                const trueDeltaX = (x - ctx.lastPointerX) / this.env.ui.zoom;
                const trueDeltaY = (y - ctx.lastPointerY) / this.env.ui.zoom;
                ctx.lastPointerX = x;
                ctx.lastPointerY = y;
                ctx.style.left = `${left}px`;
                ctx.style.top = `${top}px`;
                this.notifyUpdate(left, top, trueDeltaX, trueDeltaY);
            },
        });
        useBus(this.env.bus, this.env.channel + DebugEventType, this.onDebug.bind(this));
    }
    notifyUpdate(left, top, deltaX = 0, deltaY = 0) {
        const node = this.props.node;
        node.move(left, top, deltaX, deltaY);
    }
    onClick(event) {
        this.env.bus.trigger(this.env.channel + "/toggle" /* SelectionEventType.toggle */, {
            id: this.props.node.id,
            type: "node" /* SelectionType.node */
        });
    }
    onMouseMove(event) {
    }
    getPortComponent(portModel) {
        const portRegistry = registry.category(NuidoPortRegistryName).get(portModel.portType);
        return portRegistry.component;
    }
    onDebug(event) {
        console.log("debug");
    }
}
