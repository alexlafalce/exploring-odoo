import { Component, EventBus } from "@odoo/owl";
import { AiChat } from "../ai_chat/ai_chat"

export class AiChatContainer extends Component {
    static components = { AiChat }
    static props = {
        title: { type: String, optional: true },
        greetingMessage: { type: String, optional: true },
        greetUser: { type: Boolean, optional: true },
        storeName: { type: String },
        userName: { type: String, optional: true },
        userAvatarUrl: { type: String },
        assistantName: { type: String, optional: true },
        assistantAvatarUrl: { type: String },
        channel: { type: String },
        bus: { type: Object, optional: true },
    }
    static defaultProps = {
        title: "AI Chat",
        greetingMessage: "",
        greetUser: false,
        userName: "User",
        assistantName: "Assistant",
        bus: new EventBus(),
    }

    update(message) {
        this.props.bus.trigger(this.props.channel + "/message", { message: message });
    }

    reset() {
        this.props.bus.trigger(this.props.channel + "/reset");
    }
}
