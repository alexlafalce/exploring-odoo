# THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
# THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import logging
_logger = logging.getLogger(__name__)

import json

from odoo import models, fields

from . import nuidoai_registry_category as rcat

from ..tools.function_tool import get_function

class NodeDefinition(models.Model):
    _name = "nuidoai.node.definition"
    _description = "Node definition"
    _rec_name = "title"

    title = fields.Char("Title", required=True)
    raw = fields.Text("Raw Json", required=True)
    definition = fields.Text("Definition")
    is_processed = fields.Boolean("Processed", default=False)

    def write(self, vals):
        if "raw" in vals:
            vals["definition"] = ""
            vals["is_processed"] = False
            self.env.company.node_definition = False
        return super().write(vals)

    def action_open_designer(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.client',
            'tag': 'NuidoAiChatStudio'
        }

    def editRecord(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Node Definition',
            'view_mode': 'form',
            'res_model': 'nuidoai.node.definition',
            'res_id': self.id,
        }

    def json_object_hook(self, obj):
        keys = ["vprops", "lastVprops", "edgeType", "joints", "links", "paths",
                "left", "top"];
        for key in keys:
            obj.pop(key, None)

        return obj

    def process_node_definition(self, raw):
        obj = json.loads(raw,
            object_hook=self.json_object_hook
        )

        chat_group_infos = []
        agent_infos = []
        service_infos = []
        plugin_infos = []
        termination_strategy_infos = []
        selection_strategy_infos = []

        build_function_registry = self.env["nuidoai.registry"].search_read([("category", "=", rcat.BUILD_FUNCTION)])
        for node in obj["nodes"]:
            node_type: str = node["nodeType"]
            build_function = get_function(build_function_registry, node_type)
            if build_function:
                node_info = build_function(node, obj["edges"])

                if node_type.endswith("ServiceNode"):
                    service_infos.append(node_info);
                elif node_type.endswith("AgentNode"):
                    agent_infos.append(node_info);
                elif node_type.endswith("PluginNode"):
                    plugin_infos.append(node_info);
                elif node_type.endswith("GroupNode"):
                    chat_group_infos.append(node_info);
                elif node_type.endswith("SelectionStrategyNode"):
                    selection_strategy_infos.append(node_info);
                elif node_type.endswith("TerminationStrategyNode"):
                    termination_strategy_infos.append(node_info);
            else:
                raise f"Build function not found for node: {node_type}"

        section_role_registry = self.env["nuidoai.registry"].search_read([("category", "=", rcat.SECTION_ROLE)])
        post_process_function_registry = self.env["nuidoai.registry"].search_read([("category", "=", rcat.POST_PROCESS_FUNCTION)])
        infos = {
            "services": service_infos,
            "chat_groups": chat_group_infos,
            "agents": agent_infos,
            "plugins": plugin_infos,
            "termination_strategies": termination_strategy_infos,
            "selection_strategies": selection_strategy_infos
        }

        for info in agent_infos:
            post_process_function = get_function(post_process_function_registry, info["type"])
            if post_process_function:
                post_process_function(info, section_role_registry, infos)

        for info in termination_strategy_infos:
            post_process_function = get_function(post_process_function_registry, info["type"])
            if post_process_function:
                post_process_function(info, section_role_registry, infos)

        for info in selection_strategy_infos:
            post_process_function = get_function(post_process_function_registry, info["type"])
            if post_process_function:
                post_process_function(info, section_role_registry, infos)

        for info in chat_group_infos:
            post_process_function = get_function(post_process_function_registry, info["type"])
            if post_process_function:
                post_process_function(info, section_role_registry, infos)

        all = {
            "services": service_infos,
            "chat_groups": chat_group_infos,
            "agents": agent_infos,
            "plugins": plugin_infos,
            "termination_strategies": termination_strategy_infos,
            "selection_strategies": selection_strategy_infos
        }

        infos = json.dumps(all, indent=4);

        return infos;

    def action_process_node_definitions(self):
        for rec in self.browse(self.env.context["active_ids"]):
            infos = self.process_node_definition(rec.raw)
            rec.definition = infos
            rec.is_processed = True
