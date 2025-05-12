# THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
# 
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
# DO NOT USE IT IN PRODUCTION.

import logging
_logger = logging.getLogger(__name__)

import json
from collections import defaultdict

from odoo import models
from odoo.tools.json import json_default

from odoo.addons.nuido_base.tools.function_tool import create_object

from odoo.addons.nuido_flow.flows.core.base_node import FlowNode
from odoo.addons.nuido_flow.models import registry_category as rcat

class NodeDefinition(models.Model):
    _inherit = "nuido_flow.node.definition"

    def _get_starter_node(self, rec):
        starter_node = None
        starter_definition = None

        definitions = json.loads(rec.definition)
        create_function_registry = self.env["nuido_base.registry"].search_read([("category", "=", rcat.CREATE_FUNCTION)])

        node_def = next((o for o in definitions if o["type"] == "StartNode"), None)
        if (node_def is not None):
            starter_node_def = next((o for o in definitions if (o["type"].endswith("StarterNode"))), None)

            if starter_node_def is not None:
                starter_definition = json.dumps(starter_node_def, default=json_default)
                starter_node: FlowNode | None = create_object(self.env, create_function_registry, definitions, starter_node_def["type"], starter_node_def)

        return starter_definition, starter_node

    def _process_record(self, rec):
        super()._process_record(rec)

        starter_definition, starter_node = self._get_starter_node(rec)
        if starter_definition is not None and starter_node is not None:
            starter_node.process(rec)

    def write(self, vals):
        cleanup = False
        starter_definition = None
        starter_node = None

        if self.is_processed:
            cleanup = True
            starter_definition, starter_node = self._get_starter_node(self)

        res = super(NodeDefinition, self).write(vals)

        if cleanup:
            if starter_definition is not None and starter_node is not None:
                starter_node.cleanup()

        return res

    def unlink(self):
        starter_nodes = [];

        for rec in self:
            if rec.is_processed:
                _, starter_node = self._get_starter_node(rec)
                if starter_node:
                    starter_nodes.append(starter_node)

        res = super(NodeDefinition, self).unlink()

        for starter_node in starter_nodes:
            starter_node.cleanup()

        return res
