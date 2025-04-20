// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import { registry } from "@web/core/registry";
import { NuidoNodeRegistryName } from "@nuido/utils/registry";
import { NuidoSidebarMenuItemRegistryName } from "@nuido_base/utils/registry";
import { SalesSummaryOdooNode } from "@nuido_flow_sales/components/odoo/sales_summary";
import { SalesSummaryOdooNodeModel } from "@nuido_flow_sales/models/odoo/sales_summary";
import { FixedRangeSalesSummaryOdooNode } from "@nuido_flow_sales/components/odoo/fixed_range_sales_summary";
import { FixedRangeSalesSummaryOdooNodeModel } from "@nuido_flow_sales/models/odoo/fixed_range_sales_summary";
// Odoo Nodes
registry.category(NuidoNodeRegistryName).add(SalesSummaryOdooNode.name, {
    component: SalesSummaryOdooNode,
    model: SalesSummaryOdooNodeModel
});
registry.category(NuidoNodeRegistryName).add(FixedRangeSalesSummaryOdooNode.name, {
    component: FixedRangeSalesSummaryOdooNode,
    model: FixedRangeSalesSummaryOdooNodeModel
});
// Menu items
// Odoo
const odooNodeMenuItemsReg = registry.category(NuidoSidebarMenuItemRegistryName);
if (!odooNodeMenuItemsReg.contains("Odoo")){
    odooNodeMenuItemsReg.add("Odoo", {
        app: "nuidoflow",
        category: "Odoo",
        items: []
    });
}
const odooNodeMenuItems = odooNodeMenuItemsReg.get("Odoo");


odooNodeMenuItems.items.push({
    title: "Sales Summary",
    icon: "/nuido_flow_sales/static/images/money-bar-chart.svg",
    type: SalesSummaryOdooNode.name
});
odooNodeMenuItems.items.push({
    title: "Fixed Range Sales Summary",
    icon: "/nuido_flow_sales/static/images/money-target.svg",
    type: FixedRangeSalesSummaryOdooNode.name
});
