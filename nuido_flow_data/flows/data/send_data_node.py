# THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
# 
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
# DO NOT USE IT IN PRODUCTION.

import logging

_logger = logging.getLogger(__name__)

import requests

from odoo.addons.nuido_base.tools.function_tool import create_object

from odoo.addons.nuido_flow.flows.core.base_node import BaseNode
from odoo.addons.nuido_flow.flows.core.base_node import FlowNode

class SendDataNode(BaseNode):
    def process(self, params) -> any:
        super().process(params)

        headers = {}
        if len(self.definition["aux_nodes"]) > 0:
            for node_id in self.definition["aux_nodes"]:
                node_def = next((o for o in self.definitions if o["id"] == node_id["id"]), None)
                if node_def is not None and node_def["type"].endswith("HeaderNode"):
                    node: FlowNode = create_object(self.env, self.create_function_registry, self.definitions, node_def["type"], node_def)
                    node_headers = node.process(params)
                    headers = headers | node_headers


        url = self.definition["url"]
        method = self.definition["method"]

        response = None
        try:
            if method == "POST":
                response = requests.post(url, json=params, headers=headers)
            else:
                response = requests.get(url, params=params, headers=headers)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            _logger.warning("Exception when sending request.", exc_info=True)

        return response
