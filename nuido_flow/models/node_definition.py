# THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
# THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

# -*- coding: utf-8 -*-
import logging
_logger = logging.getLogger(__name__)

import json
from odoo import models

from odoo.addons.nuido_base.tools.function_tool import get_function

from . import registry_category as rcat
from ..flows.tools.tools import run_nodes

class NodeDefinition(models.Model):
    _name = "nuido_flow.node.definition"
    _inherit = "nuido_base.node.definition"

    def _process_node_definitions(self):
        self.ensure_one()
        infos = self.process_node_definition(self.raw)
        self.definition = infos
        self.is_processed = True
        self._process_record(self)

    def action_open_flow_designer(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.client',
            'tag': 'NuidoFlowStudio'
        }

    def editRecord(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Node Definition',
            'view_mode': 'form',
            'res_model': 'nuido_flow.node.definition',
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
            object_hook = self.json_object_hook
        )

        node_infos = []

        build_function_registry = self.env["nuido_base.registry"].search_read([("category", "=", rcat.BUILD_FUNCTION)])
        for node in obj["nodes"]:
            node_type: str = node["nodeType"]
            build_function = get_function(build_function_registry, node_type)
            node_info = None
            if build_function:
                node_info = build_function(node, obj["edges"])
            else:
                raise Exception(f"Build function not found for node: {node_type}")

            node_infos.append(node_info)

        post_process_function_registry = self.env["nuido_base.registry"].search_read([("category", "=", rcat.POST_PROCESS_FUNCTION)])

        for info in node_infos:
            post_process_function = get_function(post_process_function_registry, info["type"])
            if post_process_function:
                post_process_function(info, node_infos)

        infos = json.dumps(node_infos, indent=4);

        return infos;

    def run(self, params):
        self.ensure_one()
        if not self.is_processed:
            raise Exception("Definition is not yet processed.")

        definitions = json.loads(self.definition)
        create_function_registry = self.env["nuido_base.registry"].search_read([("category", "=", rcat.CREATE_FUNCTION)])

        node_def = next((o for o in definitions if o["type"] == "StartNode"), None)
        if node_def is not None:
            run_nodes(self.env, create_function_registry, definitions, node_def, params)
