// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { Component, EventBus, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useBus, useService } from "@web/core/utils/hooks";
import { standardActionServiceProps } from "@web/webclient/actions/action_service";
import { DocumentModel } from "@nuido/models/document";
import { NuidoUi } from "@nuido/app/nuido_ui";
import { uuidv4 } from "@nuido/utils/utils";
import { SidebarMenu } from "@nuidoai/app/sidebar_menu";
import { OrthoEdge } from "@nuidoai/components/edges/orthogonal_edge";
import { ViewJsonDialog } from "@nuidoai/components/dialogs/view_json_dialog";
import { TextInputDialog } from "@nuidoai/components/dialogs/text_input_dialog";
import { ChatDialogButton } from "@nuidoai/chat/chat_dialog_button";
class NuidoAiChatStudio extends Component {
    setup() {
        this.notification = useService("notification");
        this.dialog = useService("dialog");
        this.orm = useService("orm");
        this.action = useService("action");
        this.channel = "nuidoai";
        this.state = useState({
            bus: new EventBus,
            documents: [],
            edgeType: OrthoEdge.name,
            zoom: 1,
        });
        useBus(this.state.bus, this.channel + "/translation_changed" /* NuidoEventType.translation_changed */, this.translation_changed.bind(this));
        onWillStart(async () => {
            const activeId = this.props.action.context.active_id;
            if (activeId) {
                const rec = await this.orm.searchRead(NuidoAiChatStudio.res_model, [['id', '=', activeId]]);
                if (rec.length > 0) {
                    await this.newDoc();
                    this.currentDoc.title = rec[0]["title"];
                    this.currentDoc.fromJson(rec[0]["raw"]);
                }
                else {
                    this.notification.add('Document not found, creating new one instead.', {
                        title: 'Error',
                        type: 'danger',
                        sticky: true,
                    });
                    this.newDoc();
                }
            }
            else {
                this.newDoc();
            }
        });
    }
    async newDoc() {
        const docId = uuidv4();
        const sessionId = uuidv4();
        const newDoc = new DocumentModel(docId, sessionId, docId);
        newDoc.edgeType = OrthoEdge.name;
        newDoc.title = "New";
        this.state.documents.push(newDoc);
        await new Promise(resolve => {
            setTimeout(() => {
                if (this.state.documents.length > 1) {
                    this.state.documents.shift();
                }
                resolve(undefined);
            }, 250);
        }); // give time before destroying component
    }
    get currentDoc() {
        return this.state.documents[this.state.documents.length - 1];
    }
    notifyNewNode(title, type, x, y) {
        this.state.bus.trigger(this.channel + "/new" /* DocumentEventType.new */, { title: title, type: type, x: x, y: y });
    }
    onShowJson() {
        const jsonDoc = this.state.documents[0].toJson();
        this.dialog.add(ViewJsonDialog, {
            json: jsonDoc
        });
    }
    onShowData() {
        const jsonDoc = this.state.documents[0].toJson(false);
        this.dialog.add(ViewJsonDialog, {
            json: jsonDoc
        });
    }
    async onSave() {
        const activeId = this.props.action.context.active_id;
        if (activeId) {
            const jsonDoc = this.currentDoc.toJson();
            this.orm.write(NuidoAiChatStudio.res_model, [activeId], {
                title: this.currentDoc.title,
                raw: jsonDoc,
                is_processed: false
            });
        }
        else {
            const res = await new Promise((resolve) => {
                this.dialog.add(TextInputDialog, {
                    title: 'Save',
                    label: 'Title',
                    initialValue: '',
                    apply: (value) => resolve(value),
                    cancel: () => resolve(undefined),
                });
            });
            if (res && res.trim()) {
                this.currentDoc.title = res;
                const jsonDoc = this.currentDoc.toJson();
                const [newId] = await this.orm.create(NuidoAiChatStudio.res_model, [{
                        title: res.trim(),
                        raw: jsonDoc,
                        is_processed: false
                    }]);
                window.location.assign(("/odoo/nuidoai/" + newId + "/NuidoAiChatStudio"));
            }
        }
    }
    async onBeforeShowChatDialog() {
        await this.onSave();
    }
    deleteSelected() {
        this.state.bus.trigger(this.channel + "/delete" /* DocumentEventType.delete */);
    }
    clearSelection() {
        this.state.bus.trigger(this.channel + "/clear" /* SelectionEventType.clear */);
    }
    zoom_reset() {
        this.state.bus.trigger(this.channel + "/zoom_reset" /* NuidoEventType.zoom_reset */);
    }
    translation_changed(event) {
        this.state.zoom = event.detail.zoom;
    }
    get zoom() {
        return Math.round((this.state.zoom + Number.EPSILON) * 100) / 100;
    }
}
NuidoAiChatStudio.res_model = "nuidoai.node.definition";
NuidoAiChatStudio.template = "nuidoai.chat-studio";
NuidoAiChatStudio.components = { NuidoUi, SidebarMenu, ChatDialogButton };
NuidoAiChatStudio.props = {
    ...standardActionServiceProps,
};
registry.category("actions").add("NuidoAiChatStudio", NuidoAiChatStudio);
