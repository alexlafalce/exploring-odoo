// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { registry } from "@web/core/registry";
import { NuidoNodeRegistryName } from "@nuido/utils/registry";
import { SalesPluginNode } from "@nuidoai_sales/components/plugins/sales_plugin";
import { SalesPluginNodeModel } from "@nuidoai_sales/models/plugins/sales_plugin";
registry.category(NuidoNodeRegistryName).add(SalesPluginNode.name, {
    component: SalesPluginNode,
    model: SalesPluginNodeModel
});
registry.category("nuidoai_sidebar_menu_item").category("Plugins" /* NuidoAiSideMenuCategory.PLUGINS */).add(SalesPluginNode.name, {
    title: "Sales Plugin",
    icon: "/nuidoai/static/images/money-dollars.svg",
    type: SalesPluginNode.name
});
