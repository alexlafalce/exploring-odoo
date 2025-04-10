// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
export class TextDialog extends Component {
    setup() {
        this.state = useState({
            text: this.props.initialValue
        });
    }
    onClickApply() {
        this.props.apply(this.state.text);
        this.props.close();
    }
}
TextDialog.template = "nuidoai.text-dialog";
TextDialog.components = { Dialog };
TextDialog.props = {
    title: String,
    initialValue: String,
    apply: Function,
    close: Function,
};
