/** @odoo-module **/
import { Component } from "@odoo/owl";

export class AiMessage extends Component {
    static template = "ai_chat_base.AiMessage";
    static props = {
        name: { type: String },
        role: { validate:  e => ["assistant", "user"].includes(e) },
        message: { type: String },
        avatar: { type: String },
        isProcessing: { type: Boolean }
    }

    get isAssistant() {
        return this.props.role == "assistant" ? true : false;
    }

    setup() {
        super.setup();
    }
}
