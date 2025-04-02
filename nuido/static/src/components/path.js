import { Component } from "@odoo/owl";
import { PathModel } from "@nuido/models/path";
export class Path extends Component {
    static template = "nuido.edge-path";
    static props = {
        path: PathModel,
    };
}
