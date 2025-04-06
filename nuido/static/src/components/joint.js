// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { Component } from "@odoo/owl";
import { JointModel } from "@nuido/models/joint";
export class Joint extends Component {
    static template = "nuido.edge-joint";
    static props = {
        joint: JointModel,
    };
}
