import { Component } from "@odoo/owl";
import { JointModel } from "@nuido/models/joint";
export class Joint extends Component {
    static template = "nuido.edge-joint";
    static props = {
        joint: JointModel,
    };
}
