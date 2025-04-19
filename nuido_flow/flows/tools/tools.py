# THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
# THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

from odoo.addons.nuido_base.tools.function_tool import create_object
from ..core.base_node import FlowNode

def run_nodes(env, create_function_registry, definitions, start_node_def, start_params):
    node: FlowNode | None = create_object(env, create_function_registry, definitions, start_node_def["type"], start_node_def)
    node_def = start_node_def
    params = start_params
    while node is not None:
        params = node.process(params)

        node_info = node.get_next_node_info()
        if node_info is not None:
            node_def = next((o for o in definitions if o["id"] == node_info["id"]), None)
            if node_def is not None:
                node = create_object(env, create_function_registry, definitions, node_def["type"], node_def)
            else:
                node = None
        else:
            node = None
