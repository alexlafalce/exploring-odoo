// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";
import { MenuItem } from "@nuidoai/app/menu_item";
export class SidebarMenu extends Component {
    getMenuItems(category) {
        const sidebarItemRegistry = registry.category("nuidoai_sidebar_menu_item").category(category).getAll();
        return sidebarItemRegistry;
    }
    get agentMenuItems() {
        const sidebarItemRegistry = this.getMenuItems("Agents" /* NuidoAiSideMenuCategory.AGENTS */);
        return sidebarItemRegistry;
    }
    get serviceMenuItems() {
        const sidebarItemRegistry = this.getMenuItems("Services" /* NuidoAiSideMenuCategory.SERVICES */);
        return sidebarItemRegistry;
    }
    get pluginMenuItems() {
        const sidebarItemRegistry = this.getMenuItems("Plugins" /* NuidoAiSideMenuCategory.PLUGINS */);
        return sidebarItemRegistry;
    }
    get selectionStrategyMenuItems() {
        const sidebarItemRegistry = this.getMenuItems("Selection Strategies" /* NuidoAiSideMenuCategory.SELECTION_STRATEGIES */);
        return sidebarItemRegistry;
    }
    get terminationStrategyMenuItems() {
        const sidebarItemRegistry = this.getMenuItems("Termination Strategies" /* NuidoAiSideMenuCategory.TERMINATION_STRATEGIES */);
        return sidebarItemRegistry;
    }
    toggleCategory(id) {
        const el = document.getElementById(id);
        if (el) {
            el.classList.toggle("show");
        }
    }
    toggleSidebar() {
        const el = document.getElementById("sidebar-nav");
        el.classList.toggle("w-0");
        el.classList.toggle("m-3");
    }
}
SidebarMenu.template = "nuidoai.sidebar-menu";
SidebarMenu.components = { MenuItem };
SidebarMenu.props = {
    title: String,
    action: Function,
};
