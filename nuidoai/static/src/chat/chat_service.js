// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
const chatService = {
    start() {
        async function chat(channel, message, history) {
            const res = await rpc("/nuidoai/chat", {
                "channel": channel,
                "message": message,
                "history": history.slice(0, history.length - 2)
            });
            return res;
        }
        ;
        async function testChat(agentDefId, channel, message, history) {
            const res = await rpc("/nuidoai/chat/test", {
                "agent_def_id": agentDefId,
                "channel": channel,
                "message": message,
                "history": history.slice(0, history.length - 2)
            });
            return res;
        }
        ;
        return {
            chat: chat,
            testChat: testChat
        };
    }
};
registry.category("services").add("chat", chatService);
